import React from 'react';

interface MessageProps {
  content: string;
  sender: string;
  timestamp: string;
  isOwn?: boolean;
}

export default function Message({ 
  content, 
  sender, 
  timestamp, 
  isOwn = false 
}: MessageProps) {
  return (
    <div className={`message-container p-4 mb-4 ${isOwn ? 'ml-auto' : 'mr-auto'} max-w-[80%]`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold typewriter-text">{sender}</span>
        <span className="text-xs">{timestamp}</span>
      </div>
      <p>{content}</p>
    </div>
  );
}
