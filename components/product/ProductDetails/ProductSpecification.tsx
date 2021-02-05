// @ts-nocheck
import { FC, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'
import s from './ProductDetails.module.css'
import ChevronUp from '@components/icons/ChevronUp'

const ProductSpecification: FC = ({ specs }) => {
  return (
    <div className={s.conatiner}>
      {specs.map((spec, idx) => (
        <div className={s.row} key={idx}>
          <div className={s.left}>{spec.name}</div>
          <div className={s.right}>{spec.value}</div>
        </div>
      ))}
    </div>
  )
}

export default ProductSpecification
