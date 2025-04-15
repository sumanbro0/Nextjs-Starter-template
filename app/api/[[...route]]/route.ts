import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { clerkMiddleware } from "@hono/clerk-auth"
export const runtime = 'nodejs'


const app = new Hono().basePath('/api')
    .use(clerkMiddleware())
    .get('/api', (c) => {
        return c.text('Hello from Hono!')
    })


export const GET = handle(app)
export const POST = handle(app)

export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof app