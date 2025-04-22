'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../../app/components/layout/Navbar';
import Link from 'next/link';
import Button from '../../../app/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function UserProfile({ params }) {
  const router = useRouter();
  const { id } = params;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [theories, setTheories] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  
  // Sample user profiles - in a real app, this would be fetched from the database
  const users = {
    "1": {
      id: 1,
      name: "Jane Doe",
      bio: "Theoretical physicist specializing in quantum mechanics. I love exploring the mysteries of the universe and sharing my theories with fellow enthusiasts.",
      followers: [],
      following: [2, 3, 5],
      profilePicture: null
    },
    "2": {
      id: 2,
      name: "John Smith",
      bio: "Cognitive psychologist researching decision-making processes and biases. Passionate about understanding how humans make choices and how we can improve our decision-making.",
      followers: [1, 3, 4],
      following: [3, 5],
      profilePicture: null
    },
    "3": {
      id: 3,
      name: "Alex Johnson",
      bio: "Philosopher exploring emergent properties in complex systems and consciousness. My work bridges philosophy, cognitive science, and systems theory.",
      followers: [1, 2, 4, 5],
      following: [1, 2],
      profilePicture: null
    },
    "4": {
      id: 4,
      name: "Maria Garcia",
      bio: "Computer scientist working on neural networks and artificial intelligence. Fascinated by the intersection of AI and human consciousness.",
      followers: [2, 5],
      following: [2, 3],
      profilePicture: null
    },
    "5": {
      id: 5,
      name: "David Wilson",
      bio: "Economist studying resource allocation and sustainable economic models. Interested in how we can create more equitable and environmentally sustainable economic systems.",
      followers: [1, 2],
      following: [3, 4],
      profilePicture: null
    }
  };
  
  // Sample theories by user - in a real app, this would be fetched from the database
  const userTheories = {
    "1": [
      {
        id: 1,
        title: "Quantum Entanglement and Its Implications on Reality",
        author: "Jane Doe",
        field: "Physics",
        excerpt: "This paper explores the fascinating phenomenon of quantum entanglement and how it challenges our understanding of reality and locality in the universe.",
        date: "April 21, 2025"
      },
      {
        id: 6,
        title: "String Theory: A New Perspective",
        author: "Jane Doe",
        field: "Physics",
        excerpt: "An alternative approach to string theory that reconciles some of the inconsistencies in current models and provides testable predictions.",
        date: "April 10, 2025"
      }
    ],
    "2": [
      {
        id: 2,
        title: "Cognitive Biases in Decision Making",
        author: "John Smith",
        field: "Psychology",
        excerpt: "An exploration of how cognitive biases affect our decision-making processes and strategies to overcome these inherent mental shortcuts.",
        date: "April 20, 2025"
      },
      {
        id: 7,
        title: "The Psychology of Learning",
        author: "John Smith",
        field: "Psychology",
        excerpt: "A comprehensive analysis of how humans learn and retain information, with implications for education and training.",
        date: "April 8, 2025"
      }
    ],
    "3": [
      {
        id: 3,
        title: "Emergent Properties in Complex Systems",
        author: "Alex Johnson",
        field: "Philosophy",
        excerpt: "This theory examines how complex systems can exhibit properties that are not present in their individual components, challenging reductionist approaches.",
        date: "April 19, 2025"
      }
    ],
    "4": [
      {
        id: 4,
        title: "Neural Networks and Consciousness",
        author: "Maria Garcia",
        field: "Computer Science",
        excerpt: "A theoretical framework for understanding consciousness through the lens of artificial neural networks and information processing.",
        date: "April 18, 2025"
      },
      {
        id: 8,
        title: "The Future of Machine Learning",
        author: "Maria Garcia",
        field: "Computer Science",
        excerpt: "Predictions and analysis of how machine learning will evolve over the next decade and its potential impact on society.",
        date: "April 5, 2025"
      }
    ],
    "5": [
      {
        id: 5,
        title: "Economic Implications of Resource Scarcity",
        author: "David Wilson",
        field: "Economics",
        excerpt: "This paper analyzes how resource scarcity affects economic systems and proposes alternative models for sustainable resource allocation.",
        date: "April 17, 2025"
      }
    ]
  };

  // Check login status and load user data on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
      
      if (loginStatus) {
        const userId = localStorage.getItem('userId');
        setCurrentUserId(userId);
      }
    };
    
    // Check on mount
    checkLoginStatus();
    
    // Load user data
    if (users[id]) {
      const userData = users[id];
      setUser(userData);
      
      // Check if current user is following this profile
      if (userData.followers.includes(parseInt(currentUserId))) {
        setIsFollowing(true);
      }
      
      // Get actual follower and following counts
      setFollowerCount(userData.followers.length);
      setFollowingCount(userData.following.length);
      
      // Get profile picture from localStorage if it's the current user
      if (id === currentUserId) {
        const profilePic = localStorage.getItem('userProfilePicture');
        if (profilePic) {
          userData.profilePicture = profilePic;
        }
      }
    }
    
    // Load theories
    if (userTheories[id]) {
      setTheories(userTheories[id]);
    }
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [id, currentUserId]);

  const handleFollowToggle = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    // In a real app, this would update the follow status in the database
    // For demo purposes, we'll update it in our local state
    
    if (isFollowing) {
      // Unfollow
      setFollowerCount(followerCount - 1);
    } else {
      // Follow
      setFollowerCount(followerCount + 1);
    }
    
    setIsFollowing(!isFollowing);
  };

  const handleMessageUser = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    router.push('/messages');
  };

  if (!user) {
    return (
      <main className="min-h-screen">
        <Navbar />
        
        <div className="container mx-auto px-6 py-8">
          <div className="border-2 border-black p-6 bg-white">
            <p>User not found.</p>
            <Link href="/browse">
              <Button className="mt-4">Back to Browse</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="border-2 border-black p-6 bg-white mb-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-32 h-32 rounded-full bg-black text-white flex items-center justify-center mb-4 overflow-hidden">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">{user.name.charAt(0)}</span>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold typewriter-text">{user.name}</h1>
              </div>
              
              <div className="mb-4">
                <p>{user.bio}</p>
              </div>
              
              <div className="flex justify-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="font-bold text-xl">{followerCount}</div>
                  <div className="text-sm">Followers</div>
                </div>
                
                <div className="text-center">
                  <div className="font-bold text-xl">{followingCount}</div>
                  <div className="text-sm">Following</div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                {currentUserId !== id && (
                  <>
                    <Button 
                      variant={isFollowing ? "secondary" : "primary"} 
                      className="flex-1"
                      onClick={handleFollowToggle}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                    
                    <Button 
                      variant="secondary" 
                      className="flex-1"
                      onClick={handleMessageUser}
                    >
                      Message
                    </Button>
                  </>
                )}
                
                {currentUserId === id && (
                  <Link href="/profile/edit" className="w-full">
                    <Button variant="secondary" className="w-full">Edit Profile</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-6 typewriter-text">Published Theories & Papers</h2>
            
            <div>
              {theories.length > 0 ? (
                theories.map((theory, index) => (
                  <Link href={`/theory/${theory.id}`} key={index}>
                    <div className="border-2 border-black p-6 bg-white mb-6 hover:bg-gray-50 transition-colors">
                      <h3 className="text-xl font-bold mb-2">{theory.title}</h3>
                      <div className="flex flex-wrap items-center text-sm mb-2">
                        <span className="mr-4">{theory.field}</span>
                        <span>{theory.date}</span>
                      </div>
                      <p>{theory.excerpt}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="border-2 border-black p-6 bg-white mb-6">
                  <p>This user hasn't published any theories or papers yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
