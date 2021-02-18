import { useState } from 'react'
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
import s from './CartModalView.module.css'
import { Text, Container } from '@components/ui'
import Link from 'next/link'

export default function CartModalView() {
  const [loading, setLoading] = useState(false)
  const [showCoupon, setShowCoupon] = useState(false)
  const [coupon, setCoupon] = useState('')
  const { data, isEmpty } = useCart()
  // console.log('Cart: ', data)

  const { price: total } = usePrice(
    data && {
      amount: data.cart_amount,
      currencyCode: data.currency.code,
    }
  )

  const items = data?.line_items.physical_items ?? []

  const { price: itemPrice } = usePrice(
    data && {
      amount: items[0].extended_list_price,
      currencyCode: data.currency.code,
    }
  )

  const { price: subTotal } = usePrice(
    data && {
      amount: items[0].extended_list_price * items[0].quantity,
      currencyCode: data.currency.code,
    }
  )

  console.log('items', items)
  console.log('itemPrice', itemPrice)

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
        <div className={s.columnFlex}>
          <div>
            <h1 className={s.title}>
              Ok, {items[0].quantity} items were added to your cart. What's
              next?
            </h1>
          </div>
          <div>
            <hr className="mt-4" />
            <div className="mt-8">
              <div className={s.flexContainer}>
                <section className={s.leftSection}>
                  <figure>
                    <div>
                      <img
                        src={items[0].image_url}
                        alt="Oppo A5 2020 Dual SIM 64GB + 3GB RAM"
                        title="Oppo A5 2020 Dual SIM 64GB + 3GB RAM"
                        data-sizes="auto"
                        //srcset="https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/80w/attribute_rule_images/4489_source_1604349170.jpg 80w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/160w/attribute_rule_images/4489_source_1604349170.jpg 160w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/320w/attribute_rule_images/4489_source_1604349170.jpg 320w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/640w/attribute_rule_images/4489_source_1604349170.jpg 640w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/960w/attribute_rule_images/4489_source_1604349170.jpg 960w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/1280w/attribute_rule_images/4489_source_1604349170.jpg 1280w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/1920w/attribute_rule_images/4489_source_1604349170.jpg 1920w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/2560w/attribute_rule_images/4489_source_1604349170.jpg 2560w"
                        //data-srcset="https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/80w/attribute_rule_images/4489_source_1604349170.jpg 80w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/160w/attribute_rule_images/4489_source_1604349170.jpg 160w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/320w/attribute_rule_images/4489_source_1604349170.jpg 320w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/640w/attribute_rule_images/4489_source_1604349170.jpg 640w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/960w/attribute_rule_images/4489_source_1604349170.jpg 960w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/1280w/attribute_rule_images/4489_source_1604349170.jpg 1280w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/1920w/attribute_rule_images/4489_source_1604349170.jpg 1920w, https://cdn11.bigcommerce.com/s-toyeabc219/images/stencil/2560w/attribute_rule_images/4489_source_1604349170.jpg 2560w"
                        width="350px"
                      />
                    </div>
                  </figure>
                </section>

                <section className={s.middleSection}>
                  <div>
                    <h4 className={s.itemTitle}>{items[0].name}</h4>

                    <div className={s.brand}>Oppo</div>

                    <div className={s.rate}>
                      {items[0].quantity} × {itemPrice}
                    </div>

                    <dl>
                      <dt>
                        <strong style={{ marginRight: '0.7rem' }}>Color</strong>{' '}
                        White
                      </dt>
                    </dl>
                  </div>
                </section>

                <section className={s.checkoutSection}>
                  <div className={s.proceedCheckout}>
                    <a href="/checkout">Proceed to checkout</a>
                  </div>

                  <div>
                    <div></div>
                  </div>

                  <div style={{ marginTop: '3rem' }}>Order subtotal</div>
                  <strong style={{ marginTop: '2px', fontSize: '28px' }}>
                    {subTotal}
                  </strong>
                  <p className="mt-4 mb-8">
                    Your cart contains {items[0].quantity} items
                  </p>
                  <div className={s.proceedCheckout}>
                    <a href="#">Continue Shopping</a>
                  </div>

                  <div className={s.viewCart}>
                    <a href="/cart.php">View or edit your cart</a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  )
}
