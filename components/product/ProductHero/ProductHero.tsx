import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import s from './ProductHero.module.css'
import ProductDetails from './ProductDetails'

const ProductHero: FC = () => {
  const [productImage, setProductImage] = useState('/phone1.jpg')
  const [backgroundPosition, setbackgroundPosition] = useState('0% 0%')
  // const [state, setState] = useState({
  //   backgroundImage: productImage,
  //   backgroundPosition: '0% 0%',
  // })
  const [productName, setProductName] = useState()
  const [productPrice, setProductPrice] = useState()
  const [productSKU, setProductSKU] = useState()
  const [productCondition, setProductCondition] = useState()
  const [productAvailability, setProductAvailability] = useState()
  const [productHighlights, setProductHighlights] = useState()

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log(e.pageX)
    console.log(e.pageY)
    console.log(e.target.getBoundingClientRect())
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - height * 0.5 - top) / height) * 100
    console.log(x, y)
    setbackgroundPosition(`${x}% ${y}%`)
    //setState(state.backgroundPosition: `${x}% ${y}%`)
  }

  useEffect(() => {
    console.log(backgroundPosition)
  }, [backgroundPosition])

  return (
    <div className={s.root}>
      <div className={s.left}>
        <figure
          className={s.figure}
          onMouseMove={(e) => handleMouseMove(e)}
          style={{
            backgroundImage: 'url("/phone1.jpg")',
            backgroundPosition: backgroundPosition,
          }}
        >
          <img className={cn(s.img, ' w-9/12')} src={productImage} alt="" />
        </figure>

        <div className={s.paymentLeft}>
          <div className="flex justify-between w-full">
            <div className={s.product}>
              <img src="/phone1.jpg" alt="" />
            </div>
            <div className={s.product}>
              <img src="/phone2.jpg" alt="" />
            </div>
            <div className={s.product}>
              <img src="/phone3.jpg" alt="" />
            </div>
            <div className={s.product}>
              <img src="/phone4.jpg" alt="" />
            </div>
            <div className={s.product}>
              <img src="/phone5.jpg" alt="" />
            </div>
          </div>

          <div className={s.social}>
            <img
              src="/facebook-square-brands.svg"
              className=" mr-3 w-6"
              alt=""
            />
            <img src="/envelope-solid.svg" className="mr-3 w-6" alt="" />
            <img src="/print-solid.svg" className="mr-3 w-6" alt="" />
            <img src="/twitter-brands.svg" className="mr-3 w-6" alt="" />
            <img src="/pinterest-brands.svg" className="mr-3 w-6" alt="" />
          </div>
        </div>
      </div>

      <div className={s.right}>
        <ProductDetails />
        {/* <div className={s.paymentRight}>
          <img src="/safe.webp" alt="" />
          <h1 className="mt-8 text-2xl mb-3">
            4 Great reasons to buy from us:
          </h1>
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <img src="/topreasons-1-image.png" alt="" />
              <p className="text-center">Secure Ordering</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/30-days.png" alt="" />
              <p className="text-center">30-Day Money-Back Guarantee</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/topreasons-3-image.webp" alt="" />
              <p className="text-center">100% Satisfaction Guaranteed</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/topreasons-4-image.webp" alt="" />
              <p className="text-center">Easy Returns</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ProductHero
