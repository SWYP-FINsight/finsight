'use client';

import FolderFilledIcon from '@/assets/icons/folder-fill.svg';
import FolderOutlineIcon from '@/assets/icons/folder-outline.svg';
import HomeFilledIcon from '@/assets/icons/home-fill.svg';
import HomeOutlineIcon from '@/assets/icons/home.svg';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/',
    text: '홈',
    icon: HomeOutlineIcon,
    activeIcon: HomeFilledIcon,
  },
  {
    href: '/my-collection',
    text: '마이컬렉션',
    icon: FolderOutlineIcon,
    activeIcon: FolderFilledIcon,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed bottom-0 z-40 left-1/2 -translate-x-1/2 w-[37.5rem]
        flex h-[8rem] items-center justify-center
        pointer-events-none"
    >
      <div
        className="
          flex h-full w-full max-w-[37.5rem] items-center justify-around
          bg-gray-100
          rounded-t-[0.8rem]
          shadow-[8px_0_20px_0_rgba(0,0,0,0.30)]
          pointer-events-auto"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col w-[5.2rem] h-[5.2rem] items-center justify-center shrink-0"
            >
              {isActive ? (
                <item.activeIcon className="w-[2rem] h-[2rem]" />
              ) : (
                <item.icon className="w-[2rem] h-[2rem]" />
              )}
              <span
                className={cn('text-[1rem]', isActive ? 'text-gray-900 font-medium' : 'text-gray-500 font-regular')}
              >
                {item.text}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
