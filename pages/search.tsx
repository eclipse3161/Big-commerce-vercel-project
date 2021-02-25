// @ts-nocheck
import cn from 'classnames'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-select'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/api/operations/get-all-pages'
import getSiteInfo from '@framework/api/operations/get-site-info'
import useSearch from '@framework/products/use-search'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Container, Grid, Skeleton } from '@components/ui'

import rangeMap from '@lib/range-map'
import getSlug from '@lib/get-slug'
import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
import ProductItem from '@components/common/ProductItem/ProductItem'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const { categories, brands } = await getSiteInfo({ config, preview })

  return {
    props: { pages, categories, brands },
  }
}

const sortByLabel = {
  alignItems: 'center',
  display: 'flex',

  ':before': {
    content: '"Sort By:"',
    display: 'block',
    marginRight: 10,
    // height: 10,
    // width: 10,
  },
}

const colourStyles = {
  placeholder: (styles) => ({ ...styles, ...sortByLabel }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...sortByLabel,
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 99,
  }),
}

const SORT = Object.entries({
  'latest-desc': 'Newest Items',
  'trending-desc': 'Best Selling',
  'price-asc': 'Price: Ascending',
  'price-desc': 'Price: Descending',
})

export default function Search({
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)
  const activeCategory = categories.find(
    (cat) => getSlug(cat.path) === category
  )
  const activeBrand = brands.find(
    (b) => getSlug(b.node.path) === `brands/${brand}`
  )?.node

  const { data } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.entityId,
    brandId: activeBrand?.entityId,
    sort: typeof sort === 'string' ? sort : '',
  })

  const handleClick = (filter: string, value: string) => {
    router.push({
      pathname,
      query: filterQuery({ q, sort: value.value }),
    })

    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }

    setActiveFilter(filter)
  }

  return (
    <Container>
      <div className="mt-3 mb-20">
        <div className="w-full m-auto my-6 block text-center text-gray text-xs">
          <Link href="/">Home</Link> <span className="mx-2">/</span>{' '}
          <span>Search</span>
        </div>
        {(q || activeCategory || activeBrand) && (
          <div className="mb-12 transition ease-in duration-75 text-center">
            {data ? (
              <>
                <span
                  className={cn(
                    'animated',
                    {
                      fadeIn: data.found,
                      hidden: !data.found,
                    },
                    'text-3xl font-body'
                  )}
                >
                  {data.products.length} results {q && <>for '{q}'</>}
                </span>
                <span
                  className={cn(
                    'animated',
                    {
                      fadeIn: !data.found,
                      hidden: data.found,
                    },
                    'text-3xl font-body'
                  )}
                >
                  {q ? (
                    <>There are no products that match '{q}'</>
                  ) : (
                    <>
                      There are no products that match the selected category &
                      designer
                    </>
                  )}
                </span>
              </>
            ) : q ? (
              <span className="text-3xl font-body">Searching for: '{q}'</span>
            ) : (
              <span className="text-3xl font-body">Searching...</span>
            )}
          </div>
        )}

        {/* href={} */}
        <div className="laptop:max-w-xs z-20 mb-2">
          <Select
            defaultValue="latest-desc"
            label="Sort By"
            placeholder=""
            options={SORT.map(([key, value]) => ({ label: value, value: key }))}
            styles={colourStyles}
            onChange={(value) => handleClick('sort', value)}
          />
        </div>

        {/* Products */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(186px, 1fr))',
          }}
        >
          {data
            ? data.products.map(({ node }) => (
                // <ProductCard
                //   variant="simple"
                //   key={node.path}
                //   className="animated fadeIn"
                //   product={node}
                //   imgWidth={480}
                //   imgHeight={480}
                // />
                <div key={node.sku} className="m-1">
                  <ProductItem product={node} />
                </div>
              ))
            : rangeMap(12, (i) => (
                <Skeleton
                  key={i}
                  className="w-full animated fadeIn"
                  height={325}
                />
              ))}
        </div>

        {/* Sort */}
        {/* <div className="col-span-8 lg:col-span-2 order-2 lg:order-none">
          <div className="relative inline-block w-full">
            <div className="lg:hidden">
              <span className="rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={(e) => handleClick(e, 'sort')}
                  className="flex justify-between w-full rounded-sm border border-gray-300 px-4 py-3 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {sort ? `Sort: ${sort}` : 'Relevance'}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div
              className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${
                activeFilter !== 'sort' || toggleFilter !== true ? 'hidden' : ''
              }`}
            >
              <div className="rounded-sm bg-white shadow-xs lg:bg-none lg:shadow-none">
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <ul>
                    <li
                      className={cn(
                        'block text-sm leading-5 text-gray-700 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide hover:bg-gray-100 lg:hover:bg-transparent hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900',
                        {
                          underline: !sort,
                        }
                      )}
                    >
                      <Link href={{ pathname, query: filterQuery({ q }) }}>
                        <a
                          onClick={(e) => handleClick(e, 'sort')}
                          className={
                            'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                          }
                        >
                          Relevance
                        </a>
                      </Link>
                    </li>
                    {SORT.map(([key, text]) => (
                      <li
                        key={key}
                        className={cn(
                          'block text-sm leading-5 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900',
                          {
                            underline: sort === key,
                          }
                        )}
                      >
                        <Link
                          href={{
                            pathname,
                            query: filterQuery({ q, sort: key }),
                          }}
                        >
                          <a
                            onClick={(e) => handleClick(e, 'sort')}
                            className={
                              'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                            }
                          >
                            {text}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Container>
  )
}

Search.Layout = Layout
