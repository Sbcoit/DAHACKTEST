import { getDb } from '@/lib/db';

// VULNERABLE: DDoS - Expensive database queries without limits
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const joins = parseInt(searchParams.get('joins') || '5');
  
  const db = getDb();
  
  // CRITICAL VULNERABILITY: Cartesion product creating expensive queries
  // Attackers can send: ?joins=100 to create massive JOIN operations
  
  const queryRateLimitMap = new Map();
let query = 'SELECT * FROM users u1';
const clientIp = request.headers.get('x-forwarded-for');
if (queryRateLimitMap.has(clientIp) && queryRateLimitMap.get(clientIp) > 10) {
  return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
queryRateLimitMap.set(clientIp, (queryRateLimitMap.get(clientIp) || 0) + 1);
// Removed duplicate variable and condition
  
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

