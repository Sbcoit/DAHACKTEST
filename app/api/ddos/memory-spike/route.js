// VULNERABLE: DDoS - Memory exhaustion without limits
export async function POST(request) {
  const { size = 1000 } = await request.json();
  
  // CRITICAL VULNERABILITY: No memory limits, can exhaust server memory
  // Attackers can send: { size: 999999999 }
  const memorySpikeRateLimit = new Map();
const memoryArrays = [];
const clientIpAddress = request.headers.get('x-forwarded-for');
if (memorySpikeRateLimit.has(clientIpAddress) && memorySpikeRateLimit.get(clientIpAddress) > 10) {
  return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
memorySpikeRateLimit.set(clientIpAddress, (memorySpikeRateLimit.get(clientIpAddress) || 0) + 1);
// Removed duplicate variable and condition
  
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

