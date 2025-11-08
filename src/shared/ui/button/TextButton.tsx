import PlusIcon from '@/assets/icons/plusIcon.svg';

interface Props {
  text: string;
  onClick?: () => void;
}

export default function TextButton({ text, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[5.7rem] h-[2.8rem] py-[0.6rem] px-[1rem] items-center cursor-pointer bg-brand500 rounded-full text-gray-50 text-[1.2rem] font-[600]"
    >
      <PlusIcon />
      {text}
    </button>
  );
}
