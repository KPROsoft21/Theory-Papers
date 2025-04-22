import { executeQuery, fetchAll, fetchOne } from './db';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface UserWithPassword extends User {
  password_hash: string;
}

// Auth functions
export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  try {
    // Simple password storage for demo purposes
    // In a real app, we would use bcrypt to hash the password
    const password_hash = `simple_hash_${password}`;
    
    // Insert the user
    const result = await executeQuery(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?) RETURNING *',
      [name, email, password_hash]
    );
    
    if (result && result.success) {
      const user = result.results[0];
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        created_at: user.created_at,
        updated_at: user.updated_at
      };
    }
    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const user = await fetchOne('SELECT * FROM users WHERE email = ?', [email]) as UserWithPassword | null;
    
    if (!user) {
      return null;
    }
    
    // Simple password check for demo purposes
    // In a real app, we would use bcrypt.compare
    const isMatch = user.password_hash === `simple_hash_${password}`;
    
    if (!isMatch) {
      return null;
    }
    
    // Don't return the password hash
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

export async function createSession(userId: number): Promise<string> {
  const sessionId = uuidv4();
  const cookieStore = cookies();
  
  // In a real app, you would store the session in the database
  // For simplicity, we're just using a cookie
  cookieStore.set('session_id', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
  
  cookieStore.set('user_id', userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
  
  return sessionId;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const userId = cookieStore.get('user_id')?.value;
  
  if (!userId) {
    return null;
  }
  
  try {
    return await fetchOne('SELECT id, name, email, bio, created_at, updated_at FROM users WHERE id = ?', [userId]) as User | null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete('session_id');
  cookieStore.delete('user_id');
}
