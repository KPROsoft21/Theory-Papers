'use client';

import React, { useState } from 'react';

interface SortFilterProps {
  onSortChange?: (sortBy: string) => void;
  onFilterChange?: (filter: string) => void;
}

export default function SortFilter({ onSortChange, onFilterChange }: SortFilterProps) {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('recent');
  const [currentFilter, setCurrentFilter] = useState('all');
  
  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
    setFilterDropdownOpen(false);
  };
  
  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
    setSortDropdownOpen(false);
  };
  
  const handleSortSelect = (sortBy: string) => {
    setCurrentSort(sortBy);
    setSortDropdownOpen(false);
    if (onSortChange) onSortChange(sortBy);
  };
  
  const handleFilterSelect = (filter: string) => {
    setCurrentFilter(filter);
    setFilterDropdownOpen(false);
    if (onFilterChange) onFilterChange(filter);
  };
  
  // Map sort values to display text
  const sortDisplayText: {[key: string]: string} = {
    'recent': 'Most Recent',
    'popular': 'Most Popular',
    'trending': 'Trending'
  };
  
  // Map filter values to display text
  const filterDisplayText: {[key: string]: string} = {
    'all': 'All Fields',
    'physics': 'Physics',
    'biology': 'Biology',
    'psychology': 'Psychology',
    'philosophy': 'Philosophy',
    'computer-science': 'Computer Science',
    'economics': 'Economics'
  };
  
  return (
    <div className="flex items-center space-x-4">
      {/* Sort Dropdown */}
      <div className="relative">
        <button 
          className="flex items-center space-x-1 border-2 border-black p-1 bg-white hover:bg-gray-50 transition-colors"
          onClick={toggleSortDropdown}
          aria-haspopup="true"
          aria-expanded={sortDropdownOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span className="text-xs">{sortDisplayText[currentSort]}</span>
        </button>
        
        {sortDropdownOpen && (
          <div className="absolute right-0 mt-1 w-40 bg-white border-2 border-black shadow-lg z-10">
            <ul className="py-1">
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentSort === 'recent' ? 'font-bold' : ''}`}
                  onClick={() => handleSortSelect('recent')}
                >
                  Most Recent
                </button>
              </li>
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentSort === 'popular' ? 'font-bold' : ''}`}
                  onClick={() => handleSortSelect('popular')}
                >
                  Most Popular
                </button>
              </li>
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentSort === 'trending' ? 'font-bold' : ''}`}
                  onClick={() => handleSortSelect('trending')}
                >
                  Trending
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Filter Dropdown */}
      <div className="relative">
        <button 
          className="flex items-center space-x-1 border-2 border-black p-1 bg-white hover:bg-gray-50 transition-colors"
          onClick={toggleFilterDropdown}
          aria-haspopup="true"
          aria-expanded={filterDropdownOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-xs">{filterDisplayText[currentFilter]}</span>
        </button>
        
        {filterDropdownOpen && (
          <div className="absolute right-0 mt-1 w-40 bg-white border-2 border-black shadow-lg z-10">
            <ul className="py-1">
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentFilter === 'all' ? 'font-bold' : ''}`}
                  onClick={() => handleFilterSelect('all')}
                >
                  All Fields
                </button>
              </li>
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentFilter === 'physics' ? 'font-bold' : ''}`}
                  onClick={() => handleFilterSelect('physics')}
                >
                  Physics
                </button>
              </li>
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentFilter === 'biology' ? 'font-bold' : ''}`}
                  onClick={() => handleFilterSelect('biology')}
                >
                  Biology
                </button>
              </li>
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentFilter === 'psychology' ? 'font-bold' : ''}`}
                  onClick={() => handleFilterSelect('psychology')}
                >
                  Psychology
                </button>
              </li>
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentFilter === 'philosophy' ? 'font-bold' : ''}`}
                  onClick={() => handleFilterSelect('philosophy')}
                >
                  Philosophy
                </button>
              </li>
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentFilter === 'computer-science' ? 'font-bold' : ''}`}
                  onClick={() => handleFilterSelect('computer-science')}
                >
                  Computer Science
                </button>
              </li>
              <li>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentFilter === 'economics' ? 'font-bold' : ''}`}
                  onClick={() => handleFilterSelect('economics')}
                >
                  Economics
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
