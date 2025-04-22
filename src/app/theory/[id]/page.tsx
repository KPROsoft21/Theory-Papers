'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../../app/components/layout/Navbar';
import Link from 'next/link';
import Button from '../../../app/components/ui/Button';
import Textarea from '../../../app/components/ui/Textarea';
import { useRouter } from 'next/navigation';

export default function TheoryDetail({ params }) {
  const router = useRouter();
  const { id } = params;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theory, setTheory] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample theories data
  const theories = {
    "1": {
      id: 1,
      title: "Quantum Entanglement and Its Implications on Reality",
      author: "Jane Doe",
      authorId: 1,
      field: "Physics",
      abstract: "This paper explores the fascinating phenomenon of quantum entanglement and how it challenges our understanding of reality and locality in the universe.",
      content: `
        <h2>Introduction</h2>
        <p>Quantum entanglement is one of the most profound features of quantum mechanics. It describes a phenomenon where two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently of the others, regardless of the distance separating them.</p>
        
        <h2>Theoretical Background</h2>
        <p>The concept of quantum entanglement was first described by Albert Einstein, Boris Podolsky, and Nathan Rosen in their 1935 paper, which presented what is now known as the EPR paradox. Einstein famously referred to this phenomenon as "spooky action at a distance," highlighting the counterintuitive nature of quantum mechanics.</p>
        
        <h2>Experimental Evidence</h2>
        <p>Numerous experiments have confirmed the existence of quantum entanglement, most notably those conducted by Alain Aspect in the 1980s. These experiments demonstrated violations of Bell's inequalities, providing strong evidence against local hidden variable theories and in favor of quantum mechanics.</p>
        
        <h2>Implications for Our Understanding of Reality</h2>
        <p>The existence of quantum entanglement challenges our classical intuition about the nature of reality. It suggests that the universe is fundamentally non-local, meaning that what happens at one location can instantaneously affect what happens at another location, regardless of the distance between them.</p>
        
        <h2>Potential Applications</h2>
        <p>Beyond its philosophical implications, quantum entanglement has practical applications in quantum computing, quantum cryptography, and quantum teleportation. These technologies leverage the unique properties of entangled particles to perform tasks that would be impossible with classical systems.</p>
        
        <h2>Conclusion</h2>
        <p>Quantum entanglement remains one of the most fascinating and mysterious aspects of quantum mechanics. As our understanding of this phenomenon continues to evolve, it will undoubtedly lead to new insights into the fundamental nature of reality and potentially revolutionary technological applications.</p>
      `,
      tags: ["quantum physics", "entanglement", "quantum mechanics", "reality"],
      date: "April 21, 2025",
      likes: 42,
      views: 156
    },
    "2": {
      id: 2,
      title: "Cognitive Biases in Decision Making",
      author: "John Smith",
      authorId: 2,
      field: "Psychology",
      abstract: "An exploration of how cognitive biases affect our decision-making processes and strategies to overcome these inherent mental shortcuts.",
      content: `
        <h2>Introduction</h2>
        <p>Cognitive biases are systematic patterns of deviation from norm or rationality in judgment. They are tendencies to think in certain ways that can lead to systematic deviations from a standard of rationality or good judgment. This paper explores how these biases affect our decision-making processes.</p>
        
        <h2>Common Cognitive Biases</h2>
        <p>There are numerous cognitive biases that affect our decision making. Some of the most common include confirmation bias (the tendency to search for information that confirms our preexisting beliefs), anchoring bias (the tendency to rely too heavily on the first piece of information encountered), and availability heuristic (the tendency to overestimate the likelihood of events with greater "availability" in memory).</p>
        
        <h2>Impact on Decision Making</h2>
        <p>These biases can significantly impact our decision-making processes in various contexts, from personal choices to business decisions and public policy. They can lead to suboptimal outcomes, reinforcement of existing beliefs, and resistance to new information.</p>
        
        <h2>Strategies for Overcoming Biases</h2>
        <p>While it's impossible to completely eliminate cognitive biases, there are strategies that can help mitigate their effects. These include seeking diverse perspectives, actively challenging our own assumptions, using structured decision-making frameworks, and increasing awareness of our own biases.</p>
        
        <h2>Case Studies</h2>
        <p>This section presents several case studies demonstrating how cognitive biases have influenced real-world decisions and the consequences of these biases. It also examines instances where strategies to overcome biases have been successfully implemented.</p>
        
        <h2>Conclusion</h2>
        <p>Understanding cognitive biases is essential for improving decision-making processes. By recognizing these biases and implementing strategies to mitigate their effects, individuals and organizations can make more rational and effective decisions.</p>
      `,
      tags: ["psychology", "cognitive bias", "decision making", "behavioral economics"],
      date: "April 20, 2025",
      likes: 38,
      views: 142
    },
    "3": {
      id: 3,
      title: "Emergent Properties in Complex Systems",
      author: "Alex Johnson",
      authorId: 3,
      field: "Philosophy",
      abstract: "This theory examines how complex systems can exhibit properties that are not present in their individual components, challenging reductionist approaches.",
      content: `
        <h2>Introduction</h2>
        <p>Emergence is a phenomenon whereby larger entities arise through interactions among smaller or simpler entities such that the larger entities exhibit properties the smaller/simpler entities do not exhibit. This paper explores the philosophical implications of emergent properties in complex systems.</p>
        
        <h2>Theoretical Framework</h2>
        <p>The concept of emergence has roots in various philosophical traditions, from ancient Greek philosophy to modern systems theory. This section outlines the theoretical framework for understanding emergence, distinguishing between weak emergence (where emergent properties can, in principle, be predicted from knowledge of the base components) and strong emergence (where emergent properties are irreducible to and unpredictable from the base components).</p>
        
        <h2>Examples of Emergent Properties</h2>
        <p>Emergent properties can be observed across various domains, from physics and chemistry to biology and social systems. Examples include the wetness of water (not present in individual H2O molecules), consciousness (emerging from neural activity), and social phenomena like market behavior or cultural norms.</p>
        
        <h2>Challenges to Reductionism</h2>
        <p>The existence of emergent properties poses significant challenges to reductionist approaches that seek to understand complex systems solely in terms of their constituent parts. This section examines these challenges and their implications for scientific methodology and philosophical understanding.</p>
        
        <h2>Implications for Understanding Complexity</h2>
        <p>Understanding emergence is crucial for addressing complex problems in various fields, from ecology and climate science to economics and social policy. This section explores how an appreciation of emergent properties can inform approaches to complex systems.</p>
        
        <h2>Conclusion</h2>
        <p>Emergent properties remind us that "the whole is greater than the sum of its parts." Recognizing and understanding these properties is essential for a comprehensive understanding of complex systems and for developing effective approaches to complex problems.</p>
      `,
      tags: ["philosophy", "emergence", "complex systems", "reductionism"],
      date: "April 19, 2025",
      likes: 29,
      views: 118
    },
    "4": {
      id: 4,
      title: "Neural Networks and Consciousness",
      author: "Maria Garcia",
      authorId: 4,
      field: "Computer Science",
      abstract: "A theoretical framework for understanding consciousness through the lens of artificial neural networks and information processing.",
      content: `
        <h2>Introduction</h2>
        <p>The nature of consciousness remains one of the most profound mysteries in science and philosophy. This paper proposes a theoretical framework for understanding consciousness through the lens of neural networks and information processing, drawing parallels between biological neural networks and artificial neural networks.</p>
        
        <h2>Neural Networks and Information Processing</h2>
        <p>This section provides an overview of how neural networks process information, both in biological systems and in artificial intelligence. It examines the structural and functional similarities and differences between these systems.</p>
        
        <h2>Consciousness as an Emergent Property</h2>
        <p>Building on theories of emergence, this section proposes that consciousness may be understood as an emergent property of complex neural networks. It explores how specific patterns of information processing might give rise to subjective experience.</p>
        
        <h2>Integrated Information Theory</h2>
        <p>This section examines Integrated Information Theory (IIT) as a potential mathematical framework for understanding consciousness. It discusses how IIT quantifies the amount of integrated information in a system and how this might relate to the level of consciousness.</p>
        
        <h2>Implications for Artificial Intelligence</h2>
        <p>If consciousness is indeed an emergent property of certain types of information processing, this has profound implications for the development of artificial intelligence. This section explores these implications, including the possibility of machine consciousness and the ethical considerations this would entail.</p>
        
        <h2>Experimental Approaches</h2>
        <p>This section proposes experimental approaches for testing the theoretical framework presented in this paper, including both neuroscientific studies of biological consciousness and computational studies of artificial systems.</p>
        
        <h2>Conclusion</h2>
        <p>While the nature of consciousness remains a profound mystery, approaching it through the lens of neural networks and information processing offers promising avenues for investigation. This interdisciplinary approach, combining insights from neuroscience, computer science, and philosophy, may help bridge the gap between physical processes and subjective experience.</p>
      `,
      tags: ["computer science", "consciousness", "neural networks", "artificial intelligence"],
      date: "April 18, 2025",
      likes: 35,
      views: 130
    },
    "5": {
      id: 5,
      title: "Economic Implications of Resource Scarcity",
      author: "David Wilson",
      authorId: 5,
      field: "Economics",
      abstract: "This paper analyzes how resource scarcity affects economic systems and proposes alternative models for sustainable resource allocation.",
      content: `
        <h2>Introduction</h2>
        <p>Resource scarcity is a fundamental concept in economics, referring to the limited availability of resources relative to unlimited wants. This paper analyzes how resource scarcity affects economic systems and proposes alternative models for sustainable resource allocation.</p>
        
        <h2>Traditional Economic Models of Scarcity</h2>
        <p>This section reviews traditional economic models of resource scarcity, including the concepts of supply and demand, price mechanisms, and market equilibrium. It examines how these models explain resource allocation in conditions of scarcity.</p>
        
        <h2>Limitations of Traditional Models</h2>
        <p>Traditional economic models have significant limitations when dealing with certain types of resources, particularly common-pool resources and public goods. This section examines these limitations and their implications for resource management.</p>
        
        <h2>Case Studies of Resource Scarcity</h2>
        <p>This section presents case studies of resource scarcity in various contexts, from water scarcity in arid regions to rare earth minerals in technology production. It analyzes how different economic systems have responded to these challenges.</p>
        
        <h2>Alternative Models for Sustainable Resource Allocation</h2>
        <p>Building on the limitations of traditional models, this section proposes alternative approaches to resource allocation that prioritize sustainability and equity. These include commons-based management systems, circular economy models, and various policy interventions.</p>
        
        <h2>Implementation Strategies</h2>
        <p>This section discusses strategies for implementing the alternative models proposed, considering political, social, and economic factors that may facilitate or hinder implementation.</p>
        
        <h2>Conclusion</h2>
        <p>Resource scarcity presents significant challenges for economic systems, but also opportunities for innovation in resource management. By moving beyond traditional economic models and embracing more sustainable and equitable approaches, we can address the challenges of resource scarcity while promoting human well-being and environmental sustainability.</p>
      `,
      tags: ["economics", "resource scarcity", "sustainability", "resource allocation"],
      date: "April 17, 2025",
      likes: 31,
      views: 125
    }
  };

  // Sample comments data
  const sampleComments = {
    "1": [
      {
        id: 1,
        userId: 2,
        userName: "John Smith",
        userProfilePic: null,
        text: "This is a fascinating exploration of quantum entanglement. I particularly appreciated your discussion of the EPR paradox and its implications.",
        timestamp: "April 21, 2025, 2:30 PM"
      },
      {
        id: 2,
        userId: 3,
        userName: "Alex Johnson",
        userProfilePic: null,
        text: "Have you considered the implications of the Kochen-Specker theorem in this context? I think it could add another dimension to your analysis.",
        timestamp: "April 21, 2025, 3:45 PM"
      },
      {
        id: 3,
        userId: 5,
        userName: "David Wilson",
        userProfilePic: null,
        text: "As someone from a different field, I found this very accessible while still being intellectually stimulating. Great work!",
        timestamp: "April 21, 2025, 5:15 PM"
      }
    ],
    "2": [
      {
        id: 1,
        userId: 1,
        userName: "Jane Doe",
        userProfilePic: null,
        text: "This is a comprehensive overview of cognitive biases. I wonder how these biases interact with emotional states?",
        timestamp: "April 20, 2025, 1:20 PM"
      },
      {
        id: 2,
        userId: 4,
        userName: "Maria Garcia",
        userProfilePic: null,
        text: "I've been implementing some of these debiasing strategies in my AI research. The results have been promising!",
        timestamp: "April 20, 2025, 4:10 PM"
      }
    ],
    "3": [
      {
        id: 1,
        userId: 1,
        userName: "Jane Doe",
        userProfilePic: null,
        text: "The connection you draw between emergence and quantum phenomena is particularly intriguing. I'd love to discuss this further.",
        timestamp: "April 19, 2025, 11:30 AM"
      }
    ],
    "4": [
      {
        id: 1,
        userId: 2,
        userName: "John Smith",
        userProfilePic: null,
        text: "Your application of Integrated Information Theory to artificial neural networks is groundbreaking. Have you considered the implications for machine ethics?",
        timestamp: "April 18, 2025, 10:45 AM"
      },
      {
        id: 2,
        userId: 3,
        userName: "Alex Johnson",
        userProfilePic: null,
        text: "This bridges the gap between philosophy of mind and computer science beautifully. I'm curious about your thoughts on the hard problem of consciousness.",
        timestamp: "April 18, 2025, 2:30 PM"
      }
    ],
    "5": [
      {
        id: 1,
        userId: 4,
        userName: "Maria Garcia",
        userProfilePic: null,
        text: "Your analysis of common-pool resources is spot on. Have you looked into Elinor Ostrom's work on governing the commons?",
        timestamp: "April 17, 2025, 9:20 AM"
      }
    ]
  };

  // Check login status and load theory on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
    };
    
    // Check on mount
    checkLoginStatus();
    
    // Load theory data
    if (theories[id]) {
      setTheory(theories[id]);
    }
    
    // Load comments
    if (sampleComments[id]) {
      setComments(sampleComments[id]);
    }
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    setLoading(true);
    
    // Create new comment
    const userId = localStorage.getItem('userId') || '1';
    const userName = localStorage.getItem('userName') || 'Jane Doe';
    const userProfilePic = localStorage.getItem('userProfilePicture') || null;
    
    const newCommentObj = {
      id: comments.length + 1,
      userId: parseInt(userId),
      userName,
      userProfilePic,
      text: newComment,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    };
    
    // Update comments
    setComments([...comments, newCommentObj]);
    
    // Clear input
    setNewComment('');
    setLoading(false);
  };

  if (!theory) {
    return (
      <main className="min-h-screen">
        <Navbar />
        
        <div className="container mx-auto px-6 py-8">
          <div className="border-2 border-black p-6 bg-white">
            <p>Theory not found.</p>
            <Link href="/browse">
              <Button className="mt-4">Back to Browse</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link href="/browse">
            <Button variant="secondary">← Back to Browse</Button>
          </Link>
        </div>
        
        <article className="border-2 border-black p-6 bg-white mb-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2 typewriter-text">{theory.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm mb-4">
              <Link href={`/profile/${theory.authorId}`} className="font-bold hover:underline mr-4">
                {theory.author}
              </Link>
              <span className="mr-4">{theory.field}</span>
              <span className="mr-4">{theory.date}</span>
              <span className="mr-4">{theory.views} views</span>
              <span>{theory.likes} likes</span>
            </div>
            
            <div className="border-l-4 border-black pl-4 italic mb-6">
              {theory.abstract}
            </div>
          </header>
          
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: theory.content }}></div>
          
          <footer className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {theory.tags.map((tag, index) => (
                <span key={index} className="inline-block border-2 border-black px-2 py-1 text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        </article>
        
        {/* Comments Section */}
        <section className="border-2 border-black bg-white">
          <div className="p-4 border-b-2 border-black">
            <h2 className="text-xl font-bold typewriter-text">Comments ({comments.length})</h2>
          </div>
          
          <div className="p-6">
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-8">
              <Textarea
                label="Add a comment"
                placeholder="Share your thoughts on this theory..."
                rows={3}
                value={newComment}
                onChange={handleCommentChange}
              />
              
              <div className="flex justify-end mt-2">
                <Button type="submit" disabled={!newComment.trim() || loading}>
                  {loading ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </form>
            
            {/* Comments List */}
            <div className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-3">
                        {comment.userProfilePic ? (
                          <img 
                            src={comment.userProfilePic} 
                            alt={comment.userName} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span>{comment.userName.charAt(0)}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <Link href={`/profile/${comment.userId}`} className="font-bold hover:underline">
                            {comment.userName}
                          </Link>
                          <span className="text-sm text-gray-500">{comment.timestamp}</span>
                        </div>
                        
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
