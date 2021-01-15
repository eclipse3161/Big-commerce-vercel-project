import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useKeenSlider } from 'keen-slider/react'

function ArrowLeft(props: any) {
  const disabeld = props.disabled ? ' arrow--disabled' : ''
  return (
    <svg
      onClick={props.onClick}
      className={'arrow arrow--left' + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  )
}

function ArrowRight(props: any) {
  const disabeld = props.disabled ? ' arrow--disabled' : ''
  return (
    <svg
      onClick={props.onClick}
      className={'arrow arrow--right' + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  )
}

const images = ['./banner1.jpg', './banner1.jpg', './banner2.jpg']

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timer = useRef<any>(undefined)
  const [pause, setPause] = useState(false)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    loop: true,
    duration: 1000,

    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next()
      }
    }, 5000)
    return () => {
      clearInterval(timer.current)
    }
  }, [pause, slider])

  const prev = (e: Event) => {
    e.stopPropagation();
    slider.prev();
  }

  const next = (e: Event) => {
    e.stopPropagation();
    slider.next();
  }

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef as React.RefObject<HTMLDivElement>} className="keen-slider">
          {images.map((src, idx) => (
            <div key={idx} className="keen-slider__slide number-slide1">
              <img src={src} />
            </div>
          ))}
        </div>
        {slider && (
          <>
            <ArrowLeft onClick={prev} />
            <ArrowRight onClick={next} />
          </>
        )}
      </div>
      {slider && (
        <div className="dots">
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              />
            )
          })}
        </div>
      )}
    </>
  )
}
