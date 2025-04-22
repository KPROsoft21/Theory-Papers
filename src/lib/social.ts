import { fetchAll, fetchOne, executeQuery } from './db';
import { User } from './auth';

// Follow types
export interface Follow {
  follower_id: number;
  following_id: number;
  created_at: string;
}

// Message types
export interface Message {
  id: number;
  sender_id: number;
  recipient_id: number;
  content: string;
  created_at: string;
  read: boolean;
  sender_name?: string;
}

// Follow functions
export async function followUser(followerId: number, followingId: number): Promise<boolean> {
  try {
    const result = await executeQuery(
      'INSERT INTO follows (follower_id, following_id) VALUES (?, ?)',
      [followerId, followingId]
    );
    return result && result.success;
  } catch (error) {
    console.error('Error following user:', error);
    return false;
  }
}

export async function unfollowUser(followerId: number, followingId: number): Promise<boolean> {
  try {
    const result = await executeQuery(
      'DELETE FROM follows WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );
    return result && result.success;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return false;
  }
}

export async function isFollowing(followerId: number, followingId: number): Promise<boolean> {
  try {
    const follow = await fetchOne(
      'SELECT * FROM follows WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );
    return !!follow;
  } catch (error) {
    console.error('Error checking follow status:', error);
    return false;
  }
}

export async function getFollowers(userId: number): Promise<User[]> {
  try {
    return await fetchAll(`
      SELECT u.id, u.name, u.email, u.bio, u.created_at, u.updated_at
      FROM follows f
      JOIN users u ON f.follower_id = u.id
      WHERE f.following_id = ?
    `, [userId]);
  } catch (error) {
    console.error('Error getting followers:', error);
    return [];
  }
}

export async function getFollowing(userId: number): Promise<User[]> {
  try {
    return await fetchAll(`
      SELECT u.id, u.name, u.email, u.bio, u.created_at, u.updated_at
      FROM follows f
      JOIN users u ON f.following_id = u.id
      WHERE f.follower_id = ?
    `, [userId]);
  } catch (error) {
    console.error('Error getting following:', error);
    return [];
  }
}

// Message functions
export async function sendMessage(senderId: number, recipientId: number, content: string): Promise<Message | null> {
  try {
    const result = await executeQuery(
      'INSERT INTO messages (sender_id, recipient_id, content) VALUES (?, ?, ?) RETURNING *',
      [senderId, recipientId, content]
    );
    
    if (result && result.success) {
      return result.results[0];
    }
    return null;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
}

export async function getConversation(user1Id: number, user2Id: number): Promise<Message[]> {
  try {
    return await fetchAll(`
      SELECT m.*, u.name as sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE (m.sender_id = ? AND m.recipient_id = ?) OR (m.sender_id = ? AND m.recipient_id = ?)
      ORDER BY m.created_at ASC
    `, [user1Id, user2Id, user2Id, user1Id]);
  } catch (error) {
    console.error('Error getting conversation:', error);
    return [];
  }
}

export async function getUserConversations(userId: number): Promise<{userId: number, name: string, lastMessage: string, timestamp: string}[]> {
  try {
    return await fetchAll(`
      WITH last_messages AS (
        SELECT 
          CASE 
            WHEN sender_id = ? THEN recipient_id 
            ELSE sender_id 
          END as other_user_id,
          content,
          created_at,
          ROW_NUMBER() OVER (
            PARTITION BY 
              CASE 
                WHEN sender_id = ? THEN recipient_id 
                ELSE sender_id 
              END 
            ORDER BY created_at DESC
          ) as rn
        FROM messages
        WHERE sender_id = ? OR recipient_id = ?
      )
      SELECT lm.other_user_id as userId, u.name, lm.content as lastMessage, lm.created_at as timestamp
      FROM last_messages lm
      JOIN users u ON lm.other_user_id = u.id
      WHERE lm.rn = 1
      ORDER BY lm.created_at DESC
    `, [userId, userId, userId, userId]);
  } catch (error) {
    console.error('Error getting user conversations:', error);
    return [];
  }
}

export async function markMessagesAsRead(senderId: number, recipientId: number): Promise<boolean> {
  try {
    const result = await executeQuery(
      'UPDATE messages SET read = TRUE WHERE sender_id = ? AND recipient_id = ? AND read = FALSE',
      [senderId, recipientId]
    );
    return result && result.success;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return false;
  }
}
