import { FC } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import s from './Navmid.module.css'
import cn from 'classnames'
import Searchbar from '../Searchbar'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'

interface Props {
  isOpen: Boolean
  items: String[]
}

const NavMidDropdown: FC<Props> = ({ isOpen, items }) => {
  return (
    <div className={s.dropdown}>
      {/* <Container> */}

      {isOpen && (
        <>
          {items.map((item, idx) => (
            <div className={s.dropdownitem} key={idx}>
              {item}
            </div>
          ))}
        </>
      )}

      {/* </Container> */}
    </div>
  )
}

export default NavMidDropdown
