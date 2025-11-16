'use client';
import TextButton from '@/shared/ui/button/TextButton';

export default function Header() {
  return (
    <header className="flex w-full p-[1.6rem] justify-between items-center">
      <p className="text-[2rem] font-bold">마이 컬렉션</p>
      <TextButton text={'추가'} />
    </header>
  );
}
