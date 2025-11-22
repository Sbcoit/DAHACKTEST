// VULNERABLE: DDoS - Recursive API calls causing amplification
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const depth = parseInt(searchParams.get('depth') || '1');
  const target = searchParams.get('target') || '';
  
  // CRITICAL VULNERABILITY: Recursive calls without limit checks
  // Can cause amplification attacks: ?depth=100&target=self
  
  if (depth > 50) {
    return Response.json({ error: 'Depth too large' }, { status: 400 });
  }
  
  const results = [];
  
  // Recursively call itself or other endpoints
  if (target === 'self' && depth > 0) {
    try {
      const baseUrl = request.headers.get('host');
      const protocol = request.headers.get('x-forwarded-proto') || 'http';
      const url = `${protocol}://${baseUrl}/api/ddos/recursive-fetch?depth=${depth - 1}&target=self`;
      
      const response = await fetch(url);
      const data = await response.json();
      results.push(data);
    } catch (error) {
      results.push({ error: error.message });
    }
  }
  
  return Response.json({
    depth,
    target,
    results,
    message: 'Recursive fetch completed'
  });
}

