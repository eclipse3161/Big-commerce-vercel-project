import type {
  GetAllProductPathsQuery,
  GetAllProductPathsQueryVariables,
} from '../../schema'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import { BigcommerceConfig, getConfig } from '..'
import { categoryTreeItemFragment } from '../fragments/category-tree'

export const getAllCategoryPathsQuery = /* GraphQL */ `
  query getSiteInfo {
    site {
      categoryTree {
        ...categoryTreeItem
        children {
          ...categoryTreeItem
          children {
            ...categoryTreeItem
          }
        }
      }
      brands {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            entityId
            name
            defaultImage {
              urlOriginal
              altText
            }
            pageTitle
            metaDesc
            metaKeywords
            searchKeywords
            path
          }
        }
      }
    }
  }
  ${categoryTreeItemFragment}
`

async function getAllCategoryPaths({
  query = getAllCategoryPathsQuery,
  variables,
  config,
}: {
  query?: string
  variables?: GetAllProductPathsQueryVariables
  config?: BigcommerceConfig
} = {}) {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const { data } = await config.fetch(query, { variables })

  console.log('CATEGORY PATHS: ', data)

  const categories = data.site?.categoryTree
  //   const brands = data.site?.brands?.edges

  return {
    categories: categories ?? [],
  }
}

export default getAllCategoryPaths
