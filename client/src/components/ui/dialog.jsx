"use client";

import { cn } from '@/lib/utils';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={() => onOpenChange?.(false)}
    >
      <div
        className="relative w-full max-w-lg rounded-lg bg-background shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ className, children }) => (
  <div className={cn('p-6 space-y-4', className)}>{children}</div>
);

export const DialogHeader = ({ className, children }) => (
  <div className={cn('space-y-1', className)}>{children}</div>
);

export const DialogTitle = ({ className, children }) => (
  <h3 className={cn('text-xl font-semibold leading-none tracking-tight', className)}>
    {children}
  </h3>
);

