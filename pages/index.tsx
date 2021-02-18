import { useState } from 'react'
import rangeMap from '@lib/range-map'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero, Container } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/api/operations/get-all-products'
import getSiteInfo from '@framework/api/operations/get-site-info'
import getAllPages from '@framework/api/operations/get-all-pages'
import Slider from '@components/Slider/Slider'
import FeaturedProducts from '@components/homepage/FeaturedProducts/FeaturedProducts'
import NewProducts from '@components/homepage/NewProducts/NewProducts'
import { getCountryCode, useLocaleRedirect } from 'framework/useLocaleRedirect'
import { useUI } from '@components/ui/context'
import getCurrencyCode from '@framework/getCurrencyCode'
import { CurrencyCode } from '@framework/schema'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  // export async function getServerSideProps({ preview, locale }) {
  const config = getConfig({ locale })
  const currencyCode = getCurrencyCode(locale)
  // await getCountryCode()

  // console.log('LOCALE DATA API: ', { currency_code })
  // console.log('FINAL DATA CHECK: ', { locale, currencyCode })

  // const currencyCode: CurrencyCode = getCurrencyCode(currency_code)

  // console.log("Got currnency code: ", currencyCode)
  // Get Featured Products
  const { products: featuredProducts } = await getAllProducts({
    variables: {
      field: 'featuredProducts',
      first: 6,
      currencyCode,
    },
    config,
    preview,
  })

  // Get Best Selling Products
  const { products: bestSellingProducts } = await getAllProducts({
    variables: {
      field: 'bestSellingProducts',
      first: 6,
      currencyCode,
    },
    config,
    preview,
  })

  // Get Best Newest Products
  const { products: newestProducts } = await getAllProducts({
    variables: {
      field: 'newestProducts',
      first: 12,
      currencyCode,
    },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  // These are the products that are going to be displayed in the landing.
  // We prefer to do the computation at buildtime/servertime
  const { featured, bestSelling } = (() => {
    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.prices.price.value - b.node.prices.price.value)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

  return {
    props: {
      featured,
      bestSelling,
      newestProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

// export async function getStaticProps({
//   preview,
//   locale,
// }: GetStaticPropsContext) {

// }

const nonNullable = (v: any) => v

export default function Home({
  featured,
  bestSelling,
  brands,
  categories,
  newestProducts,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useLocaleRedirect()

  // console.log('FEATURED: ', featured)
  // console.log('BEST SELLING: ', bestSelling)
  // console.log("BRANDS: ", brands);
  // console.log("CATEGORIES: ", categories);
  // console.log("NEWEST PRODUCTS: ", newestProducts);
  /* @ts-ignore */
  props.setCategories(categories)

  return (
    <div>
      <Container className="navigation-wrapper sm:w-11/12 sm:m-auto md:w-full">
        <Slider />
        <FeaturedProducts featured={featured} />
        <NewProducts newestProducts={newestProducts} />

        {/* <Grid>
        {featured.slice(0, 3).map(({ node }, i) => (
          <ProductCard
            key={node.path}
            product={node}
            imgWidth={i === 0 ? 1080 : 540}
            imgHeight={i === 0 ? 1080 : 540}
            imgPriority
            imgLoading="eager"
          />
        ))}
      </Grid> */}
        {/* <Marquee variant="secondary">
        {bestSelling.slice(3, 6).map(({ node }) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
            imgLayout="fixed"
          />
        ))}
      </Marquee> */}
        {/* <Hero
        headline="Release Details: The Yeezy BOOST 350 V2 ‘Natural'"
        description="
        The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
        ‘Carbon’ iteration, and now release details have been locked in for
        this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
        shoe was originally called ‘Abez’, which translated to ‘Tin’ in
        Hebrew. It’s now undergone a name change, and will be referred to as
        ‘Natural’."
      /> */}
        {/* <Grid layout="B">
        {featured.slice(3, 6).map(({ node }, i) => (
          <ProductCard
            key={node.path}
            product={node}
            imgWidth={i === 1 ? 1080 : 540}
            imgHeight={i === 1 ? 1080 : 540}
          />
        ))}
      </Grid> */}
        {/* <Marquee>
        {bestSelling.slice(0, 3).map(({ node }) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
            imgLayout="fixed"
          />
        ))}
      </Marquee> */}
        {/* <HomeAllProductsGrid
        categories={categories}
        brands={brands}
        newestProducts={newestProducts}
      /> */}
      </Container>
    </div>
  )
}

Home.Layout = Layout
