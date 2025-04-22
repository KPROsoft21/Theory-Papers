import { fetchAll, fetchOne, executeQuery } from './db';

// Theory types
export interface Theory {
  id: number;
  title: string;
  field: string;
  abstract: string;
  content: string;
  tags?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  author_name?: string;
}

// Theory functions
export async function getAllTheories(): Promise<Theory[]> {
  try {
    return await fetchAll(`
      SELECT t.*, u.name as author_name 
      FROM theories t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
    `);
  } catch (error) {
    console.error('Error getting theories:', error);
    return [];
  }
}

export async function getTheoryById(id: number): Promise<Theory | null> {
  try {
    return await fetchOne(`
      SELECT t.*, u.name as author_name 
      FROM theories t
      JOIN users u ON t.user_id = u.id
      WHERE t.id = ?
    `, [id]);
  } catch (error) {
    console.error('Error getting theory:', error);
    return null;
  }
}

export async function getTheoriesByUserId(userId: number): Promise<Theory[]> {
  try {
    return await fetchAll(`
      SELECT t.*, u.name as author_name 
      FROM theories t
      JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ?
      ORDER BY t.created_at DESC
    `, [userId]);
  } catch (error) {
    console.error('Error getting user theories:', error);
    return [];
  }
}

export async function createTheory(
  title: string,
  field: string,
  abstract: string,
  content: string,
  tags: string | null,
  userId: number
): Promise<Theory | null> {
  try {
    const result = await executeQuery(
      `INSERT INTO theories (title, field, abstract, content, tags, user_id) 
       VALUES (?, ?, ?, ?, ?, ?) 
       RETURNING *`,
      [title, field, abstract, content, tags, userId]
    );
    
    if (result && result.success) {
      return result.results[0];
    }
    return null;
  } catch (error) {
    console.error('Error creating theory:', error);
    return null;
  }
}

export async function updateTheory(
  id: number,
  title: string,
  field: string,
  abstract: string,
  content: string,
  tags: string | null
): Promise<Theory | null> {
  try {
    const result = await executeQuery(
      `UPDATE theories 
       SET title = ?, field = ?, abstract = ?, content = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?
       RETURNING *`,
      [title, field, abstract, content, tags, id]
    );
    
    if (result && result.success) {
      return result.results[0];
    }
    return null;
  } catch (error) {
    console.error('Error updating theory:', error);
    return null;
  }
}

export async function deleteTheory(id: number): Promise<boolean> {
  try {
    const result = await executeQuery('DELETE FROM theories WHERE id = ?', [id]);
    return result && result.success;
  } catch (error) {
    console.error('Error deleting theory:', error);
    return false;
  }
}

export async function searchTheories(query: string): Promise<Theory[]> {
  try {
    return await fetchAll(`
      SELECT t.*, u.name as author_name 
      FROM theories t
      JOIN users u ON t.user_id = u.id
      WHERE t.title LIKE ? OR t.abstract LIKE ? OR t.content LIKE ? OR t.tags LIKE ? OR u.name LIKE ? OR t.field LIKE ?
      ORDER BY t.created_at DESC
    `, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);
  } catch (error) {
    console.error('Error searching theories:', error);
    return [];
  }
}

export async function getTheoriesByField(field: string): Promise<Theory[]> {
  try {
    return await fetchAll(`
      SELECT t.*, u.name as author_name 
      FROM theories t
      JOIN users u ON t.user_id = u.id
      WHERE t.field = ?
      ORDER BY t.created_at DESC
    `, [field]);
  } catch (error) {
    console.error('Error getting theories by field:', error);
    return [];
  }
}
