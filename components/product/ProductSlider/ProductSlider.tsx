import { useKeenSlider } from 'keen-slider/react'
import React, {
  Children,
  FC,
  isValidElement,
  useState,
  useRef,
  useEffect,
} from 'react'
import cn from 'classnames'

import s from './ProductSlider.module.css'
import ProductItem from '@components/common/ProductItem/ProductItem'

type Product = {
  image: string
  title: string
  price: string
}

interface ProductSliderProps {
  products: Array<Product>
  slides: number
}

const ProductSlider: FC<ProductSliderProps> = ({ products, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const slidesPerView = slides

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slidesPerView,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
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

  return (
    <div className={s.root}>
      <button
        className={cn(s.leftControl, s.control)}
        onClick={slider?.prev}
        aria-label="Previous Product Image"
      />
      <button
        className={cn(s.rightControl, s.control)}
        onClick={slider?.next}
        aria-label="Next Product Image"
      />
      <div
        ref={ref}
        className="keen-slider h-full transition-opacity duration-150"
        style={{ opacity: isMounted ? 1 : 0 }}
      >
        {products.map((product, idx) => (
          <div className="keen-slider__slide">
            <ProductItem product={product} key={idx} />
          </div>
        ))}
      </div>
      {slider && (
        <div className={cn(s.positionIndicatorsContainer)}>
          {[
            ...Array(Math.ceil(slider.details().size / slidesPerView)).keys(),
          ].map((idx) => {
            return (
              <button
                aria-label="Position indicator"
                key={idx}
                className={cn(s.positionIndicator, {
                  [s.positionIndicatorActive]: currentSlide === idx,
                })}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
              >
                <div className={s.dot} />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductSlider
