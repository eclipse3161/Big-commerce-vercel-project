import { FC } from 'react'
import cn from "classnames"
import s from './Navbottom.module.css'

const NavBottom: FC = () => {
  return (
    <div className="w-full m-auto mt-1 text-gray text-sm mb-2 flex justify-between items-center">
      <span className="flex justify-around items-center font-medium">
        <img src="/shipping1.webp" alt="" />
        <span className="ml-2 font-bold">FREE SHIPPING IN USA</span>{' '}
      </span>
      <span className="flex justify-around items-center font-medium">
        <span>
          <img src="/global-shipping.webp" alt="" />
        </span>
        <span className="ml-2">
          <div className="font-bold">GLOBAL SHIPPING</div>
          <div className="font-normal">Fedex & UPS</div>{' '}
        </span>
      </span>
      <span className="flex justify-around items-center font-medium">
        <img src="/exellent.webp" alt="" />
        <span className="ml-2">
          <div className="font-bold">RATED EXCELLENT</div>
          <span>
            <img className="w-15" src="/star-rating.webp" alt="" />
          </span>{' '}
        </span>
      </span>
      <span className="flex justify-around items-center font-medium">
        <img src="/experience.png" alt="" />
        <span className="ml-2">
          <div className="font-bold"> 12+ YEARS OF EXPERIENCE</div>{' '}
          <div className="font-normal">Founded in 2012</div>
        </span>
      </span>
      <span className="flex justify-around items-center font-medium">
        <img src="/happy-cust.webp" alt="" />
        <span className="ml-2 font-bold">1 MILLION HAPPY CUSTOMERS</span>
      </span>
    </div>
  )
}

export default NavBottom
