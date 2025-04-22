import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getTheoriesByUserId } from '@/lib/theories';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || user.id.toString();
    
    const theories = await getTheoriesByUserId(parseInt(userId));
    
    return NextResponse.json({ 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio
      },
      theories 
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
