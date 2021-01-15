import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav, ViewCart } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import UserIcon from '../../icons/User'
import PlusIcon from '../../icons/Plus'
import PhoneIcon from '../../icons/Phone'

const Navbar: FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset
      setHasScrolled(scrolled)
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={cn(s.root, { 'shadow-magical': hasScrolled })}>
      <Container>
        <div className="relative flex flex-row justify-between py-3 align-center">
          <div className="flex items-center flex-1">
            {/* <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link> */}
            <nav className="hidden space-x-4 lg:flex font-sm flex-1">
              <Link href="/search">
                <div className={s.navItem}>
                  <a className={s.link}>
                    <UserIcon className={cn(s.navIcon, s.iconUser)} /> Login
                  </a>
                </div>
              </Link>
              <Link href="/search?q=clothes">
                <div className={s.navItem}>
                  <a className={s.link}>
                    <PlusIcon className={cn(s.navIcon, s.iconPlus)} /> Create An
                    Account
                  </a>
                </div>
              </Link>
              <Link href="/search?q=accessories">
                <div className={s.navItem}>
                  <a className={s.link}>
                    <PhoneIcon className={cn(s.navIcon, s.iconPhone)} /> Call
                    9257273036
                  </a>
                </div>
              </Link>
              <Link href="/search?q=accessories">
                <div className={s.navItem}>
                  <a className={s.link}>All Prices In: EURO</a>
                </div>
              </Link>
            </nav>
          </div>

          {/* <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div> */}

          <div className="flex justify-end flex-1 space-x-8">
            {/* <UserNav /> */}
            <ViewCart />
          </div>
        </div>

        {/* <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div> */}
      </Container>
    </div>
  )
}

export default Navbar
