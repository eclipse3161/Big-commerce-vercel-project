import { FC, useEffect, useMemo } from 'react'
import cn from 'classnames'
import s from './ViewCart.module.css'
import { useRouter } from 'next/router'

interface Props {
  className?: string
  id?: string
}

const ViewCart: FC<Props> = ({ className }) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [])

  return useMemo(
    () => (
      <div
        className={cn(
          //   'relative text-sm bg-accents-1 text-base w-full transition-colors duration-150',
          className
        )}
        style={{
          zIndex: 1,
          position: 'absolute',
          top: 0,
        }}
      >
        <div className={s.viewCart}>
          <div className={s.viewCartAction}>
            <span className={s.viewCartLabel}>View Cart</span>
          </div>
        </div>
      </div>
    ),
    []
  )
}

export default ViewCart
