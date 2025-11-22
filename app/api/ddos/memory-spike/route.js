// VULNERABLE: DDoS - Memory exhaustion without limits
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
export async function POST(request) {
  await limiter(request, response, () => {
    // existing code
  });
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

