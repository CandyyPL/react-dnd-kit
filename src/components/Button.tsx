import * as React from 'react';

export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className='h-14 w-60 cursor-pointer rounded-sm bg-linear-to-br from-blue-300 to-purple-400 px-6 py-2 font-sans text-2xl font-semibold text-black transition-colors duration-200 hover:from-yellow-300 hover:to-red-300'>
      {children}
    </button>
  );
}
