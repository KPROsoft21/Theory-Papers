import React from 'react';

interface ProfileCardProps {
  name: string;
  bio: string;
  followers: number;
  following: number;
  isFollowing?: boolean;
  onFollowToggle?: () => void;
}

export default function ProfileCard({ 
  name, 
  bio, 
  followers, 
  following, 
  isFollowing = false,
  onFollowToggle
}: ProfileCardProps) {
  return (
    <div className="border-2 border-black p-6 bg-white">
      <div className="flex items-center mb-4">
        <div className="profile-avatar w-16 h-16 rounded-full bg-black mr-4"></div>
        <div>
          <h2 className="text-xl font-bold typewriter-text">{name}</h2>
          <div className="flex space-x-4 text-sm mt-1">
            <span>{followers} Followers</span>
            <span>{following} Following</span>
          </div>
        </div>
      </div>
      
      <p className="mb-4">{bio}</p>
      
      <button 
        onClick={onFollowToggle}
        className={`follow-button px-4 py-2 w-full ${isFollowing ? 'bg-white text-black' : 'bg-black text-white'}`}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}
