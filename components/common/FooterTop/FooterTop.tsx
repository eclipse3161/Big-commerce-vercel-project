import { FC } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import s from './Footertop.module.css'
import cn from 'classnames'
import Searchbar from '../Searchbar'
import Phone from '@components/icons/Phone'

const FooterTop: FC = () => {
  return (
    <div className={s.root}>
      <Container>
        <div className={cn(s.inner, "flex justify-between")}>
          <span>COMPANY INFO</span>
          <span>INFORMATION</span>
          <span>SHOP WITH US</span>
          <span>CUSTOMER SERVICE</span>
          <span>SUBSCRIBE TO OUR NEWSLETTER</span>
        </div>
      </Container>
    </div>
  )
}

export default FooterTop
