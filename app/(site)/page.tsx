
import { FeatureCard } from "../../components/site/feature-card"
import HeroBinboiEngine from "../../components/site/HeroBinboiEngine"
import { Footer } from "../../components/site/site-footer"


const page = () => {
  return (
    <div className='mt-20'>
      <HeroBinboiEngine />
       <FeatureCard/>
       <Footer/>
    </div>
  )
}

export default page