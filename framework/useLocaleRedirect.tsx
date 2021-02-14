import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const getCountryCode = async () => {
  return new Promise((resolve, reject) => {
    try {
      fetch('https://geolocation-db.com/json/')
        .then((res) => res.json())
        .then((data) => {
          resolve(data?.country_code.toLowerCase())
        })
    } catch (error) {
      console.log(error)
      return 'en'
    }
  })
}

export const useLocaleRedirect = async () => {
  const router = useRouter()
  const [countryCode, setCountryCode] = useState('')

  const getCode = async () => {
    const code = await getCountryCode()
    setCountryCode(code)
  }

  useEffect(() => {
    getCode()
  }, [])

  useEffect(() => {
    if (countryCode?.length > 0) {
      let newCode = countryCode === 'us' ? 'en-US' : countryCode
      if (router?.locale !== newCode && router?.locales?.includes(newCode)) {
        router.replace(router.asPath, '', {
          locale: newCode,
        })
      }
    }
  }, [countryCode])
}
