'use client';

import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import { ICollections } from '@/features/my-collection/types';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: ICollections;
}

export default function Collection({ data, ...rest }: Props) {
  if (!data) return;

  return (
    <div className="flex flex-col px-[1.6rem] py-[2.0rem] border-b-1 border-[#E1E2E5] cursor-pointer" {...rest}>
      <div className="flex justify-between items-center">
        <p className="text-[1.4rem] font-bold">{data?.collectionName ?? ''}</p>

        <ArrowRightIcon width={8} height={16} />
      </div>
    </div>
  );
}
