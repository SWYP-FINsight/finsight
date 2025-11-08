//todo: 테스트 페이지로 삭제해야함
import Button from '@/shared/ui/button/Button';
import DefaultButton from '@/shared/ui/button/DefaultButton';
import TextButton from '@/shared/ui/button/TextButton';

export default function page() {
  return (
    <div>
      <DefaultButton text="버튼1" color="brand500" textColor="gray-50" />
      <DefaultButton text="버튼2" color="gray50" textColor="gray-500" />
      <TextButton text="추가" />
      <Button text="버튼" buttonSize="lg" />
      <Button text="버튼" buttonSize="sm" />
      <Button text="버튼" buttonSize="lg" disabled />
      <Button text="버튼" buttonSize="sm" disabled />
    </div>
  );
}
