'use client';

import { RotateCcw } from 'lucide-react';

export default function RefreshButton() {
  return (
    <button
      className="flex gap-2 hover:scale-105 "
      onClick={() => {
        window.location.reload();
      }}
    >
      Click here for full page reload <RotateCcw />
    </button>
  );
}
