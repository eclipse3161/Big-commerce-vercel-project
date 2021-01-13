import { FC } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import s from "./Navmid.module.css"
import cn from 'classnames'
import Searchbar from '../Searchbar'
import Phone from '@components/icons/Phone'

const NavMid: FC = () => {
  return (
    <div className={s.root}>
      {/* <Container> */}
       
         <span className="mr-10">CELL PHONE</span>
         <span className="mr-10">SMARTPHONES</span>
         <span className="mr-10">TABLET</span>
         <span className="mr-10">ACCESSORIES</span>
         <span className="mr-10">WEARABLES</span>
       
      {/* </Container> */}
    </div>
  )
}

export default NavMid
