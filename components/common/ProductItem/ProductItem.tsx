import cn from 'classnames'
import s from './ProductItem.module.css'

type Product = {
  title: string
  image: string
  price: string
}

interface ProductItemProps {
  product: Product
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className={s.root}>
      <div className={s.image}>
        <img src={product.image} alt="product" />
      </div>
      <h2 className="text-sm text-center tracking-wide text-gray-500">{product.title}</h2>
      <h2 className="text-sm text-center text-red font-bold">{product.price}</h2>
    </div>
  )
}

export default ProductItem
