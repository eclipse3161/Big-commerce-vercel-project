export const productPrices = /* GraphQL */ `
  fragment productPrices on Prices {
    price {
      value
      currencyCode
    }
    salePrice {
      value
      currencyCode
    }
    retailPrice {
      value
      currencyCode
    }
  }
`

export const swatchOptionFragment = /* GraphQL */ `
  fragment swatchOption on SwatchOptionValue {
    isDefault
    hexColors
  }
`

export const multipleChoiceOptionFragment = /* GraphQL */ `
  fragment multipleChoiceOption on MultipleChoiceOption {
    values {
      edges {
        node {
          label
          entityId
          ...swatchOption
        }
      }
    }
  }

  ${swatchOptionFragment}
`

export const rootProductFragment = `
  fragment productInfoRoot on Product {
    entityId
    name
    sku
    path
    brand {
      entityId
    }
    description
    prices(currencyCode: $currencyCode) {
      ...productPrices
    }
    availabilityV2 {
      status
    }
    customFields {
      edges {
        node {
          name
          value
        }
      }
    }
    images {
      edges {
        node {
          urlOriginal
          altText
          isDefault
        }
      }
    }
    variants {
      edges {
        node {
          entityId
          defaultImage {
            urlOriginal
            altText
            isDefault
          }
        }
      }
    }
    productOptions {
      edges {
        node {
          __typename
          entityId
          displayName
          isRequired
          ...multipleChoiceOption
        }
      }
    }
    categories{
      edges{
        node {
          breadcrumbs(depth:4) {
            edges{
              node {
                name
                entityId
              }
            }
          }
        }
      }
    }
    localeMeta: metafields(namespace: $locale, keys: ["name", "description"])
      @include(if: $hasLocale) {
      edges {
        node {
          key
          value
        }
      }
    }
  }

  ${productPrices}
  ${multipleChoiceOptionFragment}
`

export const productInfoFragment = /* GraphQL */ `
  fragment productInfo on Product {
    ...productInfoRoot
    relatedProducts {
      edges {
        node {
          ...productInfoRoot
        }
      }
    }
  }

  ${rootProductFragment}
`

export const productConnectionFragment = /* GraphQL */ `
  fragment productConnnection on ProductConnection {
    pageInfo {
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        ...productInfo
      }
    }
  }

  ${productInfoFragment}
`
