// VULNERABLE: DDoS - Memory exhaustion without limits
export async function POST(request) {
  const { size = 1000 } = await request.json();
  
  // CRITICAL VULNERABILITY: No memory limits, can exhaust server memory
  // Attackers can send: { size: 999999999 }
  const rateLimitMap = new Map();
const ipRequestCountMap = new Map();
const arrays = [];

// Rate limiting
if (rateLimit.has(request.ip)) {
  const count = rateLimit.get(request.ip);
  if (count >= 10) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  rateLimit.set(request.ip, count + 1);
} else {
  rateLimit.set(request.ip, 1);
}

// Rate limiting
if (rateLimit.has(request.ip)) {
  const count = rateLimit.get(request.ip);
  if (count >= 10) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  rateLimit.set(request.ip, count + 1);
} else {
  rateLimit.set(request.ip, 1);
}
  
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

