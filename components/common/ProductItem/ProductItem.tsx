import ProductPageModal from '@components/product/ProductPageModal'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useUI } from '@components/ui/context'
// import Modal from 'react-modal'
import s from './ProductItem.module.css'

type Product = {
  title: string
  image: string
  price: string
}

interface ProductItemProps {
  product: Product
}

const customStyles = {
  content: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    // right: 'auto',
    // bottom: 'auto',
    //marginRight: '-50%',
    //transform: 'translate(-50%, -50%)',
  },
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const { openModal, setModalView, closeModal } = useUI()

  // useEffect(() => {
  //   console.log(hover)
  // }, [hover])
  const openProductPreview = () => {
    setModalView("PRODUCT_PREVIEW");
    openModal();
  }

  return (
    <div className={s.root}>
      <div
        onClick={openProductPreview}
        className={cn(s.image, 'relative')}
      >
        <div className={s.overlay}>
          <div
            className={cn(
              s.overlayItem,
              'text-center bg-white w-36 rounded mb-2'
            )}
          >
            Quick View
          </div>
          <div
            className={cn(
              s.overlayItem,
              'text-center bg-white w-36 rounded mb-2'
            )}
          >
            Choose Options
          </div>
        </div>

        <img
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          //onMouseLeave={() => setHover(false)}
          src={product.image}
          alt="product"
        />
      </div>
      <h2 className="text-sm text-center tracking-wide text-gray-500">
        {product.title}
      </h2>
      <h2 className="text-sm text-center text-red font-bold">
        {product.price}
      </h2>
    </div>
  )
}

export default ProductItem
