import BentoGrid from "../../components/site/bento-grid"
import { CapabilitySection } from "../../components/site/CapabilitySection"
import { FeatureCard } from "../../components/site/feature-card"
import HeroBinboiEngine from "../../components/site/HeroBinboiEngine"
import { LandingExtensions } from "../../components/site/landing-extensions"
import { Footer } from "../../components/site/site-footer"


const page = () => {
  return (
    <div className='mt-20'>
      <HeroBinboiEngine />
      <FeatureCard/>
      <BentoGrid/>
      <CapabilitySection/>
      <LandingExtensions />
      <Footer/>
    </div>
  )
}

export default page
