import React from 'react';

/**
 * FINsight Figma 디자인 기반 커스텀 스피너
 * https://www.figma.com/design/BgvcK2DcP4PbwGD8Ek4SKr/FINsight?node-id=878-10021&m=dev
 */
export default function Spinner({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <circle cx="16" cy="16" r="14" stroke="#1D7EF8" strokeWidth="4" opacity="0.2" />
        <path d="M16 2a14 14 0 0 1 14 14" stroke="#1D7EF8" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
