import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)', 'sans-serif'],
      },
      fontSize: {
        10: '1rem',    // 10px
        12: '1.2rem',  // 12px
        14: '1.4rem',  // 14px
        18: '1.8rem',  // 18px
        20: '2rem',    // 20px
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        120: '1.2',
        130: '1.3',
        140: '1.4',
        150: '1.5',
      },
      colors: {
        brand600: '#2E4E7E',
        brand500: '#1D7EF8',
        brand400: '#3DA5FA',
        brand300: '#8EC9FC',
        brand200: '#BBDDFD',
        brand100: '#E3F0FE',
        gray900: '#353841',
        gray700: '#4B4F5C',
        gray500: '#616678',
        gray300: '#CACED9',
        gray100: '#EDEEF2',
        gray50: '#F9FAFC',
        secondary500: '#353841',
        secondary300: '#C8FBFF',
        secondary100: '#EDFEFF',
        red500: '#FA6B4E',
        red300: '#FCC5BB'
      },
      boxShadow: {
        borderShadow: '0 4px 24px 0 rgba(34, 34, 34, 0.08)',
      }
    }
  },
  plugins: []
};

export default config;
