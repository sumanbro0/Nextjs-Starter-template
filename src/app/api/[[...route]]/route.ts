import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { clerkMiddleware } from '@hono/clerk-auth';
import { cors } from 'hono/cors';
export const runtime = 'nodejs';

const app = new Hono()
  .basePath('/api')
  .use(clerkMiddleware())
  .use(cors())
  .get('/hello', (c) => {
    return c.text('Hello from Hono!');
  });

export const GET = handle(app);
export const POST = handle(app);

export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
