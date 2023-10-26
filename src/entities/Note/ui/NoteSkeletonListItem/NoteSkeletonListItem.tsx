import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './NoteSkeletonListItem.module.scss'

interface NoteSkeletonListItemProps {
    className?: string
}

export const NoteSkeletonListItem: FC<NoteSkeletonListItemProps> = memo((props: NoteSkeletonListItemProps) => {
  const { className } = props

  return (
    <div className={classNames(cls.NoteSkeletonListItem, {}, [className])}>
      <Skeleton width="100%" height="32px" borderRadius="5px" />
      <Skeleton width="70%" height="24px" borderRadius="5px" />
    </div>
  );
});
