'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>SQL Injection - Login</h1>
      <Link href="/">← Back to Home</Link>

      <div className="section">
        <h2>Vulnerable Login Form</h2>
        <p><strong>Vulnerability:</strong> Direct SQL string concatenation without parameterization</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin' OR '1'='1' --"
            />
          </div>
          
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="anything"
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {result && (
          <div className={`result ${result.success ? '' : 'error'}`}>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}

        <div style={{ marginTop: '20px', padding: '15px', background: '#e7f3ff', borderRadius: '6px' }}>
          <strong>Try these payloads:</strong>
          <pre style={{ background: 'white', marginTop: '10px' }}>
{`Username: admin' OR '1'='1' --
Password: anything

Username: ' OR '1'='1
Password: ' OR '1'='1

Username: admin'--
Password: (leave empty)`}
          </pre>
        </div>
      </div>
    </div>
  );
}

