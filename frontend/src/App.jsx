import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import { AnimatePresence, motion } from 'framer-motion'

import MyProfile from './pages/MyProfile'

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
</motion.div>
)

const App = () => {
  const location = useLocation();

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<PageWrapper><Home /></PageWrapper>} />
          <Route path='/collection' element={<PageWrapper><Collection /></PageWrapper>} />
          <Route path='/about' element={<PageWrapper><About /></PageWrapper>} />
          <Route path='/contact' element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path='/product/:productId' element={<PageWrapper><Product /></PageWrapper>} />
          <Route path='/cart' element={<PageWrapper><Cart /></PageWrapper>} />
          <Route path='/login' element={<PageWrapper><Login /></PageWrapper>} />
          <Route path='/place-order' element={<PageWrapper><PlaceOrder /></PageWrapper>} />
          <Route path='/orders' element={<PageWrapper><Orders /></PageWrapper>} />
          <Route path='/verify' element={<PageWrapper><Verify /></PageWrapper>} />
          <Route path='/my-profile' element={<PageWrapper><MyProfile /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App
