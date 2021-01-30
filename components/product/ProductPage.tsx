import { FC, useState } from 'react'
import Link from 'next/link'
import CustomersViewed from './CustomersViewed/CustomersViewed'
import ProductHero from './ProductHero'
import ProductDetails from './ProductDetails/ProductDetails'
import ProductPayment from './ProductPayment'
import ProductVideos from './ProductVideos'

const ProductPage: FC = () => {
  return (
    <div>
      <div className="w-full m-auto my-6 block text-center text-gray text-xs">
        <Link href="/">Home</Link> <span className="mx-2">/</span>{' '}
        <Link href="/">Smartphones</Link> <span className="mx-2">/</span> Oppo
        A5 2020 Dual SIM 64GB + 3GB RAM
      </div>
      <ProductHero />
      <ProductPayment />
      <ProductDetails />
      <ProductVideos />
      {/* <CustomersViewed /> */}
    </div>
  )
}

export default ProductPage
