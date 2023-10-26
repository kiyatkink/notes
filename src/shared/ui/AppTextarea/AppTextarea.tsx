import React, { TextareaHTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppTextarea.module.scss'
import { genericMemo } from '../../types/genericMemo';

type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'size'>

export enum AppTextareaSize {
    'M'='m',
    'L' = 'l',
    'XL' = 'xl'
}
export interface AppTextareaProps<T extends string> extends HTMLTextAreaProps{
    className?: string,
    placeholder?: string,
    value?: T,
    onChange?: (value: T) => void,
    size?: AppTextareaSize,
    resize?: boolean
}

export const AppTextarea = genericMemo(<T extends string>(props: AppTextareaProps<T>) => {
  const {
    className,
    placeholder,
    onChange,
    value = '',
    size = AppTextareaSize.M,
    resize,
    ...otherProps
  } = props

  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value as T);
  }

  return (
    <div className={classNames(cls.AppTextarea, {}, [className, cls[size]])}>
      <textarea
        className={classNames(cls.textarea, { [cls.resize_non]: !resize }, [className, cls[size]])}
        value={value}
        onChange={inputChange}
        {...otherProps}
      />
    </div>
  );
})
