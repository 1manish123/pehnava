import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='relative w-[100vw] ml-[calc(50%-50vw)] h-[70vh] sm:h-[85vh] flex items-center justify-start overflow-hidden'>
      {/* Background Image */}
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className='absolute inset-0 w-full h-full object-cover object-top' 
        src={assets.hero_img} 
        alt="Latest Fashion Collection" 
      />
      
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent'></div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className='relative z-10 text-center sm:text-left px-6 sm:px-[10vw] w-full max-w-7xl'
      >
        <div className='flex items-center justify-center sm:justify-start gap-3 mb-5'>
            <p className='w-12 h-[2px] bg-white'></p>
            <p className='font-medium text-sm md:text-base tracking-widest text-[#E0E0E0] uppercase'>Exclusive Drop</p>
        </div>
        
        <h1 className='text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 tracking-tighter'>
          Redefine <br className='hidden sm:block' /> Your Style.
        </h1>
        
        <p className='text-gray-200 max-w-lg mx-auto sm:mx-0 text-sm sm:text-base mb-10 leading-relaxed font-light'>
          Discover the latest trends dropping this season. Explore premium quality fabrics, modern silhouettes, and unparalleled comfort designed just for you.
        </p>
        
        <Link to='/collection' className='inline-block'>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className='bg-white text-black px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors shadow-2xl'
          >
            Shop Now
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default Hero
