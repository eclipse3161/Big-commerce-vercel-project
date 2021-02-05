import { BigcommerceApiError } from '../../utils/errors'

// Return current cart info
const getProductVideo = async ({ res, body: { productId }, config }: any) => {
  let result = {}

  if (productId) {
    try {
      result = await config.storeApiFetch(
        `/v3/catalog/products/${productId}/videos`
      )
    } catch (error) {
      if (error instanceof BigcommerceApiError && error.status === 404) {
      } else {
        throw error
      }
    }
  }

  res.status(200).json({ data: result.data ?? null })
}

export default getProductVideo
