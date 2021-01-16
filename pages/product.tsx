import { useState } from 'react'
import { Layout } from '@components/common'
import { Grid, Marquee, Hero, Container } from '@components/ui'
import ProductHero from '@components/product/ProductHero'

export default function Product() {
  return (
    <div>
      <Container>
        <ProductHero />
      </Container>
    </div>
  )
}

Product.Layout = Layout
