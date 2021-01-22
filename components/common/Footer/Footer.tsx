import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@framework/api/operations/get-all-pages'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container, Button } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'
import FooterTop from '../FooterTop/FooterTop'
import Amex from '@components/icons/Amex'
import Discover from '@components/icons/Discover'
import MasterCard from '@components/icons/MasterCard'
import PayPal from '@components/icons/PayPal'
import Visa from '@components/icons/Visa'
import CaretRight from '@components/icons/CaretRight'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages, legalPages } = usePages(pages)
  const rootClassName = cn(className)

  return (
    <footer className={rootClassName}>
      <FooterTop />
      <Container>
        <div
          className={cn(
            s.footerRoot,
            'md:flex md:justify-between md:items-start md:flex-row text-xs uppercase tracking-wide text-gray-500 my-6 leading-6 flex flex-col items-center'
          )}
        >
          <h1 className="md:hidden text-xl mb-8 mt-4">COMPANY INFO</h1>
          <ul className="text-center md:text-left">
            <li><Link href="/about-us">About us</Link></li>
            <li>My Wishlist</li>
            <li>Track My Order</li>
            <li>Help</li>
          </ul>
          <h1 className="md:hidden text-xl mb-8 mt-4">INFORMATION</h1>
          <ul className="text-center md:text-left">
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
            <li>Shipping &amp; Delivery</li>
            <li>Sitemap</li>
          </ul>
          <h1 className="md:hidden text-xl mb-8 mt-4">SHOP WITH US</h1>
          <ul className="text-center md:text-left">
            <li>My Account</li>
            <li>Login</li>
            <li>View Cart</li>
            <li>Checkout</li>
            <li>Blog</li>
          </ul>
          <h1 className="md:hidden text-xl mb-8 mt-4">CUSTOMER SERVICE</h1>
          <ul className="text-center md:text-left">
            <li>Contact us</li>
          </ul>
          <h1 className="md:hidden text-xl mb-8 mt-4">
            Subscribe to our newsletter
          </h1>
          <div className="max-w-xs">
            <p className="text-center md:text-left">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className={cn(s.footerInput, 'mt-5')}>
              <input
                type="text"
                placeholder="Your email address"
                className="text-sm px-6"
              />
              <button>
                <CaretRight />
              </button>
            </div>
            <div className={cn(s.footerIcons, 'text-gray-500')}>
              <Amex />
              <Discover />
              <MasterCard />
              <PayPal />
              <Visa />
            </div>
          </div>
        </div>

        <div className="pt-0 pb-6 text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <div>
            <span className="text-xs">&copy; 2021 phone4u</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)

      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return

      if (isLegalPage(slug, locale)) {
        legalPages.push(page)
      } else {
        sitePages.push(page)
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  }
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug)

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
