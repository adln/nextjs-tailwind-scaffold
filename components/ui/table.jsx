import * as React from 'react';

import { cn } from '@/lib/utils';
import { Router, useRouter } from 'next/router';

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef(
  ({ className, column, children, ...props }, ref) => {
    const router = useRouter();
    const { query } = router;
    const currentSort = query.sort || '';
    const currentOrder = query.order || 'asc';
    const handleSort = () => {
      // If no "column" attribute is provided, do not sort
      if (!column) return;
  
      let newOrder = 'asc';
  
      // Toggle sorting order if the column is already sorted
      if (currentSort === column && currentOrder === 'asc') {
        newOrder = 'desc';
      } else if (currentSort === column && currentOrder === 'desc') {
        newOrder = 'asc'; // Keep toggling between asc and desc
      }
  
      // Update the query to reflect new sort and order
      router.push({
        pathname: router.pathname,
        query: {
          ...query,
          sort: column,
          order: newOrder,
        },
      });
    };
  
    return (
      <th
        ref={ref}
        className={cn(
          'cursor-pointer h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
          className
        )}
        onClick={handleSort}
        {...props}
      >
        {children}{' '}
        {/* Display sort arrows only for the sorted column */}
        {currentSort === column && (currentOrder === 'asc' ? '▲' : '▼')}
      </th>
    );
  }
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
