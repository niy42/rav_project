import React from 'react'
import { useNavigate } from 'react-router-dom'

const Wallet = () => {
    const navigate = useNavigate();
    const handleNavClick = () => {
        navigate('/protectedpage')
    }
    return (
        <div>
            <p className='block text-center font-bold text-3xl'>Wallet Page</p>
            <button onClick={handleNavClick} className='rounded-full p-2 bg-blue-600'>back to ProtectedPage</button>
        </div>
    )
}

export default Wallet
