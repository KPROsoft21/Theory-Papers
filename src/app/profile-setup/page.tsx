'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../app/components/layout/Navbar';
import Link from 'next/link';
import TextInput from '../../app/components/ui/TextInput';
import Textarea from '../../app/components/ui/Textarea';
import Button from '../../app/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function ProfileSetup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      // Pre-fill name if available from signup
      const userName = localStorage.getItem('userName');
      if (userName) {
        setName(userName);
      }
    }
  }, [router]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Validate form
      if (!name) {
        setError('Name is required');
        setLoading(false);
        return;
      }
      
      // In a real app, this would upload the profile picture and save profile data
      // For demo purposes, we'll simulate saving the profile
      
      // Save profile data to localStorage
      localStorage.setItem('userName', name);
      localStorage.setItem('userBio', bio);
      
      if (previewUrl) {
        localStorage.setItem('userProfilePicture', previewUrl);
      }
      
      // Redirect to home page after successful profile setup
      router.push('/');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="border-2 border-black p-8 bg-white">
            <h1 className="text-3xl font-bold mb-6 typewriter-text">Set Up Your Profile</h1>
            
            {error && (
              <div className="bg-red-50 border-2 border-red-500 p-3 mb-4 text-red-700">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="mb-4">
                    <label className="block mb-2 font-bold">Profile Picture</label>
                    <div className="border-2 border-black w-40 h-40 mx-auto md:mx-0 flex items-center justify-center overflow-hidden relative">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="text-sm">No image selected</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="profile-picture"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                      <label
                        htmlFor="profile-picture"
                        className="cursor-pointer border-2 border-black px-3 py-1 inline-block text-center w-full hover:bg-gray-100"
                      >
                        Choose Image
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <TextInput
                    label="Display Name"
                    type="text"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={handleNameChange}
                  />
                  
                  <Textarea
                    label="Bio"
                    placeholder="Tell others about yourself, your interests, and your expertise..."
                    rows={5}
                    value={bio}
                    onChange={handleBioChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving Profile...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
