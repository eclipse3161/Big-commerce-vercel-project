import type {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from '../../schema'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import setProductLocaleMeta from '../utils/set-product-locale-meta'
import { productConnectionFragment } from '../fragments/product'
import { BigcommerceConfig, getConfig } from '..'

export const getAllProductsByCategoryQuery = /* GraphQL */ `
  query ProductsByCategory(
    $path: String!
    $locale: String = "null"
    $hasLocale: Boolean = false
    $currencyCode: currencyCode = USD
    ) {
    site {
      route(path: $path) {
        node {
          id
          ... on Category {
            name
            entityId
            description
            products {
              ...productConnnection
            }
          }
        }
      }
    }
  }
  

  ${productConnectionFragment}
`

async function getAllProductsByCategory({
  query = getAllProductsByCategoryQuery,
  variables: { slug, ...vars },
  config,
}: {
  query?: string
  variables?: any
  config?: BigcommerceConfig
  preview?: boolean
} = {}) {
  config = getConfig(config)

  const locale = vars.locale || config.locale
  const variables = {
    ...vars,
    locale,
    hasLocale: !!locale,
    path: slug ? `/${slug}/` : vars.path!,
  }

  const { data } = await config.fetch(query, { variables })

  const category = data.site?.route?.node

  return {
    category,
  }
}

export default getAllProductsByCategory
