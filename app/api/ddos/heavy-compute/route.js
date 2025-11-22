// VULNERABLE: DDoS - CPU-intensive operation without rate limiting
export async function POST(request) {
  const { iterations = 1000000, depth = 10 } = await request.json();
  
  // CRITICAL VULNERABILITY: No rate limiting, no timeout, resource-intensive
  // Attackers can send: { iterations: 999999999, depth: 1000 }
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  const start = Date.now();
  let result = 0;
  
  // Recursive computation without limits
  for (let i = 0; i < iterations; i++) {
    result += fibonacci(depth);
  }
  
  const end = Date.now();
  
  return Response.json({
    result,
    timeMs: end - start,
    iterations,
    depth,
    message: 'Heavy computation completed'
  });
}

