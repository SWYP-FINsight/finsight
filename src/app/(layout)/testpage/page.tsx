'use client';

import Card from '@/features/articles/components/Card';
//todo: 테스트 페이지로 삭제해야함
import DropDown from '@/features/articles/components/DropDown';
import Button from '@/shared/ui/button/Button';
import DefaultButton from '@/shared/ui/button/DefaultButton';
import TextButton from '@/shared/ui/button/TextButton';

export default function page() {
  const items = ['아이템 1', '아이템 2', '아이템 3'];

  return (
    <div>
      <DefaultButton text="버튼1" color="brand500" textColor="gray-50" />
      <DefaultButton text="버튼2" color="gray50" textColor="gray-500" />
      <TextButton text="추가" />
      <Button text="버튼" buttonSize="lg" />
      <Button text="버튼" buttonSize="sm" />
      <Button text="버튼" buttonSize="lg" disabled />
      <Button text="버튼" buttonSize="sm" disabled />
      <DropDown
        items={items}
        label="속성"
        className="w-full" // 추가 스타일 적용 가능
        onChange={(value) => console.log('선택된 값:', value)}
      />
      <Card
        data={{
          id: 1,
          subject: '',
          distributor: '',
          timestamp: '2025-01-01',
          title: '어머님, 그리고 당신은 멀리 북간도에 계십니다. 그러나, 겨울이 지나고 나의 별에도 봄이 오면, ',
          content:
            '그러나, 겨울이 지나고 나의 별에도 봄이 오면, 무덤 위에 파란 잔디가 피어나듯이 내 이름자 묻힌 그러나, 겨울이 지나고 나의 별에도 봄이 오면,그러',
          source: '기사출처',
          keyword: '키워드',
          reporter: '리포터',
        }}
      />
    </div>
  );
}
