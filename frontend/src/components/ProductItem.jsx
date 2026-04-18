import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'

const ProductItem = ({id,image,name,price}) => {
    
    const {currency, navigate} = useContext(ShopContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className='group relative cursor-pointer'
    >
      <Link onClick={()=>scrollTo(0,0)} className='block' to={`/product/${id}`}>
        <div className='overflow-hidden bg-[#F8F8F8] aspect-[3/4] relative'>
          <img className='w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105' src={image[0]} alt={name} />
          
          {/* Hover Overlay Actions */}
          <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          <div className='absolute left-0 right-0 bottom-4 flex justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out'>
             <button onClick={(e) => { e.preventDefault(); scrollTo(0,0); navigate(`/product/${id}`) }} className='bg-white/95 text-black px-5 py-2.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm shadow hover:bg-black hover:text-white transition-colors duration-300'>
               View
             </button>
             <button onClick={(e) => { e.preventDefault(); /* mock wishlist toggle */ }} className='bg-white/95 text-black p-2.5 backdrop-blur-sm shadow hover:text-red-500 transition-colors duration-300 group/btn'>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 group-hover/btn:scale-110 transition-transform">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
               </svg>
             </button>
          </div>
        </div>

        <div className='pt-4 px-1'>
          <h3 className='text-sm text-gray-800 font-medium line-clamp-1 mb-1 leading-snug tracking-tight'>{name}</h3>
          <p className='text-sm font-semibold text-gray-500'>{currency}{price}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductItem
