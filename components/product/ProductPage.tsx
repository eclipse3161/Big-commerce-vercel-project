import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import CustomersViewed from './CustomersViewed/CustomersViewed'
import ProductHero from './ProductHero'
import ProductDetails from './ProductDetails/ProductDetails'
import ProductPayment from './ProductPayment'
import ProductVideos from './ProductVideos'
import { NextSeo } from 'next-seo'
import { Container } from '@components/ui'
import usePrice from '@framework/use-price'
import useAddItem from '@framework/cart/use-add-item'
import { useUI } from '@components/ui/context'
import {
  getCurrentVariant,
  getProductOptions,
  SelectedOptions,
} from './helpers'

const ProductPage: FC = ({ product }) => {
  const [highlights, setHighlights] = useState<Array<any>>([])
  const [specs, setSpecs] = useState<Array<any>>([])
  const { activeProduct } = useUI()

  useEffect(() => {
    const tempDsc: Array<any> = []
    const tempSpecs: Array<any> = []
    product?.customFields?.edges?.map((edge) => {
      const node = edge?.node
      if (node?.name.includes('Highlights')) tempDsc.push(node)
      else tempSpecs.push(node)
    })

    setHighlights(tempDsc)
    setSpecs(tempSpecs)
  }, [product])

  return (
    <Container>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images.edges?.[0]?.node.urlOriginal!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      {!activeProduct && (
        <div className="w-full m-auto my-6 block text-center text-gray text-xs">
          <Link href="/">Home</Link> <span className="mx-2">/</span>{' '}
          {product?.categories?.edges[
            product?.categories?.edges.length - 1
          ]?.node?.breadcrumbs?.edges?.map((bread) => (
            <span key={bread?.node?.entityId}>
              <Link href={`/category/${bread?.node?.name}`}>
                {bread?.node?.name}
              </Link>{' '}
              <span className="mx-2">/</span>{' '}
            </span>
          ))}
          {product.name}
        </div>
      )}
      <ProductHero product={product} highlights={highlights} />
      <ProductPayment />
      <ProductDetails product={product} specs={specs} />
      {/* <ProductVideos /> */}
      {!activeProduct && product?.relatedProducts?.edges?.length > 0 && (
        <CustomersViewed relatedProducts={product?.relatedProducts?.edges} />
      )}
    </Container>
  )
}

export default ProductPage
