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

  return (
    <div className={cn(s.root, 'flex-col-reverse laptop:flex-row')}>
      <div className={cn(s.left, "w-full laptop:w-5/12")}>
        <figure
          className={cn(s.figure, "hidden laptop:block")}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseMove={(e) => handleMouseMove(e)}
          style={{
            backgroundImage: hover
              ? `url("${defaultImage?.urlOriginal}")`
              : 'none',
            backgroundPosition: backgroundPosition,
          }}
        >
          <img
            className={cn(s.img, 'block w-9/12')}
            src={defaultImage?.urlOriginal}
            alt={defaultImage?.altText || 'Product'}
          />
        </figure>
        <img
            className={cn(s.img, 'block laptop:hidden w-full laptop:w-9/12')}
            src={defaultImage?.urlOriginal}
            alt={defaultImage?.altText || 'Product'}
          />

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

      <div className="w-full laptop:w-2/4">
        <ProductDetails product={product} highlights={highlights} />
      </div>
    </div>
  )
}

export default ProductHero
