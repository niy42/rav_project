import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate();
    const handleNavClick = () => {
        navigate('/protectedpage')
    }
    return (
        <div>
            <p className='block text-center font-bold text-3xl'>Profile Page</p>
            <button onClick={handleNavClick} className='p-2 rounded-full bg-blue-600'>back to ProtectedPage</button>
        </div>
    )
}

export default Profile
