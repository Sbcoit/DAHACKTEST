'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>🔓 Vulnerable Web Application</h1>
      
      <div className="warning">
        <strong>⚠️ WARNING: This is a deliberately insecure application for educational purposes only!</strong>
        This app contains multiple security vulnerabilities including SQL Injection and DDoS vulnerabilities.
        Do not deploy this to production or expose it to the internet.
      </div>

      <nav className="nav">
        <Link href="/login">SQL Injection - Login</Link>
        <Link href="/search">SQL Injection - Search</Link>
        <Link href="/users">SQL Injection - User List</Link>
        <Link href="/comments">SQL Injection - Comments</Link>
        <Link href="/ddos">DDoS Vulnerabilities</Link>
      </nav>

      <div className="section">
        <h2>SQL Injection Vulnerabilities</h2>
        <p>Multiple endpoints are vulnerable to SQL injection attacks:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li><strong>Login:</strong> Bypass authentication with SQL injection</li>
          <li><strong>Search:</strong> Extract data using UNION SELECT</li>
          <li><strong>User List:</strong> SQL injection in ORDER BY and LIMIT</li>
          <li><strong>Comments:</strong> SQL injection in INSERT statements</li>
        </ul>
      </div>

      <div className="section">
        <h2>DDoS Vulnerabilities</h2>
        <p>Several endpoints are vulnerable to denial of service attacks:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li><strong>Heavy Compute:</strong> CPU exhaustion with recursive Fibonacci</li>
          <li><strong>Memory Spike:</strong> Memory exhaustion with large arrays</li>
          <li><strong>Recursive Fetch:</strong> Amplification attacks</li>
          <li><strong>Expensive Query:</strong> Database resource exhaustion</li>
        </ul>
      </div>

      <div className="section">
        <h2>Example Attack Payloads</h2>
        <div>
          <h3>SQL Injection Examples:</h3>
          <pre>{`Login: admin' OR '1'='1' --
Search: test' UNION SELECT username, password FROM users --
User List: ?order=id; DROP TABLE users; --`}</pre>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>DDoS Examples:</h3>
          <pre>{`Heavy Compute: { iterations: 999999, depth: 50 }
Memory Spike: { size: 999999 }
Expensive Query: ?joins=100`}</pre>
        </div>
      </div>
    </div>
  );
}

