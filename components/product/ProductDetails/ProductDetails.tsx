// @ts-nocheck
import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'
import s from './ProductDetails.module.css'
import ChevronUp from '@components/icons/ChevronUp'
import ProductSpecification from './ProductSpecification'
import ProductDescription from './ProductDescription'
import { stat } from 'fs'
import CSS from 'csstype'
import ProductVideos from './ProductVideos'

const activeStyles: CSS.Properties = {
  color: 'white',
  fontWeight: 600,
  backgroundColor: '#012e58',
  width: '121.25px',
  height: '43px',
}

const inactiveStyles: CSS.Properties = {
  border: '1px solid #e5e5e5',
  width: '121.25px',
  height: '43px',
}

const ProductDetails: FC = ({ description, specs, videos }) => {
  const [state, setstate] = useState(0)

  return (
    <div>
      <button
        onClick={() => setstate(0)}
        style={state === 0 ? activeStyles : inactiveStyles}
        className={cn(s.descriptionBtn, 'text-lightgray')}
      >
        Description
      </button>
      {specs?.length > 0 && (
        <button
          onClick={() => setstate(1)}
          style={state === 1 ? activeStyles : inactiveStyles}
          className={cn(s.specBtn, 'text-lightgray')}
        >
          Specification
        </button>
      )}
      {videos?.length > 0 && (
        <button
          onClick={() => setstate(2)}
          style={state === 2 ? activeStyles : inactiveStyles}
          className={cn(s.specBtn, 'text-lightgray')}
        >
          Video{videos?.length > 1 && 's'}
        </button>
      )}

      <hr className="mb-5" />
      <div style={{ display: state === 0 ? 'block' : 'none' }}>
        <ProductDescription description={description} />
      </div>
      <div style={{ display: state === 1 ? 'block' : 'none' }}>
        <ProductSpecification specs={specs} />
      </div>
      <div style={{ display: state === 2 ? 'block' : 'none' }}>
        <ProductVideos videos={videos} />
      </div>
    </div>
  )
}

export default ProductDetails
