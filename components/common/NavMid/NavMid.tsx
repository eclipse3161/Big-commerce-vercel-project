import { FC, useState, useEffect } from 'react'
import s from './Navmid.module.css'
import cn from 'classnames'
import ChevronDown from '@components/icons/ChevronDown'
import NavMidDropdown from './NavMidDropdown'
interface DropdownSectionProps {
  title: String
  isOpen: Boolean
  updateOpen: Function
  items: String[]
}
interface Category {
  children: Object[]
  description: string
  entityId: number
  name: string
  path: string
  productCount: Number
}

const DropdownSection: FC<DropdownSectionProps> = ({
  title,
  isOpen,
  updateOpen,
  items,
}) => (
  <span
    className={cn(
      'focus:outline-none py-3 px-4 cursor-pointer hover:bg-silver hover:text-black',
      isOpen && s.active
    )}
    onClick={() => updateOpen()}
  >
    {title}{' '}
    <div className="w-3 inline-block">
      <ChevronDown />
    </div>{' '}
    <NavMidDropdown isOpen={isOpen} items={items} />
  </span>
)

interface Props {
  categories: Object[]
}

interface booleanObj {
  [key: number]: boolean
}

const NavMid: FC<Props> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState<booleanObj>({})

  const updateOpen = (index: number) => {
    const newObj: any = { ...isOpen }
    Object.keys(newObj).forEach((io: string) => {
      newObj[io] = io === index.toString() ? !newObj[io] : false
    })
    setIsOpen(newObj)
  }

  useEffect(() => {
    if (categories && categories.length > 0) {
      let obj: any = {}

      categories.forEach((v: any) => {
        obj = { ...obj, [v.entityId]: false }
      })
      setIsOpen(obj)
    }
  }, [categories])

  return (
    <div className={s.root}>
      {categories &&
        categories.length > 0 &&
        categories.map((category: any) => {
          return (
            <DropdownSection
              key={category.entityId}
              title={category.name}
              updateOpen={() => updateOpen(category.entityId)}
              isOpen={isOpen[category.entityId]}
              items={category.children}
            />
          )
        })}
    </div>
  )
}

export default NavMid
