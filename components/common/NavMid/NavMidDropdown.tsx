import { FC } from 'react'
import Link from 'next/link'
import s from './Navmid.module.css'

interface Props {
  isOpen: Boolean
  items: Object[]
}

const NavMidDropdown: FC<Props> = ({ isOpen, items }) => {
  return (
    <div className={s.dropdown}>
      {isOpen &&
        items.map((item: any) => (
          <Link href={`/category${item.path}`} key={item.entityId}>
            <div className={s.dropdownitem}>{item.name}</div>
          </Link>
        ))}
    </div>
  )
}

export default NavMidDropdown
