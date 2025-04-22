import React from 'react';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';

export default function MessageInput() {
  return (
    <div className="flex items-center mt-4">
      <TextInput 
        placeholder="Type your message..." 
        className="flex-1 mb-0 mr-2"
      />
      <Button>Send</Button>
    </div>
  );
}
