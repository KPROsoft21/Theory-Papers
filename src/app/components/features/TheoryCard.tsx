import React from 'react';
import Image from 'next/image';

interface TheoryCardProps {
  title: string;
  author: string;
  field: string;
  excerpt: string;
  date: string;
}

export default function TheoryCard({ title, author, field, excerpt, date }: TheoryCardProps) {
  return (
    <div className="theory-card mb-6">
      <div className="mb-3">
        <span className="text-sm uppercase tracking-wider">{field}</span>
      </div>
      <h2 className="text-xl font-bold mb-2 typewriter-text">{title}</h2>
      <p className="mb-4">{excerpt}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-black mr-2"></div>
          <span className="typewriter-text">{author}</span>
        </div>
        <span className="text-sm">{date}</span>
      </div>
    </div>
  );
}
