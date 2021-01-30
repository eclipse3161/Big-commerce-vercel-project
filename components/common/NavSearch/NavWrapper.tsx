import { FC } from 'react'
import s from './NavWrapper.module.css'
import { Container } from '@components/ui'
import cn from 'classnames'
import NavTop from '../NavTop/NavTop'
import NavMid from '../NavMid/NavMid'
import NavBottom from '../NavBottom/NavBottom'

interface Props {
  categories: Object[]
}

const NavWrapper: FC<Props> = ({ categories }) => {
  console.log("WRAPPER CATS: ", categories)
  return (
    <div className="mb-6">
      <Container>
        <NavTop />
        <NavMid categories={categories} />
        <NavBottom />
      </Container>
      <hr />
    </div>
  )
}

export default NavWrapper
