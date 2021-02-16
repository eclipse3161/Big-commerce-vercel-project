// @ts-nocheck
import { FC, useState } from 'react'
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

const ProductDetails: FC = ({ product, highlights }) => {
  const addItem = useAddItem()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  // const [colorMessage, setColorMessage] = useState('')
  // const [sizeMessage, setSizeMessage] = useState('')
  const { openSidebar, openModal, openModalCart } = useUI()

  const { price } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode!,
  })
  const [choices, setChoices] = useState<SelectedOptions>({
    size: null,
    color: null,
  })

  const options = getProductOptions(product)

  const variant =
    getCurrentVariant(product, choices) || product.variants?.edges?.[0]

  console.log('choices', choices)

  const addToCart = async () => {
    // if (choices.size === null) setSizeMessage('Please select a size')
    // else setSizeMessage('')
    // if (choices.color === null) setColorMessage('Please select a color')
    // else setColorMessage('')

    if (quantity !== null && choices.color !== null) setLoading(true)
    try {
      if (quantity !== null && choices.color !== null) {
        console.log(
          'Adding: ',
          product.variants,
          product.variants.edges?.[0]?.node.entityId!
        )
        await addItem({
          productId: product.entityId,
          variantId: product.variants.edges?.[0]?.node.entityId!,
        })
        openModalCart()
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

  return (
    <div>
      <h1 className="text-3xl font-body text-gray">{product.name}</h1>
      <div className="text-red text-xl">
        {price}
        {` `}
        {product.prices?.price.currencyCode}
      </div>
      <div className="mb-1">
        <span className="font-black text-sm">SKU:</span>{' '}
        <span className="text-gray font-thin">{product.sku}</span>
      </div>
      <div className="mb-1">
        <span className="font-bold text-gray text-sm">Condition:</span> New
      </div>
      <div className="mb-2">
        <span className="font-bold text-gray text-sm">Availability: </span>{' '}
        {product.availabilityV2?.status}
      </div>
      <div className="mb-2">
        <span className="font-bold text-gray text-sm">PRODUCT HIGHLIGHTS</span>
      </div>
      <div className="break-words w-full max-w-xl">
        {highlights?.map((item, idx) => {
          return <div key={idx}>{item.value}</div>
        })}
      </div>
      <hr className="mb-3" />
      {options?.map((opt: any) => (
        <div key={opt.displayName}>
          <div className="mt-2 font-body text-lightgray text-sm">
            {opt.displayName}: Required
          </div>

          <div className="flex flex-wrap mt-2">
            {opt.values.map((v: any, i: number) => {
              const active = (choices as any)[opt.displayName]

              return v.hexColors ? (
                <div
                  key={`${v.entityId}-${i}`}
                  className={cn(
                    'w-9 h-9 border-2 text-center mr-1',
                    cn(v.label === active ? 'border-black' : 'border-lightgray')
                  )}
                >
                  <button
                    className={cn(`w-5/6 h-5/6 align-text-top`, s.colorBtn)}
                    style={{
                      backgroundColor: v.hexColors ? v.hexColors[0] : '',
                    }}
                    onClick={() => {
                      setChoices((choices) => {
                        return {
                          ...choices,
                          [opt.displayName]: v.label,
                        }
                      })
                    }}
                  />
                </div>
              ) : (
                <div
                  key={`${v.entityId}-${i}`}
                  className={cn(
                    'border-2 text-center px-2 py-1 mr-4 cursor-pointer',
                    cn(
                      v.label === active ? 'border-black' : 'border-lightgray'
                    ),
                    s.optionsLabel
                  )}
                  onClick={() => {
                    setChoices((choices) => {
                      return {
                        ...choices,
                        [opt.displayName]: v.label,
                      }
                    })
                  }}
                >
                  <h1>{v.label}</h1>
                </div>
              )
            })}
          </div>
        </div>
      ))}
      <div className="mt-4 font-body text-lightgray text-sm">Quantity:</div>
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
          disabled={!variant}
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
          variant={product.variants?.edges?.[0]!}
        />
      </div>
    </div>
  )
}

export default ProductDetails
