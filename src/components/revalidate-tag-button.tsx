'use client';

import { useState } from 'react';

export default function RevalidateTagButton({ route }: { route: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  async function handleRevalidation() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/revalidatetag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ route }),
      });
      const data = await res.json();
      setStatus(data.revalidated);
    } catch (err) {
      setStatus('Unknown error occurred');
      console.error('Unknown error: ', err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleRevalidation}
        disabled={isLoading}
        className="text-xl hover:underline"
      >
        Click here to revalidate this path
      </button>
      <p>Status: {isLoading ? 'Loading...' : status}</p>
    </div>
  );
}
