import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss'

interface SkeletonProps {
    className?: string,
    width: string,
    height: string,
    borderRadius?: string,
}

export const Skeleton: FC<SkeletonProps> = memo((props: SkeletonProps) => {
  const {
    className, width, height, borderRadius,
  } = props

  const style = {
    width,
    height,
    borderRadius,
  }
  return (
    <div style={style} className={classNames(cls.Skeleton, {}, [className])} />
  );
});
