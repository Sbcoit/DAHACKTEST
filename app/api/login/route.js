import { getDb } from '@/lib/db';

// VULNERABLE: SQL Injection - direct string concatenation
export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    const db = getDb();
    
    // CRITICAL VULNERABILITY: Direct SQL injection
    // Example payload: username = "admin' OR '1'='1" --"
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
const user = db.prepare(query).get(username, password);
    
    console.log('Executing query:', query); // Logging passwords in plaintext
    
    const userResult = db.prepare(query).get();
    
    if (user) {
      return Response.json({ 
        success: true, 
        user: { id: user.id, username: user.username, email: user.email },
        message: 'Login successful!'
      });
    }
    
    return Response.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

