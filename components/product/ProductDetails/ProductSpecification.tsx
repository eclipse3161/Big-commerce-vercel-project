// @ts-nocheck
import { FC } from 'react'
import cn from 'classnames'
import s from './ProductDetails.module.css'

const ProductSpecification: FC = ({ specs }) => {
  return (
    <div className={s.conatiner}>
      {specs.map((spec, idx) => (
        <div className={cn(s.row, 'flex-col laptop:flex-row')} key={idx}>
          <div className={s.left}>{spec.name}</div>
          <div className={s.right}>{spec.value}</div>
        </div>
      ))}
    </div>
  )
}

export default ProductSpecification
