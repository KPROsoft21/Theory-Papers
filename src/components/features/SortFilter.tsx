import React from 'react';
import Button from '../ui/Button';

interface SortFilterProps {
  onSortChange?: (sortBy: string) => void;
  onFilterChange?: (filter: string) => void;
}

export default function SortFilter({ onSortChange, onFilterChange }: SortFilterProps) {
  return (
    <div className="border-2 border-black p-4 mb-6 bg-white">
      <h3 className="text-lg font-bold mb-3 typewriter-text">Sort & Filter</h3>
      
      <div className="mb-4">
        <h4 className="font-bold mb-2 typewriter-text">Sort by:</h4>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="secondary" 
            className="text-sm py-1"
            onClick={() => onSortChange && onSortChange('recent')}
          >
            Most Recent
          </Button>
          <Button 
            variant="secondary" 
            className="text-sm py-1"
            onClick={() => onSortChange && onSortChange('popular')}
          >
            Most Popular
          </Button>
          <Button 
            variant="secondary" 
            className="text-sm py-1"
            onClick={() => onSortChange && onSortChange('trending')}
          >
            Trending
          </Button>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold mb-2 typewriter-text">Filter by field:</h4>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="secondary" 
            className="text-sm py-1"
            onClick={() => onFilterChange && onFilterChange('physics')}
          >
            Physics
          </Button>
          <Button 
            variant="secondary" 
            className="text-sm py-1"
            onClick={() => onFilterChange && onFilterChange('biology')}
          >
            Biology
          </Button>
          <Button 
            variant="secondary" 
            className="text-sm py-1"
            onClick={() => onFilterChange && onFilterChange('psychology')}
          >
            Psychology
          </Button>
          <Button 
            variant="secondary" 
            className="text-sm py-1"
            onClick={() => onFilterChange && onFilterChange('philosophy')}
          >
            Philosophy
          </Button>
          <Button 
            variant="secondary" 
            className="text-sm py-1"
            onClick={() => onFilterChange && onFilterChange('computer-science')}
          >
            Computer Science
          </Button>
        </div>
      </div>
    </div>
  );
}
