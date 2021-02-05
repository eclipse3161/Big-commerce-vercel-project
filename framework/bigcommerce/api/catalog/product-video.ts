import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  BigcommerceApiHandler,
  BigcommerceHandler,
} from '../utils/create-api-handler'
import { BigcommerceApiError } from '../utils/errors'
import type { ProductEdge } from '../operations/get-all-products'
import getProductVideo from './handlers/get-product-video'

const METHODS = ['GET']

// TODO: a complete implementation should have schema validation for `req.body`
const productVideoApi: BigcommerceApiHandler<any> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  try {
    const body = req.query
    return await handlers['getProductVideo']({ req, res, config, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof BigcommerceApiError
        ? 'An unexpected error ocurred with the Bigcommerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export const handlers = { getProductVideo }

export default createApiHandler(productVideoApi, handlers, {})
