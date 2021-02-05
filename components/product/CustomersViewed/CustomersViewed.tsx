// @ts-nocheck
import ProductItem from '@components/common/ProductItem/ProductItem'
import { RightArrow } from '@components/icons'
import { ProductSlider } from '@components/product'
import cn from 'classnames'
import s from './CustomersViewed.module.css'

const CustomersViewed: React.FC = ({ relatedProducts }) => {
  console.log("Related: ", relatedProducts)
  return (
    <div className={s.root}>
      <h2 className={cn(s.heading, 'text-2xl')}>
        <RightArrow className={s.headingIcon} />
        CUSTOMERS ALSO VIEWED
      </h2>
      <div className="hidden lg:block">
        <ProductSlider slides={6} products={relatedProducts} />
      </div>
      <div className="hidden md:block lg:hidden">
        <ProductSlider slides={3} products={relatedProducts} />
      </div>
      <div className="md:hidden sm:block">
        <ProductSlider slides={2} products={relatedProducts} />
      </div>
    </div>
  )
}

export default CustomersViewed
