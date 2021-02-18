// @ts-nocheck
const fetch = require('node-fetch')

export default function country(req, res) {
  if (req.method === 'GET') {
    fetch(
      `http://api.ipstack.com/check?access_key=390fb80e45191ba62aee31e021dc7b8c`
    )
      .then((res) => res.json())
      .then((data) => {
        const country_code = data?.country_code
        // resolve({ country_code })
        console.log("Data: ", data)
        res.status(200).json({ country_code })
      })
  }
}
