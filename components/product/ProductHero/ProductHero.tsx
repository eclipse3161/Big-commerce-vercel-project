// @ts-nocheck
import { FC, MouseEvent, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import s from './ProductHero.module.css'
import ProductDetails from './ProductDetails'
import { ProductNode } from '@framework/api/operations/get-product'
import Slider from '@components/Slider/Slider'

const ProductHero: FC = ({ product, highlights }) => {
  const [backgroundPosition, setbackgroundPosition] = useState('0% 0%')
  const [defaultImage, setDefaultImage] = useState('')
  const [hover, setHover] = useState(false)
  const [chosenVariant, setChosenVariant] = useState(null)
  const [productImages, setProductImages] = useState([])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const slidesPerView = 4

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slidesPerView,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      console.log('Changed initally')
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    const preventNavigation = (event: TouchEvent) => {
      // Center point of the touch area
      const touchXPosition = event.touches[0].pageX
      // Size of the touch area
      const touchXRadius = event.touches[0].radiusX || 0

      // We set a threshold (10px) on both sizes of the screen,
      // if the touch area overlaps with the screen edges
      // it's likely to trigger the navigation. We prevent the
      // touchstart event in that case.
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault()
    }
  }, [])

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
    if (product?.images?.edges[0]?.node)
      setDefaultImage(product?.images?.edges[0]?.node)
  }, [product])

  useEffect(() => {
    if (chosenVariant?.node?.defaultImage)
      setDefaultImage(chosenVariant?.node?.defaultImage)
  }, [chosenVariant])

  useEffect(() => {
    if (product?.images) {
      // slider?.refresh({
      //   loop: false,
      //   slidesPerView,
      //   mounted: () => setIsMounted(true),
      //   slideChanged(s) {
      //     console.log("Changed secondly")
      //     setCurrentSlide(s.details().relativeSlide)
      //   },
      // })
      slider?.resize()
    }
  }, [product?.images])

  return (
    <div className={cn(s.root, 'flex-col-reverse laptop:flex-row')}>
      <div className={cn(s.left, 'w-full laptop:w-5/12')}>
        <figure
          className={cn(s.figure, 'hidden laptop:block')}
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
          {/* <div className="flex justify-between w-full">
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
          </div> */}

          <div
            className={cn(
              'flex justify-between w-full relative w-full h-full bg-white',
              s.sliderRoot
            )}
          >
            {product?.images?.edges?.length > slidesPerView && (
              <button
                className={cn(s.leftControl, s.control)}
                onClick={slider?.prev}
                aria-label="Previous Product Image"
              />
            )}
            <div
              ref={ref}
              className={cn(
                'keen-slider transition-opacity duration-150',
                s.slides
              )}
              style={{ opacity: isMounted ? 1 : 0 }}
            >
              {product?.images?.edges.map((edge) => (
                <div
                  className={cn('keen-slider__slide', s.productNode)}
                  key={edge?.node?.urlOriginal}
                  onClick={() => setDefaultImage(edge?.node)}
                >
                  <span
                    className={s.product}
                    style={{
                      border:
                        edge?.node?.urlOriginal === defaultImage?.urlOriginal
                          ? '1px solid black'
                          : '1px solid #e5e5e5',
                    }}
                  >
                    <img
                      src={edge?.node?.urlOriginal}
                      alt={edge?.node?.altText || 'Product'}
                      className={s.sliderImage}
                    />
                  </span>
                </div>
              ))}
            </div>

            {product?.images?.edges?.length > slidesPerView && (
              <button
                className={cn(s.rightControl, s.control)}
                onClick={slider?.next}
                aria-label="Next Product Image"
              />
            )}
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
        <ProductDetails
          product={product}
          highlights={highlights}
          chosenVariant={chosenVariant}
          setChosenVariant={setChosenVariant}
        />
      </div>
    </div>
  )
}

export default ProductHero
