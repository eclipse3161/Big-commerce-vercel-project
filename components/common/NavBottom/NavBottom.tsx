import { FC } from 'react'
import s from "./Navbottom.module.css"

const NavBottom: FC = () => {
  return (
    <div className={s.root}>
         <span className="flex items-center mr-10 font-medium text-sm"><img src="/shipping1.webp" alt=""/><span className="ml-2">FREE SHIPPING IN USA</span> </span>
         <span className="flex items-center mr-10 font-medium text-sm"><span><img src="/global-shipping.webp" alt=""/></span><span className="ml-2"><div>GLOBAL SHIPPING</div><div className="font-normal">Fedex & UPS</div> </span></span>
         <span className="flex items-center mr-10 font-medium text-sm"><img src="/exellent.webp" alt=""/><span className="ml-2"><div>RATED EXCELLENT</div><span><img className="w-15" src="/star-rating.webp" alt=""/></span>  </span></span>
         <span className="flex items-center mr-10 font-medium text-sm"><img src="/experience.png" alt=""/><span className="ml-2"><div> 12+ YEARS OF EXPERIENCE</div>  <div className="font-normal">Founded in 2012</div></span></span>
         <span className="flex items-center mr-10 font-medium text-sm"><img src="/happy-cust.webp" alt=""/><span className="ml-2">1 MILLION HAPPY CUSTOMERS</span></span>
    </div>
  )
}

export default NavBottom