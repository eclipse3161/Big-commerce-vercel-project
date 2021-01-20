import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import Content from '../assets/content.json'

export default function AboutUs() {
  return (
    <Container>
      <div className="w-8/12 m-auto mt-12">
        <h1 className="text-center text-3xl mb-10">
          {Content.aboutus.heading}
        </h1>
        <h2 className="text-xl mb-3">{Content.aboutus.history}</h2>
        <p className="mb-5">{Content.aboutus.p1}</p>
        <p className="mb-5">{Content.aboutus.p2}</p>
        <p className="mb-5">{Content.aboutus.p3}</p>
        <p className="mb-6">{Content.aboutus.p4}</p>
        <h2 className="text-xl mb-3">{Content.aboutus.mission}</h2>
        <p className="mb-2">{Content.aboutus.p5}</p>
      </div>
    </Container>
  )
}

AboutUs.Layout = Layout
