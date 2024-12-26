import React from 'react'

import HeroSection from './HeroSection';
import iphone from '../../assets/iphone.png'
import HomeImage from '../../assets/Home img2.jpg'
import FeaturedProducts from './FeaturedProducts';

const Homepage = () => {
  return (
    <div>
       <HeroSection title="Buy iPhone 15" subtitle="Experience the power of the latest iPhone 15 with our most pro camera" link="/products" image={iphone}/>
       <FeaturedProducts />
       <HeroSection title="Build the ultimate setup" subtitle="you can add studio display and color matched magic accessories to your bag" link="/products" image={HomeImage}/>
    </div>
  )
}

export default Homepage;