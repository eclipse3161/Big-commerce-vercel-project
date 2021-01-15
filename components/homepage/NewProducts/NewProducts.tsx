import ProductItem from '@components/common/ProductItem/ProductItem'
import { RightArrow } from '@components/icons'
import { ProductSlider } from '@components/product'
import cn from 'classnames'
import s from './NewProducts.module.css'

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

const NewProducts: React.FC = ({}) => {
  return (
    <div className={s.root}>
      <h2 className={cn(s.heading, 'text-2xl')}>
        <RightArrow className={s.headingIcon} />
        New Products
      </h2>
      <ProductSlider products={products} />
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
