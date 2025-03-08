import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import axios from 'axios';
import { BASE_URL } from './constants';
import { setauthority, setName, setEmail, setCompany, setNotifications, setUserId } from '../app/authslice';



const Protected = ({ children,  }) => {
  const [loading, setLoading] = useState(true);
  const [debouncedLoading, setDebouncedLoading] = useState(true); // For debounce
  const [showContent, setShowContent] = useState(false); // For transition effect
  const [isDarkMode, setIsDarkMode] = useState(false); // Track dark mode
  const navigate = useNavigate();
  const authority = localStorage.getItem('authority');
  const dispatch = useDispatch();

  const checking = async () => {
    const checkData = { authority };

    try {
      const res = await axios.post(`${BASE_URL}/checking`, checkData);

      if (res.status === 200) {
        dispatch(setauthority(res.data.Checked.authority));
        dispatch(setName(res.data.Checked.username));
        dispatch(setCompany(res.data.Checked.companyName));
        dispatch(setEmail(res.data.Checked.email));
        dispatch(setUserId(res.data.Checked.userId));
        setLoading(false); // Stop the loader
      } else {
        navigate('/session-out');
      }
    } catch (error) {
      console.error('Error checking authority:', error);
      navigate('/session-out');
    }
  };


  useEffect(() => {
    setLoading(true);
    setDebouncedLoading(true);
    setShowContent(false);
    authority !== "MasterAdmin" && checking()
  }, [children]);

  // Debounce effect
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setDebouncedLoading(false);
        setTimeout(() => setShowContent(true), 50); // Delay to ensure smooth transition
      }, 0); // 1000ms debounce
      return () => clearTimeout(timer);
    }
  }, [loading]);


  // Track dark mode
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, [loading]);

  return (
    <div>
    {debouncedLoading ? (
      <div className="h-[90vh] flex items-center justify-center dark:text-background1">
        <SyncLoader color={isDarkMode ? '#ffffff' : '#000000'} />
      </div>
    ) : (
      <div
        // className={`transition-transform duration-200 opacity-0 ease-in-out ${
        //   showContent ? 'scale-100 opacity-100' : 'scale-50'
        // }`}
      >
        {children}
      </div>
    )}
  </div>
  

  );
};

export default Protected;
