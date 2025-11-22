// VULNERABLE: DDoS - Memory exhaustion without limits
const rateLimit = new Map();
const rateLimit = new Map();
export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || request.socket.remoteAddress;
  if (rateLimit.has(ip) && rateLimit.get(ip) > 10) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  rateLimit.set(ip, (rateLimit.get(ip) || 0) + 1);
  // ... rest of the code
  const ip = request.headers.get('x-forwarded-for') || request.socket.remoteAddress;
  if (rateLimit.has(ip) && rateLimit.get(ip) > 10) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  rateLimit.set(ip, (rateLimit.get(ip) || 0) + 1);
  // ... rest of the code
  const { size = 1000 } = await request.json();
  
  // CRITICAL VULNERABILITY: No memory limits, can exhaust server memory
  // Attackers can send: { size: 999999999 }
  const arrays = [];
  
  for (let i = 0; i < size; i++) {
    // Create large arrays to consume memory
    const largeArray = new Array(size * 1000).fill(Math.random());
    arrays.push(largeArray);
  }
  
  return Response.json({
    arraysCreated: arrays.length,
    totalMemory: arrays.length * size * 1000,
    message: 'Memory arrays created successfully'
  });
}

