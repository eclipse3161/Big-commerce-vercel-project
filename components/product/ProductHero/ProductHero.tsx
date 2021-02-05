// @ts-nocheck
import { FC, MouseEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import s from './ProductHero.module.css'
import ProductDetails from './ProductDetails'
import { ProductNode } from '@framework/api/operations/get-product'

const ProductHero: FC = ({ product, highlights }) => {
  const [backgroundPosition, setbackgroundPosition] = useState('0% 0%')
  const [defaultImage, setDefaultImage] = useState('')
  const [hover, setHover] = useState(false)

  const handleMouseMove = (e: MouseEvent) => {
    const node = e.target as HTMLElement
    const { left, top, width, height } = node.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - height * 0.5 - top) / height) * 100
    setbackgroundPosition(`${x}% ${y}%`)
    //setState(state.backgroundPosition: `${x}% ${y}%`)
  }

  useEffect(() => {}, [backgroundPosition])

  useEffect(() => {
    setDefaultImage(product?.images?.edges[0]?.node)
  }, [product])

  console.log('Product page: ', product)

  return (
    <div className={s.root}>
      <div className={s.left}>
        <figure
          className={s.figure}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseMove={(e) => handleMouseMove(e)}
          style={{
            backgroundImage: hover ? `url("${defaultImage?.urlOriginal}")` : "none",
            backgroundPosition: backgroundPosition,
          }}
        >
          <img
            className={cn(s.img, ' w-9/12')}
            src={defaultImage?.urlOriginal}
            alt={defaultImage?.altText || 'Product'}
          />
        </figure>

        <div className={s.paymentLeft}>
          <div className="flex justify-between w-full">
            {product?.images?.edges.map((edge) => (
              <div
                className={s.product}
                key={edge?.node?.urlOriginal}
                onClick={() => setDefaultImage(edge?.node)}
              >
                <img
                  src={edge?.node?.urlOriginal}
                  alt={edge?.node?.altText || 'Product'}
                />
              </div>
            ))}
          </div>

          {/* <div className={s.social}>
            <img
              src="/facebook-square-brands.svg"
              className=" mr-3 w-6"
              alt=""
            />
            <img src="/envelope-solid.svg" className="mr-3 w-6" alt="" />
            <img src="/print-solid.svg" className="mr-3 w-6" alt="" />
            <img src="/twitter-brands.svg" className="mr-3 w-6" alt="" />
            <img src="/pinterest-brands.svg" className="mr-3 w-6" alt="" />
          </div> */}
        </div>
      </div>

      <div className={s.right}>
        <ProductDetails product={product} highlights={highlights} />
      </div>
    </div>
  )
}

export default ProductHero
