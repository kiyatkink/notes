import React, {
  FC, MutableRefObject, ReactNode, useMemo, useRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import cls from './ScrollContainer.module.scss'

interface ScrollContainerProps {
    className?: string
    children: ReactNode
    infinityScrollCallback?: () => void,
}

export const ScrollContainer: FC<ScrollContainerProps> = (props: ScrollContainerProps) => {
  const {
    className,
    children,
    infinityScrollCallback,
    ...otherProps
  } = props
  const rootRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const targetRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  const infinityScrollProps = useMemo(() => (
    {
      root: rootRef as MutableRefObject<Element>,
      target: targetRef as MutableRefObject<Element>,
      callback: infinityScrollCallback,
      rootMargin: '10px 10px',
    }
  ), [infinityScrollCallback])

  useInfinityScroll(infinityScrollProps)

  return (
    <div {...otherProps} ref={rootRef} className={classNames(cls.ScrollContainer, {}, [className])}>
      { children }
      <div ref={targetRef} />
    </div>
  );
}
