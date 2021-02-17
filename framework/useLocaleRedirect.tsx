import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'
import getCurrencyCode from '@framework/getCurrencyCode'

// export const getCurrencyCode = async () => {
//   return new Promise((resolve, reject) => {

//   })
// }

export const getCountryCode = async () => {
  return new Promise((resolve, reject) => {
    try {
      fetch(
        `http://api.ipstack.com/check?access_key=390fb80e45191ba62aee31e021dc7b8c`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log('RES: ', data)
          const country_code = data?.country_code
          resolve({ country_code })
          // if(data?.country_code && )
          // let currency_code = 'USD'
          // if (data?.location?.is_eu) {
          //   currency_code = 'EUR'
          // }
          // const currency_code =
          //   data?.results?.[0]?.annotations?.currency?.iso_code
          // const country_code = data?.results?.[0]?.components?.country_code?.toLowerCase()
          // console.log('Country data: ', { currency_code, country_code })
          // resolve({ currency_code, country_code })
        })
    } catch (error) {
      console.log(error)
      return 'en'
    }
  })
}

export const useLocaleRedirect = async () => {
  const router = useRouter()
  // const [countryCode, setCountryCode] = useState('')
  const {
    localeData: { currency_code, country_code },
    setLocaleData,
  } = useUI()

  const getCode = async () => {
    const { country_code } = await getCountryCode()
    // await getCountryCode()

    // const currencyCode = getCurrencyCode(router.locale)
    // let newCurrency = getCurrencyCode(currency_code)
    // @ts-ignore
    setLocaleData({ country_code, currency_code })
    // setCountryCode(code)
  }

  useEffect(() => {
    getCode()
  }, [])

  useEffect(() => {
    // console.log('Currency: ', currency_code)
    // console.log('Country: ', country_code)
    // console.log('Locale currencies: ', router.locales)
  }, [country_code])

  useEffect(() => {
    if (country_code?.length > 0) {
      let newCode =
        country_code === 'us' ? 'en-US' : country_code?.toLowerCase()
      newCode = newCode === 'mx' ? 'es' : newCode

      let selectedLocaleArr = router?.locales?.filter((loc) =>
        loc.toLowerCase().includes(newCode)
      ) || ["en-US"]
      const selectedLocale =
        selectedLocaleArr?.length > 0 ? selectedLocaleArr[0] : 'en-US'

      console.log('SelectedLocale: ', selectedLocale)

      const currencyCode = getCurrencyCode(selectedLocale)
      if (router?.locale !== selectedLocale || currencyCode !== currency_code) {
        console.log('SETTING LOCALE TO: ', selectedLocale)
        router.replace(router.asPath, '', {
          locale: selectedLocale,
        })
        console.log('CurrencyState: ', currency_code)
        console.log('NEw currency: ', currencyCode)

        setLocaleData({
          country_code: selectedLocale,
          currency_code: currencyCode,
        })
      }
    }
  }, [country_code])
}
