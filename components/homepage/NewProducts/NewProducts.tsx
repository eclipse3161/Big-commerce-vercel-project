import ProductItem from '@components/common/ProductItem/ProductItem'
import { RightArrow } from '@components/icons'
import { ProductSlider } from '@components/product'
import cn from 'classnames'
import s from './NewProducts.module.css'

interface Props {
  newestProducts: Object[]
}

const NewProducts: React.FC<Props> = ({ newestProducts }) => {
  return (
    <div className={s.root}>
      <h2 className={cn(s.heading, 'text-2xl')}>
        <RightArrow className={s.headingIcon} />
        New Products
      </h2>
      <div className="sm:block md:hidden">
        <ProductSlider slides={2} products={newestProducts} />
      </div>
      <div className="hidden md:block lg:hidden">
        <ProductSlider slides={3} products={newestProducts} />
      </div>
      <div className="hidden lg:block">
        <ProductSlider slides={4} products={newestProducts} />
      </div>
      {/* <h2 className={cn(s.heading, 'text-2xl')}>
        <RightArrow className={s.headingIcon} />
        New Products
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <ProductItem product={product} key={idx} />
        ))}
      </div> */}
    </div>
  )
}

export default NewProducts
