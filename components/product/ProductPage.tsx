import { FC, useState } from 'react'
import CustomersViewed from './CustomersViewed/CustomersViewed'
import ProductHero from './ProductHero'
import ProductDetails from './ProductHero/ProductDetails'
import ProductPayment from './ProductPayment'
import ProductVideos from './ProductVideos'

const ProductPage: FC = () => {
  return (
    <div>
      <ProductHero />
      <ProductPayment />
      <ProductDetails />
      <ProductVideos />
      <CustomersViewed />
    </div>
  )
}

export default ProductPage
