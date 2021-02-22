// @ts-nocheck
import { FC, MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import s from './ProductHero.module.css'
import ProductDetails from './ProductDetails'
import ProductImage from './ProductImage'

const ProductHero: FC = ({ product, highlights }) => {
  const [chosenVariant, setChosenVariant] = useState(null)

  return (
    <div className={cn(s.root, 'flex-col-reverse laptop:flex-row')}>
      <div className={cn('w-full laptop:w-5/12 hidden laptop:block')}>
        <ProductImage chosenVariant={chosenVariant} product={product} />
      </div>

      <div className="w-full laptop:w-2/4">
        <ProductDetails
          product={product}
          highlights={highlights}
          chosenVariant={chosenVariant}
          setChosenVariant={setChosenVariant}
        />
      </div>
    </div>
  )
}

export default ProductHero
