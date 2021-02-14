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
import s from './CartView.module.css'
import { Text, Container } from '@components/ui'
import Link from 'next/link'

export default function CartView() {
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

  const items = data?.line_items.physical_items ?? []

  const error = null
  const success = null

  const applyCoupon = () => {
    console.log("Coupon: ", coupon)
  }

  return (
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
      <Container>
        <div className="grid lg:grid-cols-12">
          <div className="hidden tablet:block lg:col-span-12 w-full m-auto my-6 block text-center text-gray text-xs">
            <Link href="/">Home</Link> <span className="mx-2">/</span> Your Cart{' '}
          </div>
          <div className="lg:col-span-12">
            <Text
              className="text-center"
              variant="pageHeading"
            >{`Your Cart (${items.length} items)`}</Text>
            {isEmpty ? (
              <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
                <h2 className="text-2xl tracking-wide text-center">
                  Your cart is empty
                </h2>
              </div>
            ) : error ? (
              <div className="flex-1 px-4 flex flex-col justify-center items-center">
                <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
                  <Cross width={24} height={24} />
                </span>
                <h2 className="pt-6 text-xl font-light text-center">
                  We couldn’t process the purchase. Please check your card
                  information and try again.
                </h2>
              </div>
            ) : success ? (
              <div className="flex-1 px-4 flex flex-col justify-center items-center">
                <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
                  <Check />
                </span>
                <h2 className="pt-6 text-xl font-light text-center">
                  Thank you for your order.
                </h2>
              </div>
            ) : (
              <div className="px-4 sm:px-6 flex-1">
                <ul className="py-6 pb-3 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-2 border-b border-accents-2">
                  {items.map((item, i) => (
                    <CartItem
                      index={i}
                      key={item.id}
                      item={item}
                      currencyCode={data?.currency.code!}
                      setLoading={setLoading}
                    />
                  ))}
                </ul>
                {/* <div className="my-6">
              <Text>
                Before you leave, take a look at these items. We picked them
                just for you
              </Text>
              <div className="flex py-6 space-x-6">
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <div className="border border-accents-3 w-full h-24 bg-accents-2 bg-opacity-50 transform cursor-pointer hover:scale-110 duration-75" />
                ))}
              </div>
            </div> */}
              </div>
            )}
          </div>
          <div className="lg:col-span-6"></div>
          {!isEmpty && (
            <div className="text-sm lg:col-span-6">
              <div className="flex-shrink-0 px-4 py-8 sm:px-6">
                <div>
                  <ul className="py-3">
                    <li className="border-b border-accents-2 flex justify-between py-3">
                      <span className="font-bold">Subtotal:</span>
                      <span className="tracking-wide">{subTotal}</span>
                    </li>
                    {/* <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li> */}
                    <li className="border-b border-accents-2 flex justify-between py-3">
                      <span className="font-bold">Shipping:</span>
                      <span className="tracking-wide">Add Info</span>
                    </li>
                    <li
                      className={`${
                        !showCoupon && 'border-b border-accents-2'
                      } flex justify-between py-3`}
                    >
                      <span className="font-bold">Coupon Code:</span>
                      <span
                        className="tracking-wide cursor-pointer underline"
                        onClick={() =>
                          setShowCoupon((showCoupon) => !showCoupon)
                        }
                      >
                        {showCoupon ? (
                          <span className="italic">Cancel</span>
                        ) : (
                          'Add Coupon'
                        )}
                      </span>
                    </li>
                    {showCoupon && (
                      <li
                        className={`${
                          showCoupon && 'border-b border-accents-2'
                        } flex justify-between py-2`}
                      >
                        <input
                          className="border border-accents-2 w-full mr-2 px-3"
                          type="text"
                          placeholder="Enter your coupon code"
                          name="coupon"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                        <Button
                          className="bg-lightgray border-lightgray p-2"
                          onClick={applyCoupon}
                        >
                          Apply
                        </Button>
                      </li>
                    )}
                    <li className="border-b border-accents-2 flex justify-between py-3">
                      <span className="font-bold">Grand Total</span>
                      <span className="tracking-wide text-xl">{total}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-row justify-end mt-8">
                  <div className="w-full lg:w-72 flex justify-end">
                    {isEmpty ? (
                      <Button
                        href="/"
                        Component="a"
                        className="bg-lightgray border-lightgray px-2"
                      >
                        Continue Shopping
                      </Button>
                    ) : (
                      <Button href="/checkout" Component="a" width="100%">
                        Checkout
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </LoadingOverlay>
  )
}
