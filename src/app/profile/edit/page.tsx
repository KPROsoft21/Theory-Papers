import React from 'react';
import Navbar from '../../../components/layout/Navbar';
import TextInput from '../../../components/ui/TextInput';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';

export default function EditProfile() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 typewriter-text">Edit Profile</h1>
        
        <div className="border-2 border-black p-6 bg-white">
          <form>
            <div className="flex justify-center mb-6">
              <div className="profile-avatar w-24 h-24 rounded-full bg-black"></div>
            </div>
            
            <div className="text-center mb-6">
              <Button variant="secondary" className="text-sm">Change Profile Picture</Button>
            </div>
            
            <TextInput 
              label="Name" 
              placeholder="Your name"
              value="Jane Doe"
              required 
            />
            
            <Textarea 
              label="Bio" 
              placeholder="Tell others about yourself"
              value="Theoretical physicist specializing in quantum mechanics. I love exploring the mysteries of the universe and sharing my theories with fellow enthusiasts."
              rows={4}
            />
            
            <TextInput 
              label="Email" 
              type="email"
              placeholder="Your email address"
              value="jane.doe@example.com"
              required 
            />
            
            <TextInput 
              label="Password" 
              type="password"
              placeholder="Leave blank to keep current password"
            />
            
            <div className="mb-4">
              <label className="block mb-2 typewriter-text">
                Fields of Interest
              </label>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" className="text-sm py-1">Physics</Button>
                <Button variant="secondary" className="text-sm py-1">Mathematics</Button>
                <Button variant="secondary" className="text-sm py-1">Astronomy</Button>
                <Button variant="secondary" className="text-sm py-1">+ Add Field</Button>
              </div>
            </div>
            
            <Button type="submit" className="mt-4">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
