import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    },[products])

  return (
    <div className='my-20 px-4 sm:px-10'>
      <div className='text-center text-3xl py-12 flex flex-col items-center'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='max-w-2xl m-auto text-sm md:text-base text-gray-500 mt-4 leading-relaxed tracking-wide'>
          Most wanted. Most loved. Grab our fan-favorite pieces before they're gone again. See why these styles are at the top of everyone's wishlist.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-12'>
        {
            bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
        