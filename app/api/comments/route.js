import { getDb } from '@/lib/db';

// VULNERABLE: SQL Injection in INSERT statements
export async function POST(request) {
  try {
    const { post_id, user_id, comment } = await request.json();
    
    const db = getDb();
    
    // CRITICAL VULNERABILITY: SQL injection in INSERT
    // Example payload: { post_id: "1", user_id: "1", comment: "test'); DROP TABLE posts; --" }
    const query = 'INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)';
const stmt = db.prepare(query);
stmt.run([post_id, user_id, comment]);
    
    console.log('Insert query:', query);
    
    const result = db.prepare(query).run();
    
    return Response.json({ 
      success: true, 
      id: result.lastInsertRowid,
      message: 'Comment added successfully'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

