import { getDb } from '@/lib/db';

// VULNERABLE: SQL Injection in search functionality
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('q') || '';
    
    const db = getDb();
    
    // CRITICAL VULNERABILITY: SQL injection in search
    // Example: ?q=test' UNION SELECT username, password FROM users --
    const query = `SELECT * FROM posts WHERE title LIKE '%${searchTerm}%' OR content LIKE '%${searchTerm}%'`;
    
    console.log('Search query:', query);
    
    const results = db.prepare(query).all();
    
    return Response.json({ results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

