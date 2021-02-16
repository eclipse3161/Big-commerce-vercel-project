import { FC, useEffect, useMemo } from 'react'
import cn from 'classnames'
import s from './ViewCart.module.css'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'

interface Props {
  className?: string
  id?: string
}

const ViewCart: FC<Props> = ({ className }: Props) => {
  const router = useRouter()
  const {
    openModalDropdown,
    closeModalDropdown,
    displayModalDropdown,
  } = useUI()

  useEffect(() => {
    router.prefetch('/search')
  }, [])

  return useMemo(
    () => (
      <div
        onClick={() => openModalDropdown()}
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
        <div className={cn(s.viewCart, 'mobile:w-24 laptop:w-32')}>
          <div className={s.viewCartAction}>
            <span className={s.viewCartLabel}>View Cart</span>
            <span></span>
          </div>
        </div>
      </div>
    ),
    []
  )
}

export default ViewCart
