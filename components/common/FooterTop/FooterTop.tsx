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
      {/* <Container> */}

      <span className="mr-10">COMPANY INFO</span>
      <span className="mr-10">INFORMATION</span>
      <span className="mr-10">SHOP WITH US</span>
      <span className="mr-10">CUSTOMER SERVICE</span>
      <span className="mr-10">SUBSCRIBE TO OUR NEWSLETTER</span>

      {/* </Container> */}
    </div>
  )
}

export default FooterTop
