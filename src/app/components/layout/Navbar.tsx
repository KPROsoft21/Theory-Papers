'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
      
      if (loginStatus) {
        const name = localStorage.getItem('userName');
        if (name) {
          setUserName(name);
        }
      }
    };
    
    // Check on mount
    checkLoginStatus();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event listener for auth state changes
    const handleAuthChange = () => checkLoginStatus();
    window.addEventListener('authChange', handleAuthChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);
  
  const handleSignOut = () => {
    // Clear auth data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authProvider');
    localStorage.removeItem('userProfilePicture');
    
    // Update state
    setIsLoggedIn(false);
    setUserName('');
    
    // Trigger storage event for other components to detect
    window.dispatchEvent(new Event('storage'));
    
    // Redirect to home
    router.push('/');
  };
  
  return (
    <header className="main-header w-full py-4 px-6 flex justify-between items-center border-b-2 border-black bg-white">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold typewriter-text">
          Theory Papers
        </Link>
      </div>
      
      <div className="flex-1 mx-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search topics, papers, writers, fields..." 
            className="search-bar w-full py-2 px-4 typewriter-text border-2 border-black"
          />
        </div>
      </div>
      
      <nav className="flex items-center space-x-6">
        <Link href="/browse" className="typewriter-text hover:underline">
          Browse
        </Link>
        
        {/* Only show Post Theory link if logged in */}
        {isLoggedIn && (
          <Link href="/post" className="typewriter-text hover:underline">
            Post Theory
          </Link>
        )}
        
        {isLoggedIn ? (
          <>
            <Link href="/profile/1" className="typewriter-text hover:underline">
              {userName || 'Profile'}
            </Link>
            <Link href="/messages" className="typewriter-text hover:underline">
              Messages
            </Link>
            <button 
              onClick={handleSignOut}
              className="border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors typewriter-text"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link 
              href="/login" 
              className="border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors typewriter-text"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="border-2 border-black px-3 py-1 bg-black text-white hover:bg-white hover:text-black transition-colors typewriter-text"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
