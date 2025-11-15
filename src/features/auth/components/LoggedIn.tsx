import DefaultButton from '@/shared/ui/button/DefaultButton';

interface Props {
  username?: string;
}

export default function LoggedIn({ username }: Props) {
  return (
    <div className="flex items-center gap-[1.2rem]">
      <h3 className="text-14 text-gray-700 font-medium">
        <span className="font-bold">{username}</span>님
      </h3>
      <DefaultButton
        text="로그아웃"
        color="gray50"
        textColor="gray-500"
        className="py-[0.7rem] px-0 text-center text-[1.2rem] font-[600]"
      />
    </div>
  );
}
