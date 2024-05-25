import React from 'react'
import { useNavigate } from 'react-router-dom'

const Wallet = () => {
    const navigate = useNavigate();
    const handleNavClick = () => {
        navigate('/protectedpage')
    }
    return (
        <div className='space-y-6'>
            <p className='mt-2 block text-center font-bold text-3xl text-gray-300'>Wallet Page</p>
            <button onClick={handleNavClick} className='p-2 ml-2 rounded-full bg-[#453c5a] text-gray-300 font-semibold'>Home</button>
        </div>
    )
}

export default Wallet
