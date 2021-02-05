// @ts-nocheck
import { FC, useState } from 'react'
import Link from 'next/link'
import { Container, Text } from '@components/ui'
import cn from 'classnames'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'
import s from './ProductDetails.module.css'
import ChevronUp from '@components/icons/ChevronUp'
// import type { ProductNode } from '@framework/api/operations/get-product'

const ProductDescription: FC = ({ product }) => {
  return (
    <div className={s.description}>
      <Text html={product.description} />
    </div>
  )
}

export default ProductDescription
