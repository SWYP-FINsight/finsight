'use client';

import { useArticleFilters } from '../hooks';
import DropDown from './DropDown';
import React, { useEffect, useState } from 'react';

interface DateOption {
  label: string;
  key: string;
}
const dateOptions: DateOption[] = [
  { label: '일간', key: 'day' },
  { label: '주간', key: 'week' },
  { label: '월간', key: 'month' },
];

export default function DateFilter() {
  const { period, updateFilters } = useArticleFilters();
  const [label, setLabel] = useState(dateOptions[0].label);

  const handleChange = (value: DateOption) => {
    updateFilters({ period: value.key });
  };

  useEffect(() => {
    setLabel(dateOptions.find((option) => option.key === period)?.label || dateOptions[0].label);
  }, [period]);

  return (
    <div className="w-full px-[1.6rem]">
      <DropDown<DateOption>
        items={dateOptions}
        label={label}
        onChange={handleChange}
        itemToKey={(item) => item.key}
        itemToLabel={(item) => item.label}
      />
    </div>
  );
}
