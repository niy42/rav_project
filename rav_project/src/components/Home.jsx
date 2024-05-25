import { SignIn, SignUp } from '@clerk/clerk-react';
import React from 'react'

function Home() {
    return (
        <div className='p-3 bg-slate-300'>
            {/*<SignIn forceRedirectUrl={'/protected'} />*/}
            <SignUp forceRedirectUrl={'/protected'} />

        </div>
    )
}

export default Home;
