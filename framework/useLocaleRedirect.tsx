import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'

export const getCountryCode = async () => {
  return new Promise((resolve, reject) => {
    try {
      function showPosition(position) {
        const { latitude, longitude } = position?.coords
        // const latitude = '51.1657'
        // const longitude = '10.4515'
        console.log('Latitude: ' + latitude, 'Longitude: ' + longitude)

        fetch(
          `https://api.opencagedata.com/geocode/v1/json?key=2ec5f5c72e754727b2539adc4ca336c3&q=${latitude},${longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            const currency_code =
              data?.results?.[0]?.annotations?.currency?.iso_code
            const country_code = data?.results?.[0]?.components?.country_code?.toLowerCase()
            // console.log('Country data: ', { currency_code, country_code })
            resolve({ currency_code, country_code })
          })
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        console.log('Geolocation is not supported by this browser.')
      }

      // fetch('https://geolocation-db.com/json/')
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log('Country data: ', data)
      //     resolve(data?.country_code.toLowerCase())
      //   })
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
    const { currency_code, country_code } = await getCountryCode()
    // @ts-ignore
    setLocaleData({ currency_code, country_code })
    // setCountryCode(code)
  }

  useEffect(() => {
    getCode()
  }, [])

  useEffect(() => {
    console.log('Currency: ', currency_code)
    console.log('Country: ', country_code)
  }, [currency_code, country_code])

  useEffect(() => {
    if (country_code?.length > 0) {
      let newCode = country_code === 'us' ? 'en-US' : country_code
      if (router?.locale !== newCode && router?.locales?.includes(newCode)) {
        router.replace(router.asPath, '', {
          locale: newCode,
        })
      }
    }
  }, [country_code])
}
