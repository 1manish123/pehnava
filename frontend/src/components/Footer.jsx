import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-500 leading-relaxed'>
           Style that lasts. Our 'pehnava' collection focuses on durability and classic design, ensuring your wardrobe remains relevant season after season.
            </p>
        </div>

        <div>
            <p className='text-lg font-semibold tracking-wider mb-5 text-gray-900'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-500 font-medium'>
                <li className='cursor-pointer hover:text-black transition-colors'>Home</li>
                <li className='cursor-pointer hover:text-black transition-colors'>About us</li>
                <li className='cursor-pointer hover:text-black transition-colors'>Delivery</li>
                <li className='cursor-pointer hover:text-black transition-colors'>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-lg font-semibold tracking-wider mb-5 text-gray-900'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-500 font-medium'>
                <li className='cursor-pointer hover:text-black transition-colors'>+91-7970612646</li>
                <li className='cursor-pointer hover:text-black transition-colors'>contact@pehnava.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr className='border-gray-200' />
            <p className='py-6 text-sm text-center text-gray-400 font-medium tracking-wide'>Copyright 2026@ pehnava.com - All Rights Reserved.</p>
        </div>

    </motion.div>
  )
}

export default Footer
