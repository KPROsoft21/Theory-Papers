import { NextRequest, NextResponse } from 'next/server';
import { sendMessage, getConversation, getUserConversations, markMessagesAsRead } from '@/lib/social';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const otherUserId = searchParams.get('userId');
    
    if (otherUserId) {
      // Get conversation with specific user
      const messages = await getConversation(user.id, parseInt(otherUserId));
      
      // Mark messages as read
      await markMessagesAsRead(parseInt(otherUserId), user.id);
      
      return NextResponse.json({ messages });
    } else {
      // Get all conversations
      const conversations = await getUserConversations(user.id);
      return NextResponse.json({ conversations });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { recipientId, content } = await request.json();
    
    if (!recipientId || !content) {
      return NextResponse.json({ error: 'Recipient ID and content are required' }, { status: 400 });
    }
    
    const message = await sendMessage(user.id, recipientId, content);
    
    if (!message) {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
    
    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
