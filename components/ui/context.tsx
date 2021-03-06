import React, { FC, useMemo } from 'react'
import { ThemeProvider } from 'next-themes'

type LocaleData = {
  currency_code: String
  country_code: String
}

export interface State {
  displayModalCart: boolean
  displayModalDropdown: boolean
  displaySidebar: boolean
  displayDropdown: boolean
  displayModal: boolean
  displayToast: boolean
  modalView: string
  toastText: string
  localeData: LocaleData
}

const initialState = {
  displayModalCart: false,
  displayModalDropdown: false,
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  displayToast: false,
  toastText: '',
  activeProduct: null,
  localeData: {
    currency_code: 'USD',
    country_code: '',
  },
  cartPopupData: null,
}

type Action =
  | {
      type: 'SET_LOCALE_DATA'
      localeData: LocaleData
    }
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'OPEN_MODAL_CART'
      productInfo: any
    }
  | {
      type: 'OPEN_MODAL_DROPDOWN'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }
  | {
      type: 'CLOSE_MODAL_CART'
    }
  | {
      type: 'CLOSE_MODAL_DROPDOWN'
    }
  | {
      type: 'OPEN_TOAST'
    }
  | {
      type: 'CLOSE_TOAST'
    }
  | {
      type: 'SET_TOAST_TEXT'
      text: ToastText
    }
  | {
      type: 'OPEN_DROPDOWN'
    }
  | {
      type: 'CLOSE_DROPDOWN'
    }
  | {
      type: 'OPEN_MODAL'
    }
  | {
      type: 'CLOSE_MODAL'
    }
  | {
      type: 'SET_MODAL_VIEW'
      view: MODAL_VIEWS
    }
  | {
      type: 'SET_ACTIVE_PRODUCT'
      product: any
    }

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'FORGOT_VIEW'
type ToastText = string

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_LOCALE_DATA': {
      return {
        ...state,
        localeData: action.localeData,
      }
    }
    case 'SET_ACTIVE_PRODUCT': {
      return {
        ...state,
        activeProduct: action.product,
      }
    }
    case 'OPEN_MODAL_CART': {
      return {
        ...state,
        displayModalCart: true,
        cartPopupData: {
          product: action.productInfo.product,
          variantId: action.productInfo.variantId,
          quantity: action.productInfo.quantity,
          choices: action.productInfo.choices,
        },
      }
    }
    case 'OPEN_MODAL_DROPDOWN': {
      return {
        ...state,
        displayModalDropdown: true,
      }
    }
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      }
    }
    case 'CLOSE_MODAL_CART': {
      return {
        ...state,
        displayModalCart: false,
      }
    }
    case 'CLOSE_MODAL_DROPDOWN': {
      return {
        ...state,
        displayModalDropdown: false,
      }
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      }
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      }
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
        activeProduct: null,
      }
    }
    case 'OPEN_TOAST': {
      return {
        ...state,
        displayToast: true,
      }
    }
    case 'CLOSE_TOAST': {
      return {
        ...state,
        displayToast: false,
      }
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      }
    }
    case 'SET_TOAST_TEXT': {
      return {
        ...state,
        toastText: action.text,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
  const openModalCart = (
    product: any,
    variantId: any,
    quantity: any,
    choices: any
  ) =>
    dispatch({
      type: 'OPEN_MODAL_CART',
      productInfo: { product, variantId, quantity, choices },
    })
  const openModalDropdown = () => dispatch({ type: 'OPEN_MODAL_DROPDOWN' })
  const closeModalCart = () => dispatch({ type: 'CLOSE_MODAL_CART' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })
  const closeModalDropdown = () => dispatch({ type: 'CLOSE_MODAL_DROPDOWN' })
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_SIDEBAR' })
      : dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' })

  const openDropdown = () => dispatch({ type: 'OPEN_DROPDOWN' })
  const closeDropdown = () => dispatch({ type: 'CLOSE_DROPDOWN' })

  const openModal = () => dispatch({ type: 'OPEN_MODAL' })
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  const openToast = () => dispatch({ type: 'OPEN_TOAST' })
  const closeToast = () => dispatch({ type: 'CLOSE_TOAST' })

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: 'SET_MODAL_VIEW', view })

  const setActiveProduct = (product: any) =>
    dispatch({ type: 'SET_ACTIVE_PRODUCT', product })

  const setLocaleData = (localeData: LocaleData) =>
    dispatch({ type: 'SET_LOCALE_DATA', localeData })

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      openModalCart,
      openModalDropdown,
      closeModalDropdown,
      closeSidebar,
      closeModalCart,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      openToast,
      closeToast,
      setActiveProduct,
      setLocaleData,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
)
