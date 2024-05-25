import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ProtectedPage, AuthScreen } from './components';
import { Markets, Wallet, Profile, DashBoard } from './components/navbarlinks';
import './index.css';

import { ClerkProvider } from '@clerk/clerk-react';
import { UserProvider } from './components/UserContext';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error("Missing publishable key!");
}

const ClerkWithRoutes = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path='/' element={<AuthScreen />} />
        {/* Clerk Routing*/}
        {/*<Route path='/sign-in/*' element={<SignIn forceRedirectUrl={'/protected'} routing='path' path='/sign-in' />} />
        <Route path='/sign-up/*' element={<SignUp forceRedirectUrl={'/protected'} routing='path' path='/sign-up' />} />*/}
        {/*<Route path='/protected' element={
          <>
            <SignedIn>
              <ProtectedPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />*/}
        <Route path='/protectedpage' element={<ProtectedPage />} />
        <Route path='/markets' element={<Markets />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/wallet' element={<Wallet />} />
      </Routes>
    </ClerkProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ClerkWithRoutes />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);