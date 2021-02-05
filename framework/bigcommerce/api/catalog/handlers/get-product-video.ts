import { BigcommerceApiError } from '../../utils/errors'

// Return current cart info
const getProductVideo = async ({ res, body: { productId }, config }: any) => {
  // let result<{ data: { id: number }[] }> = {}

  if (productId) {
    try {
      let result = await config.storeApiFetch(
        `/v3/catalog/products/${productId}/videos`
      )

      res.status(200).json({ data: result.data ?? null })
    } catch (error) {
      if (error instanceof BigcommerceApiError && error.status === 404) {
      } else {
        throw error
      }
      res.status(error.status)
    }
  }
}

export default getProductVideo
