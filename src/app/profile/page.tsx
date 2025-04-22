import React from 'react';
import Navbar from '../../app/components/layout/Navbar';
import ProfileCard from '../../app/components/features/ProfileCard';
import TheoryCard from '../../app/components/features/TheoryCard';
import Button from '../../app/components/ui/Button';

export default function Profile() {
  // Sample profile data
  const profile = {
    name: "Jane Doe",
    bio: "Theoretical physicist specializing in quantum mechanics. I love exploring the mysteries of the universe and sharing my theories with fellow enthusiasts.",
    followers: 245,
    following: 112,
    isFollowing: true
  };

  // Sample theories by this user
  const userTheories = [
    {
      title: "Quantum Entanglement and Its Implications on Reality",
      author: "Jane Doe",
      field: "Physics",
      excerpt: "This paper explores the fascinating phenomenon of quantum entanglement and how it challenges our understanding of reality and locality in the universe.",
      date: "April 21, 2025"
    },
    {
      title: "String Theory: A New Perspective",
      author: "Jane Doe",
      field: "Physics",
      excerpt: "An alternative approach to string theory that reconciles some of the inconsistencies in current models and provides testable predictions.",
      date: "April 10, 2025"
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <ProfileCard 
              name={profile.name}
              bio={profile.bio}
              followers={profile.followers}
              following={profile.following}
              isFollowing={profile.isFollowing}
            />
            
            <div className="mt-6 flex space-x-4">
              <Button variant="secondary" className="flex-1">Message</Button>
              <Button variant="secondary" className="flex-1">Edit Profile</Button>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-6 typewriter-text">Published Theories & Papers</h2>
            
            <div>
              {userTheories.map((theory, index) => (
                <TheoryCard 
                  key={index}
                  title={theory.title}
                  author={theory.author}
                  field={theory.field}
                  excerpt={theory.excerpt}
                  date={theory.date}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
