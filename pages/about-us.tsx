import NextHead from 'next/head'
import Link from 'next/link'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import Content from '../assets/content.json'

export default function AboutUs() {
  return (
    <>
      <NextHead>
        <title>About us</title>
      </NextHead>
      <Container>
        <div className="w-8/12 m-auto mt-12 t text-lightgray">
          <div className="w-full m-auto my-6 block text-center">
            <Link href="/">Home</Link> <span className="mx-2">/</span> About us
          </div>
          <h1 className="font-body text-center text-3xl mb-10 text-gray">
            {Content.aboutus.heading}
          </h1>
          <div className="font-body font-normal">
            <h2 className="text-xl mb-3">{Content.aboutus.history}</h2>
            <p className="mb-5">{Content.aboutus.p1}</p>
            <p className="mb-5">{Content.aboutus.p2}</p>
            <p className="mb-5">{Content.aboutus.p3}</p>
            <p className="mb-6">{Content.aboutus.p4}</p>
            <h2 className="text-xl mb-3">{Content.aboutus.mission}</h2>
            <p className="mb-2">{Content.aboutus.p5}</p>
          </div>
        </div>
      </Container>
    </>
  )
}

AboutUs.Layout = Layout
