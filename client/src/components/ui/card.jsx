import { cn } from '@/lib/utils';

export const Card = ({ className, children, ...props }) => (
  <div
    className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={cn('p-6 pb-0', className)}>{children}</div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
    {children}
  </h3>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn('p-6 pt-4', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children }) => (
  <div className={cn('p-6 pt-0 flex items-center', className)}>{children}</div>
);

