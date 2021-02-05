import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceSearch from '@commerce/products/use-search'
import type { SearchProductsData } from '../api/catalog/products'
// import useData from '../api/utils/use-data'
import useData from '@commerce/utils/use-data'

const defaultOpts = {
  url: '/api/bigcommerce/catalog/productVideo',
  method: 'GET',
}

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
  sort?: string
}

export const fetcher: HookFetcher<SearchProductsData, SearchProductsInput> = (
  options,
  { productId },
  fetch
) => {
  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')

  if (productId) url.searchParams.set('productId', productId)

  return fetch({
    url: url.pathname + url.search,
    method: options?.method ?? defaultOpts.method,
  })
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<SearchProductsData, SearchProductsInput>
) {
  const useProductVideo = (input: any = {}) => {
    const response = useData(
      defaultOpts,
      [['productId', input.productId]],
      customFetcher,
      { ...swrOptions }
    )

    return response
  }

  useProductVideo.extend = extendHook

  return useProductVideo
}

export default extendHook(fetcher)
