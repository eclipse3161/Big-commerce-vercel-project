import { FC, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import s from './Navmid.module.css'
import cn from 'classnames'
import Searchbar from '../Searchbar'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'
import NavMidDropdown from './NavMidDropdown'

const cellphoneItems = [
  'All Cell Phone',
  'Basic Phones',
  'Brand',
  'Apple',
  'ASUS',
  'Blackberry',
  'Google',
  'HTC',
  'Huawei',
  'LG',
  'Motorola',
  'Nokia',
  'OnePlus',
  'Oppo',
  'Razer',
  'Samsung',
  'Sony',
  'Xiaomi',
]

const smartphoneItems = [
  'All Smartphones',
  'Apple',
  'CAT',
  'Oppo',
  'Razer',
  'Realme',
  'Xiaomi',
  'Samsung',
  'Oneplus',
  'Blackberry',
  'Motorola',
  'HTC',
  'Huawei',
  'LG',
  'Sony',
  'Google',
]

const tabletItems = ['All Tablet', 'Accessories', 'Brand', 'Apple', 'Samsung']

const accessoriesItems = [
  'All Accessories',
  'Batteries',
  'Bluetooth',
  'Cases, Covers & Holsters',
  'Chargers and Docks',
  'iPad accessories',
  'SIM Starter Kit',
  'Cases, Covers and Holsters',
  'Portable Speaker',
  'Display Protection',
  'Memory Cards',
  'Mounts',
  'Smart accessories',
  'USB and HDMI Cables',
  'Wired Headsets',
]

const wearableItems = ['All Wearables', 'Apple', 'Samsung', 'Fitbit']

interface DropdownSectionProps {
  title: String
  isOpen: Boolean
  updateOpen: Function
  items: String[]
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

const NavMid: FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ])

  const updateOpen = (index: Number) => {
    setIsOpen(isOpen.map((item: Boolean, i: Number) => i === index && !item))
  }

  return (
    <div className={s.root}>
      {/* <Container> */}

      <DropdownSection
        title="CELL PHONE"
        updateOpen={() => updateOpen(0)}
        isOpen={isOpen[0]}
        items={cellphoneItems}
      />

      <DropdownSection
        title="SMARTPHONES"
        updateOpen={() => updateOpen(1)}
        isOpen={isOpen[1]}
        items={smartphoneItems}
      />

      <DropdownSection
        title="TABLET"
        updateOpen={() => updateOpen(2)}
        isOpen={isOpen[2]}
        items={tabletItems}
      />

      <DropdownSection
        title="ACCESSORIES"
        updateOpen={() => updateOpen(3)}
        isOpen={isOpen[3]}
        items={accessoriesItems}
      />

      <DropdownSection
        title="WEARABLES"
        updateOpen={() => updateOpen(4)}
        isOpen={isOpen[4]}
        items={wearableItems}
      />

      {/* </Container> */}
    </div>
  )
}

export default NavMid
