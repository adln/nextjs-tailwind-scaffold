import { LoaderPinwheel } from 'lucide-react';
import React from 'react';

export default function Loading() {
  return (
    <div className="bg-secondary w-screen h-screen items-center justify-center flex flex-col">
      <div className="animate-pulse">
        <LoaderPinwheel className="motion-safe:animate-spin size-20" />
      </div>
      <h1 className="text-xl">Chargement...</h1>
    </div>
  );
}
