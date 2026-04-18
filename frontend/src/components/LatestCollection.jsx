import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-20 px-4 sm:px-10'>
      <div className='text-center py-12 text-3xl flex flex-col items-center'>
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
          <p className='max-w-2xl m-auto text-sm md:text-base text-gray-500 mt-4 leading-relaxed tracking-wide'>
         Experience the perfect blend of comfort and style. Our new arrivals feature premium fabrics and modern silhouettes for every occasion.
          </p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-12'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
