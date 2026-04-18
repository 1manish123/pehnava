import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { assets, products } from '../assets/assets'

const Categories = () => {

    // Find sample images for categories
    const menImg = products.find(p => p.category === 'Men')?.image[0] || assets.p_img2_1;
    const womenImg = products.find(p => p.category === 'Women')?.image[0] || assets.p_img1;
    const kidsImg = products.find(p => p.category === 'Kids')?.image[0] || assets.p_img3;
    const winterImg = products.find(p => p.subCategory === 'Winterwear')?.image[0] || assets.p_img21;

    const categoriesList = [
        { name: "Men", img: menImg, path: "/collection" },
        { name: "Women", img: womenImg, path: "/collection" },
        { name: "Kids", img: kidsImg, path: "/collection" },
        { name: "Winterwear", img: winterImg, path: "/collection" },
    ];

  return (
    <div className='my-10 px-4 sm:px-10 overflow-hidden'>
      <div className='flex items-center gap-6 overflow-x-auto no-scrollbar py-6 justify-start sm:justify-center'>
        {categoriesList.map((cat, index) => (
            <Link to={cat.path} key={index}>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex flex-col items-center gap-3 cursor-pointer group shrink-0'
                >
                    <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-gray-200 shadow-sm group-hover:border-black group-hover:shadow-md transition-all p-1'>
                        <img className='w-full h-full object-cover rounded-full mix-blend-multiply' src={cat.img} alt={cat.name} />
                    </div>
                    <p className='text-xs sm:text-sm font-medium tracking-wide text-gray-800 uppercase'>{cat.name}</p>
                </motion.div>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
