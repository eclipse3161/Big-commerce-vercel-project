import { FC } from 'react'
import Link from 'next/link'
import s from './NavSearch.module.css'
import { Container } from '@components/ui'
import cn from 'classnames'
import NavTop from '../NavTop/NavTop'
import NavMid from '../NavMid/NavMid'
import NavBottom from '../NavBottom/NavBottom'

const NavSearch: FC = () => {
  return (
    <div className={cn(s.root)}>
      <Container>
        <NavTop/>
        <NavMid/>
        <NavBottom/>
        <hr/>
      </Container>
    </div>
  )
}

export default NavSearch
