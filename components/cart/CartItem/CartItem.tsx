import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Trash, Plus, Minus } from '@components/icons'
import usePrice from '@framework/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import s from './CartItem.module.css'

const CartItem = ({
  item,
  currencyCode,
  index,
  setLoading,
}: {
  item: any
  currencyCode: string
  index: number
  setLoading: Dispatch<SetStateAction<boolean>>
}) => {
  const { price } = usePrice({
    amount: item.extended_sale_price,
    baseAmount: item.extended_list_price,
    currencyCode,
  })

  const updateItem = useUpdateItem(item)
  const removeItem = useRemoveItem()
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)
  const updateQuantity = async (val: number) => {
    console.log("Loading true")
    setLoading(true);
    await updateItem({ quantity: val })
    console.log("Loading false")
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(e.target.value)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setLoading(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem({ id: item.id })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  // console.log('item', item)

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
      setLoading(false)
    }
  }, [item.quantity])

  return (
    <li
      className={cn(
        'flex flex-row space-x-8 py-8',
        {
          'opacity-75 pointer-events-none': removing,
        },
        s.gridItem
      )}
    >
      <div>
        {index === 0 && <div className="mb-4 font-bold">Item</div>}
        <div className="flex justify-between relative">
          <Image
            className={s.productImage}
            src={item.image_url}
            width={150}
            height={150}
            alt="Product Image"
            // The cart item image is already optimized and very small in size
            unoptimized
          />
          <Link href={`/product/${item.url.split('/')[3]}`}>
            <span className="ml-4 cursor-pointer">{item.name}</span>
          </Link>
        </div>
      </div>

      <div>
        {index === 0 && <div className="mb-4 font-bold">Price</div>}
        <div>{`$${item.sale_price}`}</div>
      </div>

      <div>
        {index === 0 && <div className="mb-4 font-bold">Quantity</div>}
        <div className="flex-1 flex flex-col text-base ">
          {/** TODO: Replace this. No `path` found at Cart */}

          <div className="flex items-center">
            <button type="button" onClick={() => increaseQuantity(-1)}>
              <Minus width={18} height={18} />
            </button>
            <label>
              <input
                type="number"
                max={99}
                min={0}
                className={s.quantity}
                value={quantity}
                onChange={handleQuantity}
                onBlur={handleBlur}
              />
            </label>
            <button type="button" onClick={() => increaseQuantity(1)}>
              <Plus width={18} height={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="text-right">
        {index === 0 && <div className="mb-4 font-bold">Total</div>}
        <div className="flex justify-end ">
          <span className="mr-4">{price}</span>
          <button className="flex justify-end" onClick={handleRemove}>
            <Trash />
          </button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
