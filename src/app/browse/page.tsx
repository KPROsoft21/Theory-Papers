'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../app/components/layout/Navbar';
import TheoryCard from '../../app/components/features/TheoryCard';
import SortFilter from '../../app/components/features/SortFilter';
import Link from 'next/link';
import Button from '../../app/components/ui/Button';

export default function Browse() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  
  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
    };
    
    // Check on mount
    checkLoginStatus();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);
  
  // Sample data for demonstration
  const theories = [
    {
      id: 1,
      title: "Quantum Entanglement and Its Implications on Reality",
      author: "Jane Doe",
      field: "Physics",
      excerpt: "This paper explores the fascinating phenomenon of quantum entanglement and how it challenges our understanding of reality and locality in the universe.",
      date: "April 21, 2025"
    },
    {
      id: 2,
      title: "Cognitive Biases in Decision Making",
      author: "John Smith",
      field: "Psychology",
      excerpt: "An exploration of how cognitive biases affect our decision-making processes and strategies to overcome these inherent mental shortcuts.",
      date: "April 20, 2025"
    },
    {
      id: 3,
      title: "Emergent Properties in Complex Systems",
      author: "Alex Johnson",
      field: "Philosophy",
      excerpt: "This theory examines how complex systems can exhibit properties that are not present in their individual components, challenging reductionist approaches.",
      date: "April 19, 2025"
    },
    {
      id: 4,
      title: "Neural Networks and Consciousness",
      author: "Maria Garcia",
      field: "Computer Science",
      excerpt: "A theoretical framework for understanding consciousness through the lens of artificial neural networks and information processing.",
      date: "April 18, 2025"
    },
    {
      id: 5,
      title: "Economic Implications of Resource Scarcity",
      author: "David Wilson",
      field: "Economics",
      excerpt: "This paper analyzes how resource scarcity affects economic systems and proposes alternative models for sustainable resource allocation.",
      date: "April 17, 2025"
    }
  ];

  const handleSortChange = (sortOption) => {
    console.log('Sort by:', sortOption);
    setSortBy(sortOption);
    // In a real app, this would sort the theories
  };

  const handleFilterChange = (filterOption) => {
    console.log('Filter by:', filterOption);
    setFilterBy(filterOption);
    // In a real app, this would filter the theories
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="border-2 border-black p-4 mb-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold typewriter-text">Browse</h3>
                <SortFilter 
                  onSortChange={handleSortChange}
                  onFilterChange={handleFilterChange}
                />
              </div>
              
              {/* Only show Post New Theory button if logged in */}
              {isLoggedIn && (
                <div className="mt-4">
                  <Link href="/post">
                    <Button className="w-full">
                      Post New Theory
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6 typewriter-text">Browse Theories & Papers</h1>
            
            <div>
              {theories.map((theory, index) => (
                <Link href={`/theory/${theory.id}`} key={index}>
                  <TheoryCard 
                    title={theory.title}
                    author={theory.author}
                    field={theory.field}
                    excerpt={theory.excerpt}
                    date={theory.date}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
