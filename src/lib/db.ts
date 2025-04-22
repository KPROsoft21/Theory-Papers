import { D1Database } from '@cloudflare/workers-types';

export interface CloudflareContext {
  DB: D1Database;
}

export function getCloudflareContext(): CloudflareContext | null {
  // @ts-ignore
  if (typeof globalThis.__CLOUDFLARE__ !== 'undefined') {
    // @ts-ignore
    return globalThis.__CLOUDFLARE__;
  }
  return null;
}

export async function executeQuery(query: string, params: any[] = []): Promise<any> {
  const ctx = getCloudflareContext();
  if (!ctx) {
    console.error('Cloudflare context not available');
    return null;
  }
  
  try {
    const result = await ctx.DB.prepare(query).bind(...params).run();
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function fetchAll(query: string, params: any[] = []): Promise<any[]> {
  const ctx = getCloudflareContext();
  if (!ctx) {
    console.error('Cloudflare context not available');
    return [];
  }
  
  try {
    const result = await ctx.DB.prepare(query).bind(...params).all();
    return result.results || [];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function fetchOne(query: string, params: any[] = []): Promise<any> {
  const ctx = getCloudflareContext();
  if (!ctx) {
    console.error('Cloudflare context not available');
    return null;
  }
  
  try {
    const result = await ctx.DB.prepare(query).bind(...params).first();
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
