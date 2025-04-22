import React from 'react';
import Navbar from '../../app/components/layout/Navbar';
import TextInput from '../../app/components/ui/TextInput';
import Textarea from '../../app/components/ui/Textarea';
import Button from '../../app/components/ui/Button';

export default function PostTheory() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 typewriter-text">Post Your Theory or Paper</h1>
        
        <div className="border-2 border-black p-6 bg-white">
          <form>
            <TextInput 
              label="Title" 
              placeholder="Enter the title of your theory or paper" 
              required 
            />
            
            <div className="mb-4">
              <label className="block mb-2 typewriter-text">
                Field <span className="text-red-500">*</span>
              </label>
              <select className="w-full border-2 border-black p-2 typewriter-text bg-white">
                <option value="">Select a field</option>
                <option value="physics">Physics</option>
                <option value="biology">Biology</option>
                <option value="psychology">Psychology</option>
                <option value="philosophy">Philosophy</option>
                <option value="computer-science">Computer Science</option>
                <option value="mathematics">Mathematics</option>
                <option value="economics">Economics</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <Textarea 
              label="Abstract" 
              placeholder="Provide a brief summary of your theory or paper" 
              required 
              rows={3}
            />
            
            <Textarea 
              label="Content" 
              placeholder="Write your full theory or paper here..." 
              required 
              rows={10}
            />
            
            <div className="mb-4">
              <label className="block mb-2 typewriter-text">
                Tags (optional)
              </label>
              <TextInput 
                placeholder="Enter tags separated by commas (e.g., quantum physics, relativity)" 
              />
            </div>
            
            <Button type="submit" className="mt-4">
              Publish Theory
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
