import React from 'react';

function StatusPoint({ status }: { status: boolean }) {
  return (
    <div
      className={`${
        status ? 'bg-emerald-600' : 'bg-red-700'
      } h-4 w-4 rounded-full`}
    />
  );
}

export default StatusPoint;
