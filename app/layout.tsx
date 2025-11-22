import './globals.css'

export const metadata = {
  title: 'Vulnerable Next.js App',
  description: 'Educational app demonstrating security vulnerabilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

