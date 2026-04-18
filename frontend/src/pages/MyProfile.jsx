import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const MyProfile = () => {

    const { backendUrl, token } = useContext(ShopContext)

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        name: '',
        image: '',
        email: '',
        phone: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        },
        gender: 'Not Selected',
        dob: ''
    })

    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const updateUserProfile = async () => {
        try {
            setLoading(true)
            const formData = new FormData()

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            formData.append('userId', userData._id)

            if (image) formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                setImage(false)
                loadUserProfile()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfile()
        }
    }, [token])

    return userData && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='flex flex-col items-center justify-center min-h-[85vh] py-10 px-4'
        >
            <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-3xl w-full max-w-xl overflow-hidden'>
                
                {/* Banner Header Area */}
                <div className='bg-gray-50 h-32 w-full'></div>
                
                <div className='px-10 pb-12 -mt-16 flex flex-col'>
                    {/* Profile Image Section */}
                    <div className='self-center relative'>
                        {
                            isEdit
                                ? <label htmlFor="image" className='group relative cursor-pointer block'>
                                    <div className='relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white transition-transform hover:scale-105'>
                                        <img className='w-full h-full object-cover transition-opacity group-hover:opacity-60' src={image ? URL.createObjectURL(image) : userData.image ? userData.image : assets.profile_icon} alt="Profile" />
                                        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-all'>
                                            <span className='text-white text-xs font-semibold uppercase tracking-widest'>Change</span>
                                        </div>
                                    </div>
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                                </label>
                                : <motion.div whileHover={{ scale: 1.05 }} className='w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative'>
                                    <img className='w-full h-full object-cover' src={userData.image ? userData.image : assets.profile_icon} alt="Profile" />
                                </motion.div>
                        }
                    </div>

                    {/* Name Section */}
                    <div className='text-center mt-6'>
                        {
                            isEdit
                                ? <input className='bg-gray-50 text-2xl font-semibold text-center w-full focus:ring-1 focus:ring-black rounded-md p-2 border-transparent focus:border-black outline-none transition-all' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} autoFocus />
                                : <h2 className='text-3xl font-bold text-gray-900 tracking-tight'>{userData.name}</h2>
                        }
                    </div>

                    <div className='mt-10 space-y-8'>
                        {/* Contact Info */}
                        <div className='group'>
                            <p className='text-[11px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-5 border-b border-gray-100 pb-2'>Contact Information</p>
                            <div className='grid grid-cols-[1fr_2fr] gap-y-5 text-sm'>
                                <p className='font-medium text-gray-500'>Email Data</p>
                                <p className='text-gray-900 truncate font-medium'>{userData.email}</p>

                                <p className='font-medium text-gray-500'>Phone No.</p>
                                {
                                    isEdit
                                        ? <input className='bg-gray-50 w-full p-2.5 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all' type="tel" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                                        : <p className='text-gray-900 font-medium'>{userData.phone || "Not provided"}</p>
                                }

                                <p className='font-medium text-gray-500'>Address</p>
                                {
                                    isEdit
                                        ? <div className='flex flex-col gap-3'>
                                            <input className='bg-gray-50 p-2.5 border border-gray-200 rounded-md w-full focus:ring-1 focus:ring-black focus:border-black outline-none transition-all' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" placeholder='Unit, Suite, Floor' />
                                            <input className='bg-gray-50 p-2.5 border border-gray-200 rounded-md w-full focus:ring-1 focus:ring-black focus:border-black outline-none transition-all' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" placeholder='Street Address' />
                                            <div className='grid grid-cols-2 gap-3'>
                                                <input className='bg-gray-50 p-2.5 border border-gray-200 rounded-md w-full focus:ring-1 focus:ring-black focus:border-black outline-none transition-all' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))} value={userData.address.city} type="text" placeholder='City' />
                                                <input className='bg-gray-50 p-2.5 border border-gray-200 rounded-md w-full focus:ring-1 focus:ring-black focus:border-black outline-none transition-all' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }))} value={userData.address.state} type="text" placeholder='State/Province' />
                                            </div>
                                            <div className='grid grid-cols-2 gap-3'>
                                                <input className='bg-gray-50 p-2.5 border border-gray-200 rounded-md w-full focus:ring-1 focus:ring-black focus:border-black outline-none transition-all' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, country: e.target.value } }))} value={userData.address.country} type="text" placeholder='Country' />
                                                <input className='bg-gray-50 p-2.5 border border-gray-200 rounded-md w-full focus:ring-1 focus:ring-black focus:border-black outline-none transition-all' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, postalCode: e.target.value } }))} value={userData.address.postalCode} type="text" placeholder='Postal Code' />
                                            </div>
                                        </div>
                                        : <p className='text-gray-900 font-medium leading-relaxed'>
                                            {userData.address?.line1 || ''} {userData.address?.line2 ? `, ${userData.address.line2}` : ''} <br />
                                            {(userData.address?.city || userData.address?.state) ? `${userData.address.city}, ${userData.address.state}` : 'Address not fully provided'} <br/>
                                            {userData.address?.country}
                                        </p>
                                }
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className='group'>
                            <p className='text-[11px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-5 border-b border-gray-100 pb-2 mt-4'>Basic Information</p>
                            <div className='grid grid-cols-[1fr_2fr] gap-y-5 text-sm'>
                                <p className='font-medium text-gray-500'>Gender</p>
                                {
                                    isEdit
                                        ? <select className='bg-gray-50 p-2.5 border border-gray-200 rounded-md w-full focus:ring-1 focus:ring-black focus:border-black outline-none transition-all' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                            <option value="Not Selected">Prefer not to say</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        : <p className='text-gray-900 font-medium'>{userData.gender}</p>
                                }

                                <p className='font-medium text-gray-500'>Birthday</p>
                                {
                                    isEdit
                                        ? <input className='bg-gray-50 p-2.5 border border-gray-200 rounded-md w-full focus:ring-1 focus:ring-black focus:border-black outline-none transition-all' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                                        : <p className='text-gray-900 font-medium'>{userData.dob || "Not provided"}</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='mt-12 flex justify-center'>
                        {
                            isEdit
                                ? <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='bg-black text-white px-12 py-3.5 text-sm font-semibold tracking-wider uppercase shadow-xl disabled:opacity-50 transition-all'
                                    onClick={updateUserProfile}
                                    disabled={loading}
                                >
                                    {loading ? 'Saving Changes...' : 'Save Profile Details'}
                                </motion.button>
                                : <motion.button 
                                    whileHover={{ scale: 1.02, backgroundColor: "#000", color: "#fff" }}
                                    whileTap={{ scale: 0.98 }}
                                    className='border-2 border-gray-900 text-gray-900 bg-white px-12 py-3.5 text-sm font-semibold tracking-wider uppercase transition-colors' 
                                    onClick={() => setIsEdit(true)}
                                  >
                                    Edit Profile
                                </motion.button>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default MyProfile
