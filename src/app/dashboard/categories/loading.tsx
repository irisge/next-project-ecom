import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='flex w-full space-y-4'>
      <Skeleton className='h-20 w-[20] rounded-lg' />
      <Skeleton className='h-20 w-[20] rounded-lg' />
      <Skeleton className='h-20 w-[20] rounded-lg' />
      <Skeleton className='h-20 w-[20] rounded-lg' />
    </div>
  );
}
