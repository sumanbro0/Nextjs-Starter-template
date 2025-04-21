import { AppType } from '@/v1/app/api/[[...route]]/route';
import { hc } from 'hono/client';

export const client = hc<AppType>(process.env.NEXT_PUBLIC_BASE_URL as string);
