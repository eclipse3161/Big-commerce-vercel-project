// @ts-nocheck
import React, { useState, FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import s from './NavMobile.module.css'
import ViewCart from '../ViewCart'
import { Container } from '@components/ui'

interface DropdownProps {
  open: Boolean
  toggleDropdown: Function
  categories: Array<any>
}

const Dropdown: FC<DropdownProps> = ({ categories, open, toggleDropdown }) => {
  const [search, setSearch] = useState<string>('')
  const [categoriesOpened, setCategoriesOpened] = useState<Array<any>>([])

  console.log('categories: ', categories)
  console.log('opened:', categoriesOpened)

  const toggleDropdownAndClose = () => {
    setCategoriesOpened([]);
    toggleDropdown();
  }

  const toggleCategory = (category: any) => {
    let newCO = [...categoriesOpened]
    const foundCategory = newCO.findIndex((v) => v === category.entityId)
    if (foundCategory > -1) {
      newCO = [
        ...newCO.slice(0, foundCategory),
        ...newCO.slice(foundCategory + 1, newCO.length),
      ]
    } else {
      newCO.push(category.entityId)
    }
    setCategoriesOpened(newCO)
  }

  const getLinkOrButton = (item: any) => {
    if (item.children && item.children.length > 0) {
      return (
        <button name={item.name} onClick={() => toggleCategory(item)}>
          <span className={cn(s.navLink, checkIfOpen(item) && s.navLinkActive)}>
            {item.name}{' '}
            <span className={checkIfOpen(item) ? s.navArrowActive : undefined}>
              &gt;
            </span>
          </span>
        </button>
      )
    } else if (item.path) {
      return (
        <Link href={`/category${item.path}`}>
          <span onClick={toggleDropdownAndClose} className={s.navLink}>
            {item.name}
          </span>
        </Link>
      )
    }
  }

  const checkIfOpen = (category: any) => {
    const item = categoriesOpened.findIndex((v) => v === category.entityId)
    return item > -1
  }

  const getCategoryItem = (category: any) => {
    console.log('got: ', category)
    return (
      <div key={category.entityId}>
        {getLinkOrButton(category)}
        {checkIfOpen(category) && (
          <div className={cn(s.dropdownContent, s.innerDropdown, 'text-sm')}>
            {category.children &&
              category.children.length > 0 &&
              category.children.map((child: any) => getCategoryItem(child))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <button
        className={'w-6 my-3 ml-0 mr-2'}
        aria-label="Menu"
        onClick={(e) => toggleDropdown()}
      >
        <div className={cn(s.navIcon, open && s.open)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      {open && (
        <div className={cn(s.dropdownContent, 'text-sm')} id="myDropdown">
          <input
            name="search"
            aria-label="search"
            placeholder="Search the store"
            className={s.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <hr />
          {categories &&
            categories.length > 0 &&
            categories.map((category: any) => getCategoryItem(category))}
          <hr />
          <Link href="/login">
            <span className={s.navLink}>Sign in</span>
          </Link>
          <span className={s.navLink}>or</span>
          <Link href="/signup">
            <span className={s.navLink}>Register</span>
          </Link>
        </div>
      )}
    </>
  )
}

const NavMobile = ({ categories }) => {
  const [open, setOpen] = useState<Boolean>(false)

  const toggleDropdwn = () => setOpen((open) => !open)

  return (
    <Container>
      <div className="mobile:block laptop:hidden flex justify-between h-12 w-full border-b-2 border-lightgrey mb-4">
        <div className="flex justify-start w-1/2 h-full">
          <Dropdown
            categories={categories}
            toggleDropdown={toggleDropdwn}
            open={open}
          />
          <Link href="/">
            <img
              className="w-14 cursor-pointer m-2.5"
              src="/phones-logo.png"
              alt="Logo"
              aria-label="logo"
            />
          </Link>
        </div>
        <div className="flex justify-end flex-1 space-x-8 h-full">
          {/* <UserNav /> */}
          <ViewCart />
        </div>
      </div>
    </Container>
  )
}

export default NavMobile
