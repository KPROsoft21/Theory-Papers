'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../app/components/layout/Navbar';
import Link from 'next/link';
import TextInput from '../../app/components/ui/TextInput';
import Button from '../../app/components/ui/Button';
import { useRouter } from 'next/navigation';

// Mock Google Auth SDK
const mockGoogleAuth = {
  signUp: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            name: 'Google User',
            email: 'googleuser@example.com',
            id: 'google123'
          },
          token: 'mock-google-token-123'
        });
      }, 1000);
    });
  }
};

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push('/');
    }
  }, [router]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Validate form
      if (!name || !email || !password || !confirmPassword) {
        setError('All fields are required');
        setLoading(false);
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      
      // In a real app, this would call an API endpoint
      // For demo purposes, we'll simulate registration
      
      // Store user data temporarily
      localStorage.setItem('tempUserName', name);
      localStorage.setItem('tempUserEmail', email);
      
      // Redirect to login page after successful registration
      // This follows the user's requirement: "after you sign up it should automatically redirect you to the sign in page"
      router.push('/login');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setGoogleLoading(true);
    
    try {
      // In a real app, this would initiate Google OAuth flow
      // For demo purposes, we'll simulate authentication
      const result = await mockGoogleAuth.signUp();
      
      // Store auth data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', 'google123');
      localStorage.setItem('userName', result.user.name);
      localStorage.setItem('userEmail', result.user.email);
      localStorage.setItem('authProvider', 'google');
      
      // Trigger storage event for navbar to detect
      window.dispatchEvent(new Event('storage'));
      
      // Redirect directly to home page for Google sign-up
      // This follows the user's requirement: "unless you sign up using google then it takes you straight to the home page"
      router.push('/');
    } catch (err) {
      setError('Google sign up failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="border-2 border-black p-8 bg-white">
            <h1 className="text-3xl font-bold mb-6 typewriter-text">Sign Up</h1>
            
            {error && (
              <div className="bg-red-50 border-2 border-red-500 p-3 mb-4 text-red-700">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <TextInput
                label="Name"
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={handleNameChange}
              />
              
              <TextInput
                label="Email"
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={handleEmailChange}
              />
              
              <TextInput
                label="Password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              
              <TextInput
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              
              <div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
              
              <div className="relative flex items-center justify-center">
                <div className="border-t border-black w-full"></div>
                <span className="bg-white px-3 text-sm relative z-10">or</span>
                <div className="border-t border-black w-full"></div>
              </div>
              
              <div>
                <button 
                  type="button" 
                  className="w-full flex items-center justify-center border-2 border-black py-2 px-4 bg-white hover:bg-gray-50 transition-colors"
                  onClick={handleGoogleSignUp}
                  disabled={googleLoading}
                >
                  {googleLoading ? (
                    <span>Connecting to Google...</span>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Sign up with Google
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p>
                Already have an account?{' '}
                <Link href="/login" className="text-black font-bold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
