import { FC } from 'react'
import s from './NavWrapper.module.css'
import { Container } from '@components/ui'
import cn from 'classnames'
import NavTop from '../NavTop/NavTop'
import NavMid from '../NavMid/NavMid'
import NavBottom from '../NavBottom/NavBottom'

const NavWrapper: FC = () => {
  return (
    <div className={cn(s.root)}>
      <Container>
        <NavTop />
        <NavMid />
        <NavBottom />
      </Container>
      <hr />
    </div>
  )
}

export default NavWrapper
