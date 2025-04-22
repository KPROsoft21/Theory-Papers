import { NextRequest, NextResponse } from 'next/server';
import { createTheory, getAllTheories, getTheoriesByField, searchTheories } from '@/lib/theories';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const field = searchParams.get('field');
  
  try {
    let theories;
    
    if (query) {
      theories = await searchTheories(query);
    } else if (field) {
      theories = await getTheoriesByField(field);
    } else {
      theories = await getAllTheories();
    }
    
    return NextResponse.json({ theories });
  } catch (error) {
    console.error('Error fetching theories:', error);
    return NextResponse.json({ error: 'Failed to fetch theories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { title, field, abstract, content, tags } = await request.json();
    
    if (!title || !field || !abstract || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const theory = await createTheory(title, field, abstract, content, tags, user.id);
    
    if (!theory) {
      return NextResponse.json({ error: 'Failed to create theory' }, { status: 500 });
    }
    
    return NextResponse.json({ theory });
  } catch (error) {
    console.error('Error creating theory:', error);
    return NextResponse.json({ error: 'Failed to create theory' }, { status: 500 });
  }
}
