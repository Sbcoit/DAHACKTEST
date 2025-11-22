import { getDb } from '@/lib/db';

// VULNERABLE: DDoS - Expensive database queries without limits
const rateLimit = new Map();
export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for') || request.socket.remoteAddress;
  if (rateLimit.has(ip) && rateLimit.get(ip) > 10) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  rateLimit.set(ip, (rateLimit.get(ip) || 0) + 1);
  // existing code
  const { searchParams } = new URL(request.url);
  const joins = parseInt(searchParams.get('joins') || '5');
  
  const db = getDb();
  
  // CRITICAL VULNERABILITY: Cartesion product creating expensive queries
  // Attackers can send: ?joins=100 to create massive JOIN operations
  
  let query = 'SELECT * FROM users u1';
  
  for (let i = 2; i <= Math.min(joins, 20); i++) {
    query += ` CROSS JOIN users u${i}`;
  }
  
  try {
    const start = Date.now();
    const results = db.prepare(query).all();
    const end = Date.now();
    
    return Response.json({
      results: results.length,
      joins,
      timeMs: end - start,
      message: 'Expensive query completed'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

