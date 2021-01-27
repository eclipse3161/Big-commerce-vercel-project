import { FC, useState } from 'react'
import Link from 'next/link'
import { Container } from '@components/ui'
import cn from 'classnames'
import Phone from '@components/icons/Phone'
import ChevronDown from '@components/icons/ChevronDown'
import s from './ProductHero.module.css'
import ChevronUp from '@components/icons/ChevronUp'

const ProductDescription: FC = () => {
  const [title, settitle] = useState(
    'Samsung Galaxy A42 5G (SIM Free / Unlocked)'
  )
  const [overview, setoverview] = useState(
    <>
      <p>
        With a glossy back and a sleek design, along with 5G, the Samsung Galaxy
        A42 5G is an incredible addition to the Samsung range of products.
        Particularly, when you take into the 6.6-inch Infinity-U Super AMOLED
        display and rear Quad Cameras.
      </p>
      <br />
      <p>
        It is available in a variety of colours to suit all personalities
        including Prism Dot Black, Prism Dot Grey and Prism Dot White.
      </p>
    </>
  )
  const [cameras, setcameras] = useState(
    <>
      <p>
        Using the Quad camera technology of the Galaxy A42 5G makes it possible
        to capture images in stunning detail thanks to the 48MP primary camera.
        With the 8MP 123-degree ultra-wide camera adding more perspective for
        expansive landscapes and groups.
      </p>
      <br />
      <p>
        Get close with the 5MP Macro camera for bringing out the fine-detail in
        your pictures. Or use the depth camera to adjust the depth-of-field in
        your images to improve the look of the backgrounds.
      </p>
    </>
  )
  const [display, setdisplay] = useState(
    <>
      <p>
        An Incredible 6.6-inch Infinity-U Super AMOLED display is perfect for
        daily usage, gaming and watching the latest blockbuster movies. The
        barely-there bezels offer a more immersive viewing experience with
        minimum interruptions thanks to the notch at the top of the display.
      </p>
      <br />
      <p>5G Connectivity</p>
      <br />
      <p>
        Enjoy the benefit of being able to stream movies and games super-fast
        and share creative content in a new way with 5G connectivity.
      </p>
    </>
  )
  const [performance, setperformance] = useState(
    <>
      <p>
        The Qualcomm Snapdragon 7505G processor works with 4GB of RAM to offer
        fast and efficient performance.&nbsp; There is plenty of space available
        for all your needs with the 128GB of internal storage, but if you need
        more up to 1TB SD cards can be used with this phone.
      </p>
      <br />
      <p>
        A long-lasting 5,000 mAh battery offers a full day of usage, even for
        demanding users. While also intelligently adjusting performance to
        compliment your mobile habits. The 15W Adaptive Fast Charging will have
        you connecting with friends quickly.
      </p>
      <br />
      <p>
        Bixby is your perfect assistant always ready to answer your questions.
        With Bixby Vision turning your camera into an intelligent tool for
        understanding and exploring the world around you.
      </p>
      <br />
      <p>
        Samsung Knox provides multi-layer protection to secure the contents of
        your phone from the chip level up.
      </p>
    </>
  )
  const [keyFeatures, setkeyFeatures] = useState(
    <ul className="ml-5 list-disc">
      <li>Android 10 with Samsung One UI</li>
      <li>5G Mobile Data Connectivity</li>
      <li>Qualcomm Snapdragon 750 5G processor</li>
      <li>6.6” HD+ Super AMOLED Infinity-O Display</li>
      <li>20MP front-facing selfie camera</li>
      <li>128GB internal storage | 4GB RAM</li>
      <li>5,000mAH battery | 15W Adaptive Fast Charging</li>
      <li>Enhanced Security with Samsung Knox</li>
    </ul>
  )
  const [boxContents, setboxContents] = useState(
    <ul className="ml-5 list-disc">
      <li>Samsung Galaxy A42 5G</li>
      <li>Data Cable</li>
      <li>Travel Adapter</li>
      <li>Ejection Pin</li>
      <li>Quick Start Guide</li>
    </ul>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold font-body">{title}</h1>
      <h1 className="mt-8 text-2xl font-black font-body">Overview</h1>
      {overview}
      <h1 className="mt-8 text-2xl font-bold font-body">Cameras</h1>
      {cameras}
      <h1 className="mt-8 text-2xl font-bold font-body">Display</h1>
      {display}
      <h1 className="mt-8 text-2xl font-bold font-body">Performance</h1>
      {performance}
      <h1 className="mt-8 text-2xl font-bold font-body">Key Features</h1>
      {keyFeatures}
      <h1 className="mt-8 text-2xl font-bold font-body">Box Contents</h1>
      {boxContents}
    </div>
  )
}

export default ProductDescription
