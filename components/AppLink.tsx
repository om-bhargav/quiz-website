'use client';

import Link from 'next/link';
import { useLoader } from './LoaderProvider';

export default function AppLink({ children, ...props }: React.ComponentProps<typeof Link> & { children: React.ReactNode, className?: string }) {
  const { setIsLoading } = useLoader();

  return (
    <Link {...props} onClick={() => setIsLoading(true)}>
      {children}
    </Link>
  );
}