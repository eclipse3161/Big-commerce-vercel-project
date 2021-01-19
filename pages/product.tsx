import { useState } from 'react'
import { Layout } from '@components/common'
import { Grid, Marquee, Hero, Container } from '@components/ui'
import ProductHero from '@components/product/ProductHero'
import ProductPayment from '@components/product/ProductPayment'
import CustomersViewed from '@components/product/CustomersViewed/CustomersViewed'
import ProductDetails from '@components/product/ProductDetails/ProductDetails'
import ProductVideos from '@components/product/ProductVideos'

export default function Product() {
  return (
    <div>
      <Container>
        <ProductHero />
        <ProductPayment />

        <ProductDetails />
        <ProductVideos />
        <CustomersViewed />
      </Container>
    </div>
  )
}

Product.Layout = Layout
