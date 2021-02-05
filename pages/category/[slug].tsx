import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

// Data

import { getConfig } from '@framework/api'
import getProduct from '@framework/api/operations/get-product'
import getAllPages from '@framework/api/operations/get-all-pages'
import getAllProductPaths from '@framework/api/operations/get-all-product-paths'
import getAllProductsByCategory from '@framework/api/operations/get-all-products-by-category'
import getSiteInfo from '@framework/api/operations/get-site-info'
import getAllCategoryPaths from '@framework/api/operations/get-all-category-paths'
import { Container } from '@components/ui'
import SearchView from '@components/product/SearchView.tsx/SearchView'

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })

  const { category } = await getAllProductsByCategory({
    variables: { slug: params!.slug },
    config,
  })

  const { categories } = await getSiteInfo({ config, preview })

  if (!category) {
    throw new Error(`Category with slug '${params!.slug}' not found`)
  }

  return {
    props: { category, categories },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  //   const { products } = await getAllProductPaths()
  const { categories } = await getAllCategoryPaths()
  //   const { categories, brands } = await getSiteInfo()

  // return {
  //   paths: locales
  //     ? locales.reduce<string[]>((arr, locale) => {
  //         // Add a category path for every locale
  //         categories.forEach((category: any) => {
  //           arr.push(`/${locale}/category${category.path}`)
  //         })
  //         return arr
  //       }, [])
  //     : categories.map((category: any) => `/category${category.path}`),
  //   fallback: 'blocking',
  // }

  return {
    paths: categories.map((category: any) => `/category${category.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  category,
  categories,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  /* @ts-ignore */
  props.setCategories(categories)

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <Container className="max-w-none w-full" clean>
      {/* <h1>{category.name}</h1> */}
      <SearchView category={category} categories={categories} />
    </Container>
  )
}

Slug.Layout = Layout
