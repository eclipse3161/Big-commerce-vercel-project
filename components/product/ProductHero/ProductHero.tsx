import { FC, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import s from './ProductHero.module.css'
import ProductDetails from './ProductDetails'

const ProductHero: FC = () => {
  const [productImage, setProductImage] = useState('/phone1.jpg')
  const [productName, setProductName] = useState()
  const [productPrice, setProductPrice] = useState()
  const [productSKU, setProductSKU] = useState()
  const [productCondition, setProductCondition] = useState()
  const [productAvailability, setProductAvailability] = useState()
  const [productHighlights, setProductHighlights] = useState()

  return (
    <div className={s.root}>
      <div className={s.left}>
        <img src={productImage} alt="" />
      </div>
      <div className={s.right}>
        <ProductDetails />
      </div>
    </div>
  )
}

export default ProductHero
