import { FC, useState } from 'react'
import Modal from 'react-modal'
import CustomersViewed from './CustomersViewed/CustomersViewed'
import ProductHero from './ProductHero'
import ProductDetails from './ProductHero/ProductDetails'
import ProductPage from './ProductPage'
import ProductPayment from './ProductPayment'
import ProductVideos from './ProductVideos'

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

interface Props {
  modalIsOpen: boolean
  setModalIsOpen?: any
}

const ProductPageModal: FC<Props> = ({ modalIsOpen, setModalIsOpen }) => {
  //const [modalIsOpen, setIsOpen] = useState(false)
  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  return (
    <div
    // isOpen={modalIsOpen}
    // onRequestClose={closeModal}
    // style={customStyles.content}
    // contentLabel="Example Modal"
    >
      <div className="absolute inset-1/2 bg-white p-12">
        <h1>Hello</h1>
        <button onClick={() => setModalIsOpen(false)}>x</button>
      </div>
    </div>
  )
}

export default ProductPageModal
