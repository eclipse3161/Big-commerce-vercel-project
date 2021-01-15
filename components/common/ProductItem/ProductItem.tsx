import cn from 'classnames'
import s from './ProductItem.module.css'

type Product = {
  image: string
  name: string
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
      <h2 className="text-sm text-center tracking-wide text-gray-500">Oppo A5 2020 Dual SIM 64GB + 3GB RAM</h2>
      <h2 className="text-sm text-center text-red font-bold">$215.00</h2>
    </div>
  )
}

export default ProductItem
