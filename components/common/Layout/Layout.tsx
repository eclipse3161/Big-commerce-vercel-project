import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import React, { FC, useState, useEffect } from 'react'
import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Sidebar, Button, Modal, LoadingDots } from '@components/ui'
import { CartDropdown, CartModalView, CartSidebarView } from '@components/cart'

import { CommerceProvider } from '@framework'
import type { Page } from '@framework/api/operations/get-all-pages'
import NavSearch from '../NavSearch'
import ProductPreview from '@components/product/ProductPreview/ProductPreview'
// import { ProductModalProvider } from "../../product/ProductModalContext/ProductModalContext"
import NavMobile from '../navMobile/NavMobile'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const LoginView = dynamic(
  () => import('@components/auth/LoginView'),
  dynamicProps
)
const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
)
const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)
const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps
)

interface Props {
  pageProps: {
    pages?: Page[]
  }
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const {
    openModalDropdown,
    closeModalDropdown,
    displayModalDropdown,
    displaySidebar,
    displayModalCart,
    displayModal,
    closeSidebar,
    closeModalCart,
    closeModal,
    modalView,
    localeData,
  } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()
  const [categories, setCategories] = useState([])

  const childrenWithExtraProp = React.Children.map(children, (child) =>
    /* @ts-ignore */
    React.cloneElement(child, { setCategories })
  )

  return (
    <CommerceProvider locale={locale}>
      <div className={cn(s.root)}>
        <div
          style={{ position: 'relative' }}
          className="mobile:hidden laptop:block"
        >
          <Navbar localeData={localeData} />

          <NavSearch categories={categories} />
        </div>

        <NavMobile categories={categories} />

        <main className="fit">{childrenWithExtraProp}</main>
        <Footer pages={pageProps.pages} />

        <Sidebar open={displaySidebar} onClose={closeSidebar}>
          <CartSidebarView />
        </Sidebar>

        <Modal open={displayModalCart} onClose={closeModalCart}>
          <CartModalView />
        </Modal>

        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'LOGIN_VIEW' && <LoginView />}
          {modalView === 'SIGNUP_VIEW' && <SignUpView />}
          {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
          {modalView === 'PRODUCT_PREVIEW' && <ProductPreview />}
        </Modal>

        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
