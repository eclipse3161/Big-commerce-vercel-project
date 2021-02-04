import { useUI } from '@components/ui/context'
import React from 'react'
import ProductPage from '../ProductPage'

export default function ProductPreview() {
  const { activeProduct } = useUI()
  console.log("ACtive: ", activeProduct);

  return (
    activeProduct && (
      <div className="mw-full">
        <ProductPage product={activeProduct} />
      </div>
    )
  )
}
