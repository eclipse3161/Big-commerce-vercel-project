import { useState } from 'react'
import { Layout } from '@components/common'
import { Grid, Marquee, Hero, Container } from '@components/ui'
import ProductHero from '@components/product/ProductHero'
import ProductPayment from '@components/product/ProductPayment'

export default function Product() {
  return (
    <div>
      <Container>
        <ProductHero />
        <ProductPayment />
      </Container>
    </div>
  )
}

Product.Layout = Layout
