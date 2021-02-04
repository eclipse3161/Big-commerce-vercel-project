import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useUI } from '@components/ui/context'
import Link from 'next/link'
import usePrice from '@framework/use-price'
import s from './ProductItem.module.css'

interface ProductItemProps {
  product: any
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [hover, setHover] = useState(false)
  const { openModal, setModalView,  setActiveProduct } = useUI()
  const { price } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode!,
  })

  const openProductPreview = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setActiveProduct(product);
    setModalView('PRODUCT_PREVIEW');
    openModal();
  }

  return (
    <div className={s.root}>
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

        <img
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          //onMouseLeave={() => setHover(false)}
          src={product?.images?.edges[0].node.urlOriginal}
          alt={product?.images?.edges[0].node.altText}
        />
      </div>
      <h2 className="text-sm text-center tracking-wide text-gray-500">
        {product.name}
      </h2>
      <h2 className="text-sm text-center text-red font-bold">{price}</h2>
    </div>
  )
}

export default ProductItem
