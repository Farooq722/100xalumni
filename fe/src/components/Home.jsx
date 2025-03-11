import React from 'react'
import Navbar from './navbar/Navbar'
import { LampDemo } from './ui/LampDemo'
import { HeroHighlightDemo } from './ui/HeroHighlightDemo'
import { TypewriterEffectSmoothDemo } from './ui/TypewriterEffectSmoothDemo'
import Footer from './footer/Footer'
import ContinuousScroll from './ui/ContinuousScroll '


const Home = () => {
  return (
    <div>
      <Navbar />
      <LampDemo />
      <ContinuousScroll />
      <HeroHighlightDemo />
      <TypewriterEffectSmoothDemo />
      <Footer />
    </div>
  )
}

export default Home
