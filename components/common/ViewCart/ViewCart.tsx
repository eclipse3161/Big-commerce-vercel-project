// @ts-nocheck
import { FC, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import s from './ViewCart.module.css'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'
import useCart from '@framework/cart/use-cart'

interface Props {
  className?: string
  id?: string
}

const ViewCart: FC<Props> = ({ className }: Props) => {
  const [items, setItems] = useState([])

  const router = useRouter()
  const {
    openModalDropdown,
    closeModalDropdown,
    displayModalDropdown,
  } = useUI()

  const { data, isEmpty } = useCart()

  useEffect(() => {
    setItems(data?.line_items.physical_items ?? [])
  }, [data])

  useEffect(() => {
    router.prefetch('/search')
  }, [])

  // console.log('Top items: ', items)

  return (
    <div
      onClick={() =>
        displayModalDropdown ? closeModalDropdown() : openModalDropdown()
      }
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
          {items.length > 0 && (
            <span className={s.viewCartCounter}>{items.length}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewCart
