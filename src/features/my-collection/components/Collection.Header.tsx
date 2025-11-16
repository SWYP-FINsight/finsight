'use client';

import TextButton from '@/shared/ui/button/TextButton';

interface Props {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: Props) {
  return (
    <header className="flex w-full p-[1.6rem] justify-between items-center">
      <p className="text-[2rem] font-bold">마이 컬렉션</p>
      {isLoggedIn ? <TextButton text={'추가'} /> : null}
    </header>
  );
}
