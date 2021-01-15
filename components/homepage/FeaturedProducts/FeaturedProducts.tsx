import ProductItem from '@components/common/ProductItem/ProductItem'
import { RightArrow } from '@components/icons'
import cn from 'classnames'
import s from './FeaturedProducts.module.css'

const products = [
  {
    title: 'Oppo A5 2020 Dual SIM 64GB + 3GB RAM',
    price: '€215.00',
    image: './phone1.jpg',
  },
  {
    title: 'Oppo Reno2 Z - Dual SIM 128GB + 8GB RAM',
    price: '€602.00',
    image: './phone2.jpg',
  },
  {
    title: 'Oppo Find X2 Pro 512GB-12GB RAM in Ceramic Black',
    price: '€1,120.00',
    image: './phone3.jpg',
  },
  {
    title: 'Oppo Find X2 Neo 256GB -12GB RAM in Moonlight Black',
    price: '€599.93',
    image: './phone4.jpg',
  },
]

const FeaturedProducts: React.FC = ({}) => {
  return (
    <div className={s.root}>
      <h2 className={cn(s.heading, 'text-2xl')}>
        <RightArrow className={s.headingIcon} />
        Featured Products
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <ProductItem product={product} key={idx} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
