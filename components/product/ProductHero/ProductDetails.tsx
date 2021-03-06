// @ts-nocheck
import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Text } from '@components/ui'
import cn from 'classnames'
import Phone from '@components/icons/Phone'
import { useUI } from '@components/ui/context'
import ChevronDown from '@components/icons/ChevronDown'
import s from './ProductHero.module.css'
import ChevronUp from '@components/icons/ChevronUp'
import usePrice from '@framework/use-price'
import useAddItem from '@framework/cart/use-add-item'
import WishlistButton from '@components/wishlist/WishlistButton'
import {
  getCurrentVariant,
  getProductOptions,
  SelectedOptions,
} from '../helpers'
import useProductOptions from '@framework/products/use-product-options'
import ProductImage from './ProductImage'

const ProductDetails: FC = ({
  product,
  highlights,
  chosenVariant,
  setChosenVariant,
}) => {
  const addItem = useAddItem()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const { localeData } = useUI()
  // const [colorMessage, setColorMessage] = useState('')
  // const [sizeMessage, setSizeMessage] = useState('')
  const { openSidebar, openModal, openModalCart } = useUI()

  const { price, basePrice, discount } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode,
  })
  const [choices, setChoices] = useState<SelectedOptions>({})

  const { data: productOptions } = useProductOptions({
    productId: product?.entityId,
  })

  useEffect(() => {
    setQuantity(1)
    setChoices({})
    setChosenVariant(null)
  }, [product])

  useEffect(() => {
    setChosenVariant(getCurrentVariant(product, choices))
  }, [choices])

  // useEffect(() => {
  //   console.log('Product options: ', productOptions)
  // }, [productOptions])

  const options = getProductOptions(product)

  // const variant = getCurrentVariant(product, choices)
  console.log('Chosen variant: ', chosenVariant)
  console.log('Chosen choices: ', choices)

  const addToCart = async () => {
    // if (choices.size === null) setSizeMessage('Please select a size')
    // else setSizeMessage('')
    // if (choices.color === null) setColorMessage('Please select a color')
    // else setColorMessage('')

    try {
      setLoading(true)
      if (quantity !== null) {
        console.log('Adding: ', {
          productId: product.entityId,
          variantId: chosenVariant
            ? chosenVariant.node.entityId
            : product.variants.edges?.[0]?.node.entityId!,
          quantity,
        })
        await addItem({
          productId: product.entityId,
          variantId: chosenVariant
            ? chosenVariant.node.entityId
            : product.variants.edges?.[0]?.node.entityId!,
          quantity,
        })
        openModalCart(product, chosenVariant, quantity, choices)
        //openSidebar()
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
    }
  }

  const quantityUp = () => {
    setQuantity((quantity) => quantity + 1)
  }

  const quantityDown = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1)
    }
  }

  const getRadioButtonOptions = (opt) => {
    return (
      <div className="flex flex-wrap mt-2 flex-col">
        {opt.option_values.map((v: any, i: number) => {
          const active = (choices as any)[opt.id]

          return (
            <div key={v.id}>
              <input
                type="radio"
                name={v.label}
                value={v.id}
                checked={v.id === active}
                onChange={() => {
                  setChoices((choices) => {
                    return {
                      ...choices,
                      [opt.id]: v.id,
                    }
                  })
                }}
              />{' '}
              <label htmlFor={v.label}>{v.label}</label>
              <br />
            </div>
          )
        })}
      </div>
    )
  }

  const getSwatchOptions = (opt) => {
    return (
      <div className="flex flex-wrap mt-2 justify-center laptop:justify-start">
        {opt.option_values.map((v: any, i: number) => {
          const active = (choices as any)[opt.id]

          return (
            <div
              key={v.entityId}
              className={cn(
                'w-9 h-9 text-center mr-1 flex justify-center',
                cn(v.id === active ? 'border-black' : 'border-lightgray'),
                s.colorBtnRoot
              )}
            >
              <button
                className={s.colorBtn}
                style={{
                  backgroundColor:
                    v.value_data?.colors?.length > 0
                      ? v.value_data?.colors[0]
                      : 'transparent',
                }}
                onClick={() => {
                  setChoices((choices) => {
                    return {
                      ...choices,
                      [opt.id]: v.id,
                    }
                  })
                }}
              />
            </div>
          )
        })}
      </div>
    )
  }

  const getOptionValues = (option) => {
    switch (option?.type) {
      case 'radio_buttons':
        return getRadioButtonOptions(option)
      case 'swatch':
        return getSwatchOptions(option)
      default:
        return null
    }
  }

  const getProductOption = (option) => {
    const mOpt = options?.find((mOpt) => mOpt.entityId === option.id)
    let required = false
    if (mOpt?.isRequired) required = true

    const optionValues = getOptionValues(option)

    return (
      !!optionValues && (
        <div key={option.id}>
          <div className="mt-2 font-body text-lightgray text-sm text-center laptop:text-left">
            {option.display_name}:{required && ' Required'}
          </div>
          {optionValues}
        </div>
      )
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-body text-gray">{product.name}</h1>
      {discount ? (
        <>
          <div>
            <span
              className="text-2xl"
              style={{ textDecoration: 'line-through' }}
            >
              {basePrice}
            </span>
            <span className="text-red ml-1 font-bold">{price}</span>
          </div>
          <div className="text-black text-sm font-bold mb-1">
            (You save {discount})
          </div>
        </>
      ) : (
        <span className="text-red mb-1 font-bold">{price}</span>
      )}

      <div className="mb-1">
        <span className="font-black text-sm">SKU:</span>{' '}
        <span className="text-gray font-thin">
          {chosenVariant?.node?.sku || product?.sku}
        </span>
      </div>
      <div className="mb-1">
        <span className="font-bold text-gray text-sm">Condition:</span> New
      </div>
      <div className="mb-2">
        <span className="font-bold text-gray text-sm">Availability: </span>{' '}
        {product.availabilityV2?.status}
      </div>
      {highlights?.length > 0 && (
        <>
          <div className="mb-2">
            <span className="font-bold text-gray text-sm">
              PRODUCT HIGHLIGHTS
            </span>
          </div>
          <div className="break-words w-full max-w-xl">
            {highlights?.map((item, idx) => {
              return <div key={idx}>{item.value}</div>
            })}
          </div>
        </>
      )}
      <hr className="mb-3" />
      {/*  */}

      <div className="block laptop:hidden">
        <ProductImage chosenVariant={chosenVariant} product={product} />
      </div>

      {/*  */}
      {productOptions?.length > 0 &&
        productOptions.map((option) => {
          return getProductOption(option)
        })}
      <div className="mt-4 font-body text-lightgray text-sm text-center laptop:text-left">
        Quantity:
      </div>
      <div className={s.counter}>
        <div
          className="w-7 h-6 text-gray-400 border-gray-400 border-2 inline-block rounded border-opacity-25 cursor-pointer"
          onClick={quantityDown}
        >
          <div className="m-auto w-4 opacity-25">
            <ChevronDown />
          </div>
        </div>
        {quantity}
        <div
          className="w-7 h-6  text-gray-400 border-gray-400 border-2 inline-block rounded border-opacity-25 cursor-pointer"
          onClick={quantityUp}
        >
          <div className="w-2 opacity-25">
            <ChevronUp />
          </div>
        </div>
      </div>
      <div className="flex mobile:flex-col tablet:flex-row">
        <button
          className={cn(
            s.addBtn,
            'w-full mb-2 tablet:w-1/2 laptop:w-44 tablet:mb-0'
          )}
          disabled={!chosenVariant}
          onClick={addToCart}
          aria-label="Add to Cart"
        >
          {loading ? 'Adding to cart...' : 'Add to Cart'}
        </button>
        <WishlistButton
          className={cn(
            s.wishBtn,
            'w-full ml-0 laptop:w-44 tablet:w-1/2 tablet:ml-4'
          )}
          productId={product.entityId}
          variant={
            chosenVariant ? chosenVariant : product.variants?.edges?.[0]!
          }
        />
      </div>
    </div>
  )
}

export default ProductDetails
