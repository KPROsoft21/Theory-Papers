'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../app/components/layout/Navbar';
import TheoryCard from '../app/components/features/TheoryCard';
import SortFilter from '../app/components/features/SortFilter';
import Link from 'next/link';

export default function Home() {
  // Sample data for demonstration - expanded with more theories
  const theories = [
    {
      id: 1,
      title: "Quantum Entanglement and Its Implications on Reality",
      author: "Jane Doe",
      field: "Physics",
      excerpt: "This paper explores the fascinating phenomenon of quantum entanglement and how it challenges our understanding of reality and locality in the universe.",
      date: "April 21, 2025",
      featured: true
    },
    {
      id: 2,
      title: "Cognitive Biases in Decision Making",
      author: "John Smith",
      field: "Psychology",
      excerpt: "An exploration of how cognitive biases affect our decision-making processes and strategies to overcome these inherent mental shortcuts.",
      date: "April 20, 2025",
      featured: false
    },
    {
      id: 3,
      title: "Emergent Properties in Complex Systems",
      author: "Alex Johnson",
      field: "Philosophy",
      excerpt: "This theory examines how complex systems can exhibit properties that are not present in their individual components, challenging reductionist approaches.",
      date: "April 19, 2025",
      featured: true
    },
    {
      id: 4,
      title: "Neural Networks and Consciousness",
      author: "Maria Garcia",
      field: "Computer Science",
      excerpt: "A theoretical framework for understanding consciousness through the lens of artificial neural networks and information processing.",
      date: "April 18, 2025",
      featured: false
    },
    {
      id: 5,
      title: "Economic Implications of Resource Scarcity",
      author: "David Wilson",
      field: "Economics",
      excerpt: "This paper analyzes how resource scarcity affects economic systems and proposes alternative models for sustainable resource allocation.",
      date: "April 17, 2025",
      featured: true
    },
    {
      id: 6,
      title: "String Theory: A New Perspective",
      author: "Jane Doe",
      field: "Physics",
      excerpt: "An alternative approach to string theory that reconciles some of the inconsistencies in current models and provides testable predictions.",
      date: "April 10, 2025",
      featured: false
    },
    {
      id: 7,
      title: "The Psychology of Learning",
      author: "John Smith",
      field: "Psychology",
      excerpt: "A comprehensive analysis of how humans learn and retain information, with implications for education and training.",
      date: "April 8, 2025",
      featured: false
    },
    {
      id: 8,
      title: "The Future of Machine Learning",
      author: "Maria Garcia",
      field: "Computer Science",
      excerpt: "Predictions and analysis of how machine learning will evolve over the next decade and its potential impact on society.",
      date: "April 5, 2025",
      featured: false
    }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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

  const handleSortChange = (sortBy: string) => {
    console.log('Sort by:', sortBy);
    // In a real app, this would sort the theories
  };

  const handleFilterChange = (filter: string) => {
    console.log('Filter by:', filter);
    // In a real app, this would filter the theories
  };

  // Get featured theories
  const featuredTheories = theories.filter(theory => theory.featured);
  
  // Get remaining theories
  const regularTheories = theories.filter(theory => !theory.featured);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Featured Theory */}
      <div className="relative bg-white border-b-2 border-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -rotate-12 -left-10 top-20">
            <svg width="300" height="300" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M30,50 Q50,30 70,50 T90,50" stroke="black" strokeWidth="8" fill="none" />
            </svg>
          </div>
          <div className="absolute rotate-45 right-20 bottom-10">
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,50 Q30,20 50,50 T90,50" stroke="black" strokeWidth="6" fill="none" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 typewriter-text">Theory Papers</h1>
            <p className="text-xl">Discover, share, and discuss groundbreaking theories across all fields of study</p>
          </div>
          
          {featuredTheories.length > 0 && (
            <Link href={`/theory/${featuredTheories[0].id}`}>
              <div className="border-2 border-black p-6 bg-white hover:bg-gray-50 transition-colors">
                <div className="inline-block border-2 border-black px-3 py-1 mb-4 text-sm font-bold">
                  Featured Theory
                </div>
                <h2 className="text-2xl font-bold mb-2">{featuredTheories[0].title}</h2>
                <div className="flex flex-wrap items-center text-sm mb-2">
                  <span className="mr-4 font-bold">{featuredTheories[0].author}</span>
                  <span className="mr-4">{featuredTheories[0].field}</span>
                  <span>{featuredTheories[0].date}</span>
                </div>
                <p className="text-lg">{featuredTheories[0].excerpt}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="border-2 border-black p-4 mb-6 bg-white sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold typewriter-text">Explore</h3>
                <SortFilter 
                  onSortChange={handleSortChange}
                  onFilterChange={handleFilterChange}
                />
              </div>
              
              {/* Only show Post New Theory button if logged in */}
              {isLoggedIn && (
                <div className="mt-4">
                  <Link href="/post">
                    <button className="w-full border-2 border-black py-2 px-4 bg-black text-white hover:bg-white hover:text-black transition-colors typewriter-text">
                      Post New Theory
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-3/4">
            <h2 className="text-3xl font-bold mb-6 typewriter-text">Recent Theories</h2>
            
            {/* Featured Theories Grid (excluding the main featured one) */}
            {featuredTheories.length > 1 && (
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4 typewriter-text">Featured Theories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredTheories.slice(1).map((theory, index) => (
                    <Link href={`/theory/${theory.id}`} key={index}>
                      <div className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors h-full">
                        <h3 className="text-xl font-bold mb-2">{theory.title}</h3>
                        <div className="flex flex-wrap items-center text-sm mb-2">
                          <span className="mr-4 font-bold">{theory.author}</span>
                          <span className="mr-4">{theory.field}</span>
                        </div>
                        <p className="line-clamp-3">{theory.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Staggered Layout for Regular Theories */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {regularTheories.map((theory, index) => {
                // Create a staggered layout with varying column spans
                const colSpan = index % 3 === 0 ? 'md:col-span-12' : 
                                index % 3 === 1 ? 'md:col-span-7' : 'md:col-span-5';
                
                return (
                  <Link href={`/theory/${theory.id}`} key={index} className={colSpan}>
                    <div className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors h-full">
                      <h3 className={`${index % 3 === 0 ? 'text-xl' : 'text-lg'} font-bold mb-2`}>
                        {theory.title}
                      </h3>
                      <div className="flex flex-wrap items-center text-sm mb-2">
                        <span className="mr-4 font-bold">{theory.author}</span>
                        <span className="mr-4">{theory.field}</span>
                        <span>{theory.date}</span>
                      </div>
                      <p className={index % 3 === 0 ? '' : 'line-clamp-3'}>
                        {theory.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Brush Strokes */}
      <div className="relative">
        <div className="absolute -bottom-20 -left-20 opacity-10 -rotate-12">
          <img src="/images/brush-stroke-1.svg" alt="" className="w-64 h-64" />
        </div>
        <div className="absolute -top-40 -right-20 opacity-10 rotate-45">
          <img src="/images/brush-stroke-2.svg" alt="" className="w-96 h-96" />
        </div>
      </div>
    </main>
  );
}
