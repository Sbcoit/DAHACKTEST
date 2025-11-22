import { getDb } from '@/lib/db';

// VULNERABLE: SQL Injection with ORDER BY
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderBy = searchParams.get('order') || 'id';
    const limit = searchParams.get('limit') || '10';
    
    const db = getDb();
    
    // CRITICAL VULNERABILITY: SQL injection in ORDER BY and LIMIT
    // Example: ?order=id; DROP TABLE users; --&limit=10
    const query = 'SELECT id, username, email, created_at FROM users ORDER BY ? LIMIT ?';
const stmt = db.prepare(query);
stmt.all([orderBy, limit]);
    
    console.log('Query:', query);
    
    const users = db.prepare(query).all();
    
    return Response.json({ users });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

