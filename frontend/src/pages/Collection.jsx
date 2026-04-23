import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion, AnimatePresence } from 'framer-motion';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [showType, setShowType] = useState(true);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    // Apply sort immediately on the filtered copy
    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a,b)=>(a.price - b.price));
        break;

      case 'high-low':
        productsCopy.sort((a,b)=>(b.price - a.price));
        break;

      default:
        break;
    }

    setFilterProducts(productsCopy)

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products,sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-14 pt-10 border-t min-h-screen'>
      
      {/* Filter Options */}
      <div className='min-w-60 bg-white sm:pr-8 mb-6 sm:mb-0'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center justify-between cursor-pointer gap-2 font-medium tracking-wide border-b pb-4 mb-4 sm:hidden'>FILTERS
          <img className={`h-3 ${showFilter ? 'rotate-90' : ''} transition-transform`} src={assets.dropdown_icon} alt="" />
        </p>

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>
          {/* Category Filter */}
          <div className='border-b border-gray-100 py-4'>
            <div onClick={() => setShowCategory(!showCategory)} className='flex items-center justify-between cursor-pointer group'>
              <p className='text-sm font-semibold tracking-wide text-gray-900 uppercase'>Categories</p>
              <img className={`h-2.5 transition-transform duration-300 ${showCategory ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="" />
            </div>
            
            <AnimatePresence>
              {showCategory && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className='overflow-hidden'
                >
                  <div className='flex flex-col gap-3 text-sm font-medium text-gray-500 mt-4'>
                    <label className='flex gap-3 items-center cursor-pointer hover:text-black group transition-colors'>
                      <input className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer' type="checkbox" value={'Men'} onChange={toggleCategory}/>
                      Men
                    </label>
                    <label className='flex gap-3 items-center cursor-pointer hover:text-black group transition-colors'>
                      <input className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer' type="checkbox" value={'Women'} onChange={toggleCategory}/>
                      Women
                    </label>
                    <label className='flex gap-3 items-center cursor-pointer hover:text-black group transition-colors'>
                      <input className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer' type="checkbox" value={'Kids'} onChange={toggleCategory}/>
                      Kids
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SubCategory Filter */}
          <div className='border-b border-gray-100 py-4'>
            <div onClick={() => setShowType(!showType)} className='flex items-center justify-between cursor-pointer group'>
              <p className='text-sm font-semibold tracking-wide text-gray-900 uppercase'>Type</p>
              <img className={`h-2.5 transition-transform duration-300 ${showType ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="" />
            </div>
            
            <AnimatePresence>
              {showType && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className='overflow-hidden'
                >
                  <div className='flex flex-col gap-3 text-sm font-medium text-gray-500 mt-4'>
                    <label className='flex gap-3 items-center cursor-pointer hover:text-black group transition-colors'>
                      <input className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>
                      Topwear
                    </label>
                    <label className='flex gap-3 items-center cursor-pointer hover:text-black group transition-colors'>
                      <input className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>
                      Bottomwear
                    </label>
                    <label className='flex gap-3 items-center cursor-pointer hover:text-black group transition-colors'>
                      <input className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>
                      Winterwear
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1 pb-20'>

        <div className='flex flex-col sm:flex-row justify-between text-base sm:text-2xl mb-8 items-start sm:items-center'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            {/* Porduct Sort */}
            <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 rounded px-4 py-2 mt-4 sm:mt-0 text-sm font-medium focus:outline-none focus:border-black cursor-pointer bg-white'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
