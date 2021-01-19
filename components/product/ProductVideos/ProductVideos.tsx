import { FC, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import s from './ProductPayment.module.css'

const ProductVideos: FC = () => {
  return (
    <div className="mt-8">
      <hr />
      <h1 className="mt-8 text-2xl mb-8">Videos</h1>

      <iframe
        width="100%"
        height="600px"
        src="https://youtube.com/embed/B6CtFryqfLo"
      ></iframe>
      <div className="flex mt-5">
        <img src="https://via.placeholder.com/120x90" alt="" />
        <div className="flex flex-col ml-5">
          <h1>Oppo A5 2020 UK unboxing & first impressions</h1>
          <p>
            The Oppo A5 2020 may have come out in some markets in late 201...
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductVideos
