import { FC, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'
import s from './ProductDetails.module.css'
import ChevronUp from '@components/icons/ChevronUp'

const ProductSpecification: FC = () => {
  const [specifications, setSpecifications] = useState([
    { spec: 'Operating System', property: 'Android 10 with One UI' },
    {
      spec: 'Processor:',
      property: 'Qualcomm SM7225 Snapdragon 750 5G (8 nm)',
    },
    {
      spec: 'Processor Speed:',
      property:
        'Octa-core (4x2.0 GHz Kryo 260 Gold & 4x1.8 GHz Kryo 260 Silver)',
    },
    {
      spec: 'GPU:',
      property: 'Adreno 610',
    },
    {
      spec: 'Display:',
      property: '6.5" IPS Waterdrop notch display',
    },
    {
      spec: 'Resolution:',
      property: '720 x 1600 pixels, (~270 ppi density)',
    },
    {
      spec: 'Rear Camera:',
      property: 'Quadl 12 MP + 8 MP + 2 MP + 2MP',
    },
    {
      spec: 'Front Camera:',
      property: '8 MP',
    },
    {
      spec: 'Battery:',
      property: '5,000 mAh',
    },
    {
      spec: '4G/LTE Bands:',
      property: 'FDD-LTE: Bands 1/3/5/7/8/20/28 TD-LTE: Bands 38/40/41',
    },
    {
      spec: 'Wi-Fi:',
      property: 'Wi-Fi 802.11 a/b/g/n/ac, dual-band',
    },
    {
      spec: 'Bluetooth:',
      property: '5.0, A2DP, LE',
    },
    {
      spec: 'Location Technologies:',
      property: 'GPS / GLONASS / Beidou / Galileo',
    },
    {
      spec: 'Software:',
      property: 'Google Play, Google Apps (for Android), Game Boost 2.0',
    },
  ])
  return (
    <div className={s.conatiner}>
      {specifications.map((spec) => (
        <div className={s.row}>
          <div className={s.left}>{spec.spec}</div>
          <div className={s.right}>{spec.property}</div>
        </div>
      ))}
    </div>
  )
}

export default ProductSpecification
