// @ts-nocheck
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useUI } from '@components/ui/context'
import Link from 'next/link'
import Image from "next/image"
import usePrice from '@framework/use-price'
import s from './ProductItem.module.css'
//
interface ProductItemProps {
  product: any
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [hover, setHover] = useState(false)
  const { openModal, setModalView, setActiveProduct } = useUI()
  const { price, basePrice, discount } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode,
  })

  const openProductPreview = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setActiveProduct(product)
    setModalView('PRODUCT_PREVIEW')
    openModal()
  }

  return (
    <div className={s.root} key={product.entityId}>
      <div className={cn(s.image, 'relative')}>
        <Link href={`/product${product.path}`}>
          <div className={s.overlay}>
            <div
              className={cn(
                s.overlayItem,
                'text-center bg-white w-36 rounded mb-2'
              )}
              onClick={openProductPreview}
            >
              Quick View
            </div>
            <div
              className={cn(
                s.overlayItem,
                'text-center bg-white w-36 rounded mb-2'
              )}
            >
              Choose Options
            </div>
          </div>
        </Link>

        <Image
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          src={product?.images?.edges[0].node.urlOriginal}
          // width={150}
          // height={150}
          layout="fill"
          alt={product?.images?.edges[0].node.altText}
          className={s.productItemImage}
        />
      </div>
      <h2 className="text-sm text-center tracking-wide text-gray-500">
        {product.name}
      </h2>
      <h2 className="text-sm text-center">
        {/* {discount ? <><span>{basePrice}</span>
        <span>{price}</span><> : <span></span>} */}

        {discount && (
          <span style={{ textDecoration: 'line-through' }}>{basePrice}</span>
        )}
        <span className="text-red font-bold ml-1">{price}</span>
      </h2>
    </div>
  )
}

export default ProductItem
