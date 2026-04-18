import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    },[location])
    
  return (showSearch && visible) ? (
    <div className='border-b bg-gray-50/80 backdrop-blur-sm text-center shadow-sm relative z-40 w-[100vw] ml-[calc(50%-50vw)] overflow-hidden'>
      <div className='inline-flex items-center justify-center border border-gray-200 px-6 py-3 my-4 mx-3 rounded-md w-full sm:w-1/2 bg-white focus-within:ring-1 focus-within:ring-black transition-all shadow-sm'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-transparent text-sm font-medium text-gray-800 placeholder-gray-400' type="text" placeholder='Search for collections, products, or types...'/>
        <img className='w-4 ml-4 opacity-50 cursor-text' src={assets.search_icon} alt="Search" />
      </div>
      <button onClick={()=>setShowSearch(false)} className='inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors ml-2'>
        <img className='w-3 opacity-60' src={assets.cross_icon} alt="Close" />
      </button>
    </div>
  ) : null
}

export default SearchBar
