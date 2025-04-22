'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../app/components/layout/Navbar';
import Link from 'next/link';
import TextInput from '../../app/components/ui/TextInput';
import Button from '../../app/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function Messages() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});

  // Sample data for conversations
  const sampleConversations = [
    {
      id: 1,
      user: {
        id: 2,
        name: 'John Smith',
        profilePicture: null
      },
      lastMessage: 'I found your theory on cognitive biases fascinating!',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      user: {
        id: 3,
        name: 'Alex Johnson',
        profilePicture: null
      },
      lastMessage: 'Would you be interested in collaborating on a paper?',
      timestamp: 'Yesterday'
    },
    {
      id: 3,
      user: {
        id: 4,
        name: 'Maria Garcia',
        profilePicture: null
      },
      lastMessage: 'Thanks for the feedback on my neural networks theory.',
      timestamp: 'Apr 20'
    }
  ];

  // Sample messages for each conversation
  const sampleMessages = {
    1: [
      {
        id: 1,
        senderId: 2,
        text: 'Hello! I just read your paper on quantum entanglement.',
        timestamp: 'Apr 21, 10:15 AM'
      },
      {
        id: 2,
        senderId: 1, // Current user
        text: 'Thank you! I\'m glad you found it interesting.',
        timestamp: 'Apr 21, 10:20 AM'
      },
      {
        id: 3,
        senderId: 2,
        text: 'I found your theory on cognitive biases fascinating!',
        timestamp: 'Apr 21, 10:30 AM'
      }
    ],
    2: [
      {
        id: 1,
        senderId: 3,
        text: 'Hi there! I\'ve been following your work for a while.',
        timestamp: 'Apr 20, 3:45 PM'
      },
      {
        id: 2,
        senderId: 1, // Current user
        text: 'That\'s great to hear! What aspects are you most interested in?',
        timestamp: 'Apr 20, 4:00 PM'
      },
      {
        id: 3,
        senderId: 3,
        text: 'Would you be interested in collaborating on a paper?',
        timestamp: 'Apr 20, 4:15 PM'
      }
    ],
    3: [
      {
        id: 1,
        senderId: 1, // Current user
        text: 'I really enjoyed your paper on neural networks and consciousness.',
        timestamp: 'Apr 19, 11:30 AM'
      },
      {
        id: 2,
        senderId: 4,
        text: 'Thank you for taking the time to read it!',
        timestamp: 'Apr 19, 12:00 PM'
      },
      {
        id: 3,
        senderId: 4,
        text: 'Thanks for the feedback on my neural networks theory.',
        timestamp: 'Apr 20, 9:45 AM'
      }
    ]
  };

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
      
      if (!loginStatus) {
        router.push('/login');
      }
    };
    
    // Check on mount
    checkLoginStatus();
    
    // Load conversations
    setConversations(sampleConversations);
    setMessages(sampleMessages);
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [router]);

  const handleConversationSelect = (conversationId) => {
    setActiveConversation(conversationId);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim() || !activeConversation) return;
    
    // Create new message
    const newMessage = {
      id: messages[activeConversation].length + 1,
      senderId: 1, // Current user
      text: message,
      timestamp: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    };
    
    // Update messages
    const updatedMessages = {
      ...messages,
      [activeConversation]: [...messages[activeConversation], newMessage]
    };
    
    setMessages(updatedMessages);
    
    // Update conversation last message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          lastMessage: message,
          timestamp: 'Just now'
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    // Clear input
    setMessage('');
  };

  const getProfilePicture = (userId) => {
    // In a real app, this would fetch the user's profile picture
    // For demo purposes, we'll use a placeholder
    return null;
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 typewriter-text">Messages</h1>
        
        <div className="border-2 border-black bg-white">
          <div className="flex flex-col md:flex-row">
            {/* Conversations list */}
            <div className="md:w-1/3 border-r-2 border-black">
              <div className="p-4 border-b-2 border-black">
                <h2 className="text-xl font-bold typewriter-text">Conversations</h2>
              </div>
              
              <div className="overflow-y-auto max-h-[600px]">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${activeConversation === conversation.id ? 'bg-gray-100' : ''}`}
                    onClick={() => handleConversationSelect(conversation.id)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-3">
                        {conversation.user.profilePicture ? (
                          <img 
                            src={conversation.user.profilePicture} 
                            alt={conversation.user.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span>{conversation.user.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-bold truncate">{conversation.user.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Messages */}
            <div className="md:w-2/3 flex flex-col">
              {activeConversation ? (
                <>
                  <div className="p-4 border-b-2 border-black">
                    <h2 className="text-xl font-bold typewriter-text">
                      {conversations.find(c => c.id === activeConversation)?.user.name}
                    </h2>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 max-h-[500px]">
                    {messages[activeConversation].map((msg) => (
                      <div 
                        key={msg.id}
                        className={`mb-4 flex ${msg.senderId === 1 ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.senderId !== 1 && (
                          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
                            {getProfilePicture(msg.senderId) ? (
                              <img 
                                src={getProfilePicture(msg.senderId)} 
                                alt="User" 
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <span>{conversations.find(c => c.user.id === msg.senderId)?.user.name.charAt(0)}</span>
                            )}
                          </div>
                        )}
                        
                        <div className={`max-w-[70%] p-3 rounded ${msg.senderId === 1 ? 'bg-black text-white' : 'border-2 border-black bg-white'}`}>
                          <p>{msg.text}</p>
                          <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t-2 border-black">
                    <form onSubmit={handleSendMessage} className="flex">
                      <input
                        type="text"
                        className="flex-1 border-2 border-black p-2 mr-2"
                        placeholder="Type a message..."
                        value={message}
                        onChange={handleMessageChange}
                      />
                      <Button type="submit" disabled={!message.trim()}>
                        Send
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2 typewriter-text">Your Messages</h3>
                    <p className="text-gray-600">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
