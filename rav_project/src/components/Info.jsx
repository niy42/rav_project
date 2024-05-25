import React from 'react'
import { useUser } from './UserContext';
import { Alert } from './Alert';

const Info = () => {
    const { showAlert } = useUser();
    return (
        <div className="relative mt-5 w-64">
            <div className='absolute left-12 w-full'>
                {showAlert && <Alert type={showAlert.type} message={showAlert.message} className='w-full' />}
            </div>
        </div>
    )
}

export default Info;