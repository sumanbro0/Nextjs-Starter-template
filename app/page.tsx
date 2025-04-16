"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8 pt-4 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">API Client Documentation</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn how to use our API client with React Query
        </p>
        <SignedIn>
          <Link href={"/dashboard"}>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Go to Dashboard
            </button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </div>

      <div className="grid gap-8">
        <section className="bg-card p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
          <p className="mb-4">
            The <code>client</code> from <code>lib/hono.ts</code> is a typed API
            client for backend requests.
          </p>
          <div className="bg-muted p-4 rounded-md overflow-auto">
            <pre className="text-sm">
              <code>{`import { client } from '@/lib/hono';

// Example: Fetch data from the hello endpoint
const fetchHelloData = async () => {
  const response = await client.api.hello.get();
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return response.json();
};`}</code>
            </pre>
          </div>
        </section>

        <section className="bg-card p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Using with React Query
          </h2>
          <p className="mb-4">
            React Query provides powerful tools for handling server state.
          </p>
          <div className="bg-muted p-4 rounded-md overflow-auto">
            <pre className="text-sm">
              <code>{`import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';

function HelloComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      const response = await client.api.hello.get();
      if (!response.ok) {
        throw new Error('Failed to fetch hello data');
      }
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Hello Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="bg-card p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Mutation Example</h2>
          <p className="mb-4">For POST, PUT, DELETE operations:</p>
          <div className="bg-muted p-4 rounded-md overflow-auto">
            <pre className="text-sm">
              <code>{`import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';

function CreateResourceComponent() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (newData) => {
      const response = await client.api.resource.post({
        json: newData
      });
      
      if (!response.ok) {
        throw new Error('Failed to create resource');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    }
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'New Resource' })}>
      Create Resource
    </button>
  );
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
