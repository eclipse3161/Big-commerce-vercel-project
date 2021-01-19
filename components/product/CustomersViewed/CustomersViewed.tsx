import ProductItem from '@components/common/ProductItem/ProductItem'
import { RightArrow } from '@components/icons'
import { ProductSlider } from '@components/product'
import cn from 'classnames'
import s from './CustomersViewed.module.css'

const products = [
  {
    title: 'Samsung Galaxy A42 128GB 6GB RAM SM-A426B/DS (UNLOCKED) 6.6" 48MP',
    price: '€399.99',
    image: './phone5.jpg',
  },
  {
    title:
      'Pelican Shield Series G10 Case for iPhone 12 and iPhone 12 Pro (5G)',
    price: '€83.99',
    image: './phones6.jpg',
  },
  {
    title: 'Pelican Voyager Series Case for iPhone 12 and iPhone 12 Pro (5G)',
    price: '€75.99',
    image: './phones7.jpg',
  },
  {
    title: `Fintie Slim Case for Samsung Galaxy Tab A7 10.4'' 2020 Model`,
    price: '€17.99',
    image: './phones8.jpg',
  },
  {
    title: `ipad pro case For 12.9 / 11 / 10.5 / 9.7 inch 360° Rotating Smart Cover Case`,
    price: '€13.99 - €19.99',
    image: './phone9.jpg',
  },
]

const CustomersViewed: React.FC = ({}) => {
  return (
    <div className={s.root}>
      <h2 className={cn(s.heading, 'text-2xl')}>
        <RightArrow className={s.headingIcon} />
        CUSTOMERS ALSO VIEWED
      </h2>
      <div className="hidden lg:block">
        <ProductSlider slides={6} products={products} />
      </div>
      <div className="hidden md:block lg:hidden">
        <ProductSlider slides={3} products={products} />
      </div>
      <div className="md:hidden sm:block">
        <ProductSlider slides={2} products={products} />
      </div>
    </div>
  )
}

export default CustomersViewed
