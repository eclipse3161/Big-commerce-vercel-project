import { FC, useState } from 'react'
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

const ProductDetails: FC = () => {
  const [state, setstate] = useState(true)

  return (
    <div>
      <button
        onClick={() => setstate(true)}
        style={state ? activeStyles : inactiveStyles}
        className={s.descriptionBtn}
      >
        Description
      </button>
      <button onClick={() => setstate(false)} className={s.specBtn}>
        Specification
      </button>
      <hr className="mb-5" />
      {state ? <ProductDescription /> : <ProductSpecification />}
    </div>
  )
}

export default ProductDetails
