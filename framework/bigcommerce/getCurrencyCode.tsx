import { CurrencyCode } from './schema.d'

export default function getCurrencyCode(locale) {
  let newCurrency: CurrencyCode = CurrencyCode['Usd']
  //   let newCurrency = "USD"

  const EUcountries = [
    'BE',
    'BG',
    'CZ',
    'DK',
    'DE',
    'EE',
    'IE',
    'EL',
    'ES',
    'FR',
    'HR',
    'IT',
    'CY',
    'LV',
    'LT',
    'LU',
    'HU',
    'MT',
    'NL',
    'AT',
    'PL',
    'PT',
    'RO',
    'SI',
    'SK',
    'FI',
    'SE',
  ]

  let newCurrStr = 'USD'
  let localeUpper = locale?.toUpperCase()
  console.log('Locale upper: ', localeUpper)

  if (localeUpper === 'EN-GB') {
    newCurrStr = 'GBP'
  } else if (localeUpper === 'EN-CA') {
    newCurrStr = 'CAD'
  } else if (localeUpper === 'ES') {
    newCurrStr = 'MXN'
  } else if (EUcountries.includes(localeUpper)) {
    newCurrStr = 'EUR'
  } else {
    newCurrStr = 'USD'
  }

  //   const acceptedCurrencies = ['USD', 'GBP', 'CAD', 'EUR', 'MXN']
  let str = newCurrStr.toLowerCase()
  let cCode: string = str[0].toUpperCase() + str.slice(1, str.length)
  // newCurrency = CurrencyCode[cCode]
  // newCurrency = currency_code
  newCurrency = Object(CurrencyCode)[cCode]
  console.log('Returning new currency: ', newCurrency, str)

  return newCurrency
}
