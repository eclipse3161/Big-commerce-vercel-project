import { FC, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'
import s from './ProductHero.module.css'

const ProductDetails: FC = () => {
  const [productImage, setProductImage] = useState()
  const [productName, setProductName] = useState(
    'Oppo A5 2020 Dual SIM 64GB + 3GB RAM'
  )
  const [productPrice, setProductPrice] = useState('€215.00')
  const [productSKU, setProductSKU] = useState('CPH1931')
  const [productCondition, setProductCondition] = useState('New')
  const [productAvailability, setProductAvailability] = useState(
    'Ships within 3 business days'
  )
  const [productHighlights, setProductHighlights] = useState(
    <p>
      Android 9 – ColorOS 6.1 <br /> 6.5” Waterdrop Notch Sunlight Display{' '}
      <br /> Qualcomm Snapdragon 665 processor <br /> 12MP Quad Camera for great
      photos <br /> Ultra-Night Mode 2.0 / 119° Ultra-Wide-Angle Lens <br /> 8MP
      Front-facing camera – AI Beautification <br /> 3-Card Slot (Dual SIM +
      MicroSD)
    </p>
  )

  return (
    <div>
      <h1 className="text-3xl">{productName}</h1>
      <div className="text-red text-xl">{productPrice}</div>
      <div className="mb-1">
        <span className="font-bold text-gray-700 text-sm">SKU:</span>{' '}
        {productSKU}
      </div>
      <div className="mb-1">
        <span className="font-bold text-gray-700 text-sm">Condition:</span>{' '}
        {productCondition}
      </div>
      <div className="mb-2">
        <span className="font-bold text-gray-700 text-sm">Availability: </span>{' '}
        {productAvailability}
      </div>
      <div className="mb-2">
        <span className="font-bold text-gray-700 text-sm">
          PRODUCT HIGHLIGHTS
        </span>
      </div>
      <div>{productHighlights}</div>
      <hr />
      <div className="mt-2">Color: Required</div>
      <div className="flex">
        <div className="w-6 h-6 border-gray-400 p-1 bg-black mr-2"></div>
        <div className="w-6 h-6 border-gray-400 p-1 bg-red"></div>
      </div>
    </div>
  )
}

export default ProductDetails