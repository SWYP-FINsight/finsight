import BottomNavigation from '@/shared/widgets/navigation/BottomNavigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
}
