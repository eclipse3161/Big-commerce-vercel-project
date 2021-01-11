import { FC } from 'react'
import Link from 'next/link'
import s from './NavSearch.module.css'
import { Container } from '@components/ui'
import cn from 'classnames'

const NavSearch: FC = () => {
  return (
    <div className={cn(s.root)}>
      <Container>NavSearch</Container>
    </div>
  )
}

export default NavSearch
