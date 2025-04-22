import { NextRequest, NextResponse } from 'next/server';
import { followUser, unfollowUser, isFollowing, getFollowers, getFollowing } from '@/lib/social';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'following'; // 'following' or 'followers'
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    let users;
    if (type === 'followers') {
      users = await getFollowers(parseInt(userId));
    } else {
      users = await getFollowing(parseInt(userId));
    }
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching follows:', error);
    return NextResponse.json({ error: 'Failed to fetch follows' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { followingId } = await request.json();
    
    if (!followingId) {
      return NextResponse.json({ error: 'Following ID is required' }, { status: 400 });
    }
    
    const success = await followUser(user.id, followingId);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to follow user' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error following user:', error);
    return NextResponse.json({ error: 'Failed to follow user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const followingId = searchParams.get('followingId');
    
    if (!followingId) {
      return NextResponse.json({ error: 'Following ID is required' }, { status: 400 });
    }
    
    const success = await unfollowUser(user.id, parseInt(followingId));
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to unfollow user' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return NextResponse.json({ error: 'Failed to unfollow user' }, { status: 500 });
  }
}
