# Next.js Starter Template

This project is a starter template using the following technologies:

- [Next.js](https://nextjs.org) - React framework for building web applications
- [Hono.js](https://hono.dev) - Lightweight, ultrafast web framework
- [Prisma](https://prisma.io) - Next-generation ORM with SQLite database
- [Clerk](https://clerk.dev) - Authentication and user management
- [pnpm](https://pnpm.io) - Fast, disk space efficient package manager

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm

### Installation

1. Clone this repository:

```bash
git clone <your-repo-url>
cd template
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables:

Create a `.env` file in the root directory with the following variables:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Prisma
DATABASE_URL="file:./dev.db"

# Hono
NEXT_PUBLIC_BASE_URL="http://localhost:3000/api"
```

4. Initialize the Prisma SQLite database:

```bash
npx prisma migrate dev --name init
```

5. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components, including UI components
- `lib/` - Utility functions and configuration files
- `prisma/` - Prisma schema and generated clients
- `public/` - Static assets
- `hooks/` - Custom React hooks

## Features

- **Next.js App Router**: Modern routing system with React Server Components
- **Hono.js API Routes**: Fast API routes with Next.js Edge runtime
- **HonoRPC Client**: Type-safe API client for frontend-backend communication
- **Prisma with SQLite**: Type-safe database access with SQLite (easy to switch to another database)
- **Clerk Authentication**: Complete auth system with social login support
- **Responsive Design**: Mobile-first layout that adapts to different screen sizes

## Using HonoRPC

This template provides a pre-configured HonoRPC setup with a client ready for use in your frontend components. The client is exported from `lib/hono.ts`.

### Example API Route Setup

```typescript
// app/api/[[...route]]/route.ts
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

// Define your API endpoints
app.get('/hello', (c) => {
  return c.json({ message: 'Hello, world!' });
});

app.post('/users', async (c) => {
  const data = await c.req.json();
  // Process data with Prisma or other services
  return c.json({ id: 1, ...data });
});

// Export the type for HonoRPC client
export type AppType = typeof app;

// Export the handler for Vercel
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
```

### Using the HonoRPC Client

```typescript
// Example component
import { client } from '@/lib/hono';
import { useEffect, useState } from 'react';

export default function HelloComponent() {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      // Type-safe API call
      const response = await client.hello.$get();
      setMessage(response.message);
    };
    
    fetchData();
  }, []);
  
  const createUser = async () => {
    // Type-safe POST request
    const result = await client.users.$post({
      json: { name: 'John Doe', email: 'john@example.com' }
    });
    console.log(result);
  };
  
  return (
    <div>
      <p>Message from API: {message}</p>
      <button onClick={createUser}>Create User</button>
    </div>
  );
}
```

## Customizing the Template

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about the technologies used in this template, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Hono.js Documentation](https://hono.dev)
- [HonoRPC Documentation](https://hono.dev/guides/rpc)
- [Prisma Documentation](https://prisma.io/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [pnpm Documentation](https://pnpm.io/motivation)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

For alternative deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
