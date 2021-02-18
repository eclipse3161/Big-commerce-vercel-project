// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@framework/api'
import LoadingOverlay from 'react-loading-overlay'
import getAllPages from '@framework/api/operations/get-all-pages'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/use-price'
import Image from 'next/image'
import { Layout } from '@components/common'
import { Button } from '@components/ui'
import { Bag, Cross, Check } from '@components/icons'
import { CartItem } from '@components/cart'
import s from './CartDropdown.module.css'
import { Text, Container } from '@components/ui'
import Link from 'next/link'
import { useUI } from '@components/ui/context'

function CartProductItem({ item }) {
  const { localeData } = useUI();

  const { price } = usePrice({
    amount: item.extended_sale_price,
    baseAmount: item.extended_list_price,
    currencyCode: localeData.currency_code,
  })

  return (
    <>
      <div>
        <Image
          src={item.image_url}
          width={100}
          height={100}
          alt={item.name}
          // The cart item image is already optimized and very small in size
          unoptimized
        />
      </div>

      <div className="ml-4">
        {/* <span>{item.name}</span> */}

        <h6>
          <a href={item.url} alt={item.name}>
            {item.name}
          </a>
        </h6>

        <span className="font-bold">
          {item.quantity > 1 && `${item.quantity} × `}
          <span>{price}</span>
        </span>
      </div>
    </>
  )
}

export default function CartDropdown() {
  const {
    openModalDropdown,
    closeModalDropdown,
    displayModalDropdown,
    localeData
  } = useUI()

  const [loading, setLoading] = useState(false)
  const [showCoupon, setShowCoupon] = useState(false)
  const [coupon, setCoupon] = useState('')
  const { data, isEmpty } = useCart()
  // console.log('Cart: ', data)
  const { price: subTotal } = usePrice(
    data && {
      amount: data.base_amount,
      currencyCode: localeData.currency_code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: data.cart_amount,
      currencyCode: localeData.currency_code,
    }
  )

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  const items = data?.line_items.physical_items ?? []

  const error = null
  const success = null

  const applyCoupon = () => {
    console.log('Coupon: ', coupon)
  }

  // console.log('Items: ', items)

  return (
    displayModalDropdown && (
      <>
        <LoadingOverlay
          active={loading}
          spinner
          styles={{
            overlay: (base: any) => ({
              ...base,
              background: '#ffffff',
              opacity: 0.4,
            }),
            spinner: (base: any) => ({
              ...base,
              width: '100px',
              '& svg circle': {
                stroke: '#333333',
              },
            }),
          }}
        >
          <div className={s.dropdownContainer}>
            <button
              style={{ alignSelf: 'flex-end', outline: 'none' }}
              onClick={() => closeModalDropdown()}
            >
              X
            </button>
            <ul>
              {items?.length > 0 &&
                items.map((item) => (
                  <li className={s.flexContainer}>
                    <CartProductItem item={item} />
                  </li>
                ))}

              <hr />
            </ul>
            <div style={{ marginTop: '1rem' }} className={s.flexContainer}>
              <div className={s.checkOutBtn}>
                <a href="/checkout">Check out now</a>
              </div>

              <div className={s.viewCartBtn}>
                <Link href="/cart">View Cart</Link>
              </div>
            </div>
            <div>
              <style type="text/css"></style>
              <div></div>
            </div>
          </div>
        </LoadingOverlay>
      </>
    )
  )
}
