import { FC, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import s from './Navmid.module.css'
import cn from 'classnames'
import Searchbar from '../Searchbar'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'
import NavMidDropdown from './NavMidDropdown'

const NavMid: FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ])

  const updateOpen = (index: Number) => {
    setIsOpen(isOpen.map((item: Boolean, i: Number) => i === index && !item))
  }

  return (
    <div className={s.root}>
      {/* <Container> */}

      <span
        className="focus:outline-none mr-10 cursor-pointer"
        onClick={() => updateOpen(0)}
      >
        CELL PHONE{' '}
        <div className="w-3 inline-block">
          <ChevronDown />
        </div>{' '}
        <NavMidDropdown isOpen={isOpen} x={0} />
      </span>
      <span
        className="focus:outline-none mr-10 cursor-pointer"
        onClick={() => updateOpen(1)}
      >
        SMARTPHONES{' '}
        <div className="w-3 inline-block">
          <ChevronDown />
        </div>
        <NavMidDropdown isOpen={isOpen} x={1} />
      </span>
      <span
        className="focus:outline-none mr-10 cursor-pointer"
        onClick={() => updateOpen(2)}
      >
        TABLET{' '}
        <div className="w-3 inline-block">
          <ChevronDown />
        </div>
        <NavMidDropdown isOpen={isOpen} x={2} />
      </span>
      <span
        className="focus:outline-none mr-10 cursor-pointer"
        onClick={() => updateOpen(3)}
      >
        ACCESSORIES{' '}
        <div className="w-3 inline-block">
          <ChevronDown />
        </div>
        <NavMidDropdown isOpen={isOpen} x={3} />
      </span>
      <span
        className="focus:outline-none mr-10 cursor-pointer"
        onClick={() => updateOpen(4)}
      >
        WEARABLES{' '}
        <div className="w-3 inline-block">
          <ChevronDown />
        </div>
        <NavMidDropdown isOpen={isOpen} x={4} />
      </span>

      {/* </Container> */}
    </div>
  )
}

export default NavMid
