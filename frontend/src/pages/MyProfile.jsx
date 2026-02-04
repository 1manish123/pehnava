import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

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
        <div className='flex flex-col items-center justify-center min-h-[80vh] text-gray-800 font-light mt-10'>
            <div className='bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 transform transition-all hover:scale-[1.01] duration-300'>
                <div className='flex flex-col items-center'>

                    {/* Profile Image Section */}
                    {
                        isEdit
                            ? <label htmlFor="image" className='group relative cursor-pointer'>
                                <div className='relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary transition-colors'>
                                    <img className='w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity' src={image ? URL.createObjectURL(image) : userData.image ? userData.image : assets.profile_icon} alt="" />
                                    <div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors'>
                                        <img className='w-8 h-8 filter invert opacity-80' src={assets.exchange_icon} alt="" />
                                    </div>
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>
                            : <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm'>
                                <img className='w-full h-full object-cover' src={userData.image ? userData.image : assets.profile_icon} alt="" />
                            </div>
                    }

                    {/* Name Section */}
                    {
                        isEdit
                            ? <input className='bg-gray-50 text-2xl font-semibold text-center mt-4 max-w-[80%] p-2 rounded border border-gray-200 focus:border-primary outline-none transition-all' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                            : <p className='font-semibold text-2xl text-neutral-800 mt-4 tracking-wide'>{userData.name}</p>
                    }
                </div>

                <div className='mt-8 w-full'>
                    <hr className='border-gray-100 mb-6' />

                    {/* Contact Info */}
                    <p className='text-xs text-stone-500 uppercase tracking-widest font-semibold mb-4'>Contact Information</p>
                    <div className='grid grid-cols-[1fr_2fr] gap-y-4 text-sm'>
                        <p className='font-medium text-gray-600'>Email:</p>
                        <p className='text-blue-500 truncate'>{userData.email}</p>

                        <p className='font-medium text-gray-600'>Phone:</p>
                        {
                            isEdit
                                ? <input className='bg-gray-50 w-full p-1 border rounded focus:border-primary outline-none' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                                : <p className='text-gray-800'>{userData.phone}</p>
                        }

                        <p className='font-medium text-gray-600'>Address:</p>
                        {
                            isEdit
                                ? <div className='flex flex-col gap-2'>
                                    <input className='bg-gray-50 p-1 border rounded w-full' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" placeholder='Line 1' />
                                    <input className='bg-gray-50 p-1 border rounded w-full' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" placeholder='Line 2' />
                                    <div className='grid grid-cols-2 gap-2'>
                                        <input className='bg-gray-50 p-1 border rounded w-full' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))} value={userData.address.city} type="text" placeholder='City' />
                                        <input className='bg-gray-50 p-1 border rounded w-full' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }))} value={userData.address.state} type="text" placeholder='State' />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <input className='bg-gray-50 p-1 border rounded w-full' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, country: e.target.value } }))} value={userData.address.country} type="text" placeholder='Country' />
                                        <input className='bg-gray-50 p-1 border rounded w-full' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, postalCode: e.target.value } }))} value={userData.address.postalCode} type="text" placeholder='Zip' />
                                    </div>
                                </div>
                                : <p className='text-gray-800 leading-relaxed'>
                                    {userData.address.line1} <br />
                                    {userData.address.line2} {userData.address.line2 && <br />}
                                    {userData.address.city}, {userData.address.state}, {userData.address.country} - {userData.address.postalCode}
                                </p>
                        }
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <p className='text-xs text-stone-500 uppercase tracking-widest font-semibold mb-4'>Basic Information</p>
                    <div className='grid grid-cols-[1fr_2fr] gap-y-4 text-sm'>
                        <p className='font-medium text-gray-600'>Gender:</p>
                        {
                            isEdit
                                ? <select className='bg-gray-50 p-1 border rounded w-full md:max-w-[150px]' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                : <p className='text-gray-800'>{userData.gender}</p>
                        }

                        <p className='font-medium text-gray-600'>Birthday:</p>
                        {
                            isEdit
                                ? <input className='bg-gray-50 p-1 border rounded w-full md:max-w-[150px]' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                                : <p className='text-gray-800'>{userData.dob}</p>
                        }
                    </div>
                </div>

                <div className='mt-10 flex justify-center'>
                    {
                        isEdit
                            ? <button
                                className='bg-black text-white px-8 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                                onClick={updateUserProfile}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Information'}
                            </button>
                            : <button className='border border-gray-400 px-8 py-2.5 rounded-full hover:bg-black hover:text-white transition-all shadow-sm' onClick={() => setIsEdit(true)}>
                                Edit Profile
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyProfile
