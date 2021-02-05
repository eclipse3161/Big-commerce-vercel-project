// @ts-nocheck
import { FC, useState, useEffect } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import s from './SearchView.module.css'
import { useUI } from '@components/ui/context'
import { Swatch, ProductSlider } from '@components/product'
import { Button, Container, Text } from '@components/ui'

import usePrice from '@framework/use-price'
import useAddItem from '@framework/cart/use-add-item'
import type { ProductNode } from '@framework/api/operations/get-product'
import {
  getCurrentVariant,
  getProductOptions,
  SelectedOptions,
} from '../helpers'
import WishlistButton from '@components/wishlist/WishlistButton'
import ProductCard from '../ProductCard'
import ProductItem from '@components/common/ProductItem/ProductItem'

interface Props {
  className?: string
  children?: any
  category?: any
  categories?: any
}

const SearchView: FC<Props> = ({ category, categories }) => {
  const [currentRootCat, setCurrentRootCat] = useState()
  const [categoriesList, setCategoriesList] = useState([])

  useEffect(() => {
    categories.forEach((cat) => {
      const idx = categories.findIndex((cat) => {
        return (
          cat.children.findIndex((child) => child.name === category.name) !== -1
        )
      })
      setCurrentRootCat(categories[idx])
    })
  }, [categories])

  useEffect(() => {
    if (currentRootCat) {
      let catList = []
      catList.push({
        name: currentRootCat.name,
        path: currentRootCat.path,
      })
      currentRootCat?.children.forEach((child) => {
        catList.push({ name: child.name, path: child.path })
      })
      setCategoriesList(catList)
    }
  }, [currentRootCat])

  return (
    <Container>
      <NextSeo
        title={category.name}
        description={category.description}
        openGraph={{
          type: 'website',
          title: category.name,
          description: category.description,
        }}
      />
      <div className="w-full m-auto my-6 block text-center text-gray text-xs">
        <Link href="/">Home</Link> <span className="mx-2">/</span>{' '}
        {currentRootCat && (
          <>
            <Link href={`/category${currentRootCat.path}`}>
              {currentRootCat.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}{' '}
        {category.name}
      </div>

      <h1 className="font-body text-center text-3xl mb-10 text-gray">
        {category.name}
      </h1>

      <div className="flex">
        <div className="flex-1">
          <ul className="list-none m-0 p-0 text-left">
            {categoriesList?.map((category) => (
              <li key={category.path}>
                <Link href={`/category${category.path}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-3 w-full mx-10">
          {category?.products?.edges && category?.products?.edges.length > 0 ? (
            <div className="grid gap-4 grid-cols-3">
              {category?.products?.edges.map((product) => (
                <div key={product.node.sku} className="m-1">
                  <ProductItem product={product.node} />
                </div>
              ))}
            </div>
          ) : (
            <h1 className="font-body text-center text-md mb-10 text-gray">
              No products found for this category.
            </h1>
          )}
        </div>
      </div>

      {/* 
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {price}
              {` `}
              {product.prices?.price.currencyCode}
            </div>
          </div>

          <div className={s.sliderContainer}>
          </div>
        </div>

        <div className={s.sidebar}>
          <section>
            {options?.map((opt: any) => (
              <div className="pb-4" key={opt.displayName}>
                <h2 className="uppercase font-medium">{opt.displayName}</h2>
                <div className="flex flex-row py-4">
                  {opt.values.map((v: any, i: number) => {
                    const active = (choices as any)[opt.displayName]

                    return (
                      <Swatch
                        key={`${v.entityId}-${i}`}
                        active={v.label === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            return {
                              ...choices,
                              [opt.displayName]: v.label,
                            }
                          })
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="pb-14 break-words w-full max-w-xl">
              <Text html={product.description} />
            </div>
          </section>
          <div>
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
              disabled={!variant}
            >
              Add to Cart
            </Button>
          </div>
        </div>

        <WishlistButton
          className={s.wishlistButton}
          productId={product.entityId}
          variant={product.variants.edges?.[0]!}
        />
      </div> */}
    </Container>
  )
}

export default SearchView
