import { useEffect, useRef, useState } from 'react'
import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@framework/api'
import LoadingOverlay from 'react-loading-overlay'
import getAllPages from '@framework/api/operations/get-all-pages'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/use-price'
import { Layout } from '@components/common'
import { Button } from '@components/ui'
import { Bag, Cross, Check } from '@components/icons'
import { CartItem } from '@components/cart'
import s from './CartDropdown.module.css'
import { Text, Container } from '@components/ui'
import Link from 'next/link'
import { useUI } from '@components/ui/context'

interface Props {
  open: boolean
  onClose: () => void
}

export default function CartDropdown({ open = false, onClose }) {
  const {
    openModalDropdown,
    closeModalDropdown,
    displayModalDropdown,
  } = useUI()
  const [loading, setLoading] = useState(false)
  const [showCoupon, setShowCoupon] = useState(false)
  const [coupon, setCoupon] = useState('')
  const { data, isEmpty } = useCart()
  console.log('Cart: ', data)
  const { price: subTotal } = usePrice(
    data && {
      amount: data.base_amount,
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: data.cart_amount,
      currencyCode: data.currency.code,
    }
  )

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  const items = data?.line_items.physical_items ?? []

  const error = null
  const success = null

  const applyCoupon = () => {
    console.log('Coupon: ', coupon)
  }

  return (
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
            <li className={s.flexContainer}>
              <div>
                <img
                  src="https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/100x100/attribute_rule_images/4489_source_1604349170.jpg"
                  alt="Oppo A5 2020 Dual SIM 64GB + 3GB RAM"
                  title="Oppo A5 2020 Dual SIM 64GB + 3GB RAM"
                  data-sizes="auto"
                  data-srcset="https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/80w/attribute_rule_images/4489_source_1604349170.jpg 80w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/160w/attribute_rule_images/4489_source_1604349170.jpg 160w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/320w/attribute_rule_images/4489_source_1604349170.jpg 320w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/640w/attribute_rule_images/4489_source_1604349170.jpg 640w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/960w/attribute_rule_images/4489_source_1604349170.jpg 960w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/1280w/attribute_rule_images/4489_source_1604349170.jpg 1280w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/1920w/attribute_rule_images/4489_source_1604349170.jpg 1920w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/2560w/attribute_rule_images/4489_source_1604349170.jpg 2560w"
                  sizes="70px"
                />
              </div>

              <div>
                <span>Oppo</span>

                <h6>
                  <a
                    href="http://phone4u.de/oppo-a5-2020-uk-model-dual-sim-mirror-black-64gb-3gb-ram/"
                    alt=""
                  >
                    Oppo A5 2020 Dual SIM 64GB + 3GB RAM
                  </a>
                </h6>

                <span>
                  2 ×<span>€215.00</span>
                </span>
              </div>
            </li>

            <hr />
          </ul>
          <div style={{ marginTop: '1rem' }} className={s.flexContainer}>
            <div className={s.checkOutBtn}>
              <a href="/checkout">Check out now</a>
            </div>

            <div className={s.viewCartBtn}>
              <a href="/cart.php">View Cart</a>
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
}
