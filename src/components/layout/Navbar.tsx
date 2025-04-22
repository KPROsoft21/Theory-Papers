import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="main-header w-full py-4 px-6 flex justify-between items-center">
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
            className="search-bar w-full py-2 px-4 typewriter-text"
          />
        </div>
      </div>
      
      <nav className="flex items-center space-x-6">
        <Link href="/browse" className="typewriter-text hover:underline">
          Browse
        </Link>
        <Link href="/post" className="typewriter-text hover:underline">
          Post Theory
        </Link>
        <Link href="/profile" className="typewriter-text hover:underline">
          Profile
        </Link>
      </nav>
    </header>
  );
}
