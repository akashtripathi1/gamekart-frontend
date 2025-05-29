// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/store/slice/authSlice';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/current_user`,
          { credentials: 'include' }
        );
        const data = await response.json();
        dispatch(
          setAuthState({
            isAuthenticated: data.isAuthenticated,
            user: data.user,
          })
        );
      } catch (error) {
        dispatch(
          setAuthState({
            isAuthenticated: false,
            user: null,
          })
        );
      }
    };
    checkSession();
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;