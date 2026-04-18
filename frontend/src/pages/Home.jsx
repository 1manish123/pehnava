import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
