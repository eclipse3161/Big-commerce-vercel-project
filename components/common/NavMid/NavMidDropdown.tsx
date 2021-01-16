import { FC } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import s from './Navmid.module.css'
import cn from 'classnames'
import Searchbar from '../Searchbar'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'

interface Props {
  isOpen: Boolean[]
  x: Number
}

const NavMidDropdown: FC<Props> = ({ isOpen, x }) => {
  return (
    <div className={s.dropdown}>
      {/* <Container> */}
      {isOpen[x] && (
        <>
          <div className={s.dropdownitem}>Google</div>
          <div className={s.dropdownitem}>Apple</div>
        </>
      )}

      {/* </Container> */}
    </div>
  )
}

export default NavMidDropdown
