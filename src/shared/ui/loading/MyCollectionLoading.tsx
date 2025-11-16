import React from 'react';

export default function MyCollectionLoading() {
  return (
    <div className="w-full p-[1.6rem] justify-center items-center flex flex-col gap-[2rem] h-dvh">
      {/* TODO: 스피터 아이콘 추가 */}
      <></>
      <div className="flex flex-col gap-[0.8rem] justify-center items-center">
        <p className="text-[1.8rem] font-bold">관심 뉴스를 불러오고 있는 중입니다.</p>
        <p className="text-[1.4rem] font-normal">잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
}
