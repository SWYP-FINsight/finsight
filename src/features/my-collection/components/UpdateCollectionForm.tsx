import { useUpdateCollectionMutation } from '@/features/my-collection/hooks';
import { IAddCollection, ICollectionDetail } from '@/features/my-collection/types';
import { cn } from '@/lib/utils';
import MvpButton from '@/shared/ui/button/MvpButton';
import ChipGroup from '@/shared/ui/chip/ChipGroup';
import LabelInput from '@/shared/ui/input/LabelInput';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type UpdateCollectionInputs = IAddCollection;

interface Props {
  initData: ICollectionDetail;
  onUpdateSuccess?: () => void;
}

export default function UpdateCollectionForm({ initData, onUpdateSuccess }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<UpdateCollectionInputs>({
    mode: 'onChange',
    defaultValues: {
      collectionName: initData.collectionName,
      keyword: initData.keyword,
      source: initData.source,
      periodType: initData.periodType,
    },
  });

  const updateMutation = useUpdateCollectionMutation({
    onSuccess: () => {
      onUpdateSuccess?.();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<UpdateCollectionInputs> = (data) => {
    updateMutation.mutate({
      id: initData.id,
      data: data,
    });
  };

  const isAddDisabled = !isValid || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2rem]">
      <div className="flex flex-col gap-[1.2rem]">
        <LabelInput
          labelTitle="컬렉션 이름"
          placeholder="컬렉션 이름을 입력하세요."
          {...register('collectionName', { required: '컬렉션 이름은 필수입니다.' })}
          inputSize="lg"
          isFailed={!!errors.collectionName}
          messageText={errors.collectionName?.message}
        />
        <LabelInput
          labelTitle="관심 키워드"
          placeholder="관심 종목 키워드를 입력하세요."
          {...register('keyword', { required: '관심 종목 키워드는 필수입니다.' })}
          inputSize="lg"
          isFailed={!!errors.keyword}
          messageText={errors.keyword?.message}
        />
        <Controller
          name="source"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <ChipGroup title="출처" value={value} onValueChange={onChange} groupType="source" />
          )}
        />
        <Controller
          name="periodType"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <ChipGroup title="기간" value={value} onValueChange={onChange} groupType="period" />
          )}
        />
      </div>
      <div>
        <MvpButton
          type="submit"
          className={cn(
            'w-full',
            isAddDisabled ? 'bg-gray-300 text-gray-500 font-medium cursor-not-allowed' : 'bg-brand500 text-gray-50',
          )}
          disabled={isAddDisabled}
        >
          {updateMutation.isPending ? '수정 중...' : '컬렉션 수정하기'}
        </MvpButton>
      </div>
    </form>
  );
}
