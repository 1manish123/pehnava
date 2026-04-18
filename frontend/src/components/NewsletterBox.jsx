import React from 'react'
import { motion } from 'framer-motion'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className=' text-center my-20 py-10 bg-gray-50/50 rounded-xl px-4'
    >
      <p className='text-3xl font-medium text-gray-900 mb-4'>Join the Club & Get 20% Off</p>
      <p className='text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed tracking-wide'>
        Sign up for our newsletter to receive 20% off your first order. Stay updated with the latest trends, styling tips, and members-only offers. 
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-8 border rounded-md overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-black transition-shadow'>
        <input className='w-full sm:flex-1 outline-none px-5 py-4 text-sm bg-transparent' type="email" placeholder='Enter your email address...' required/>
        <motion.button 
          whileHover={{ backgroundColor: "#333" }}
          whileTap={{ scale: 0.95 }}
          type='submit' 
          className='bg-black text-white text-xs font-bold tracking-widest px-8 md:px-10 py-5 h-full transition-colors'
        >
          SUBSCRIBE
        </motion.button>
      </form>
    </motion.div>
  )
}

export default NewsletterBox
