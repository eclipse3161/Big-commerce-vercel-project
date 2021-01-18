import { FC, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'
import s from './ProductHero.module.css'
import ChevronUp from '@components/icons/ChevronUp'

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
    <div className="mt-7">
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
      <hr className="mb-3" />
      <div className="mt-2">Color: Required</div>
      <div className="flex mt-2">
        <button className="w-6 h-6 border-gray-400 p-1 bg-black mr-2 active:border-2 active:border-gray-400"></button>
        <button className="w-6 h-6 border-gray-400 p-1 bg-red active:border-2 active:border-gray-400"></button>
      </div>
      <div className="mt-4">Quantity:</div>
      <div className={s.counter}>
        <div className="w-7 h-6 text-gray-400 border-gray-400 border-2 inline-block rounded">
          <div className="m-auto w-4">
            <ChevronDown />
          </div>
        </div>
        1
        <div className="w-7 h-6  text-gray-400 border-gray-400 border-2 inline-block rounded">
          <div className="w-2">
            <ChevronUp />
          </div>
        </div>
      </div>
      <button className={s.addBtn}>ADD TO CART</button>
      <button className={s.wishBtn}>ADD TO WHITE LIST</button>
    </div>
  )
}

export default ProductDetails
