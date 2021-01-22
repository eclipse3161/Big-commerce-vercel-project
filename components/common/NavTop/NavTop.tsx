import { FC } from 'react'
import Link from 'next/link'
import s from './NavTop.module.css'
import { Container } from '@components/ui'
import cn from 'classnames'
import Searchbar from '../Searchbar'
import Phone from '@components/icons/Phone'

const NavTop: FC = () => {
  return (
    <div className={cn(s.root)}>
      {/* <Container> */}
        <div className="flex justify-between items-center">
          <Link href="/"><img src="/phones-logo.png" alt="" className="cursor-pointer" /></Link> 
          <Searchbar/> 
          <div className="text-center">
            <div className="text-xl">Got a Question? Call Us</div>
            <div className="flex flex-row items-center">
              <span className="w-5 mr-1.5 transform rotate-260"><Phone/></span>
              <span className="text-yellow-400 text-2xl font-bold"> 925-727-3036</span> 
            </div>            
            <div className="text-sm">Mon-Sat 9am-9pm Pacific</div>
          </div>
        </div>
      {/* </Container> */}
    </div>
  )
}

export default NavTop
