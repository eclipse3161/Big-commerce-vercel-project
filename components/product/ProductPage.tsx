// @ts-nocheck
import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import CustomersViewed from './CustomersViewed/CustomersViewed'
import ProductHero from './ProductHero'
import ProductDetails from './ProductDetails/ProductDetails'
import ProductPayment from './ProductPayment'
import { NextSeo } from 'next-seo'
import { Container } from '@components/ui'
import { useUI } from '@components/ui/context'
import useProductVideo from '@framework/products/use-product-video'

const ProductPage: FC = ({ product }) => {
  const [highlights, setHighlights] = useState<Array<any>>([])
  const [specs, setSpecs] = useState<Array<any>>([])
  const [showDetails, setShowDetails] = useState<Boolean>(false)
  const { activeProduct } = useUI()

  // console.log("PRODUCT: ", product);

  const { data: videos } = useProductVideo({
    productId: product?.entityId,
  })

  useEffect(() => {
    const tempDsc: Array<any> = []
    const tempSpecs: Array<any> = []
    // @ts-ignore
    product?.customFields?.edges?.map((edge) => {
      const node = edge?.node
      if (node?.name.includes('Highlights')) tempDsc.push(node)
      else tempSpecs.push(node)
    })

    setHighlights(tempDsc)
    setSpecs(tempSpecs)
  }, [product])

  useEffect(() => {
    if (
      product?.description ||
      (videos && videos.length > 0) ||
      (specs && specs.length > 0)
    ) {
      setShowDetails(true)
    }
  }, [specs, product.description, videos])

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
        <div className="hidden tablet:block w-full m-auto my-6 block text-center text-gray text-xs">
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
      {product && (
        <>
          <ProductHero product={product} highlights={highlights} />
          <ProductPayment />
          {showDetails && (
            <ProductDetails
              description={product?.description}
              specs={specs}
              videos={videos}
            />
          )}
          {!activeProduct && product?.relatedProducts?.edges?.length > 0 && (
            <CustomersViewed
              relatedProducts={product?.relatedProducts?.edges}
            />
          )}
        </>
      )}
    </Container>
  )
}

export default ProductPage
