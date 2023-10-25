import React, { InputHTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppInput.module.scss'
import { genericMemo } from '../../types/genericMemo';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>

export enum AppInputSize {
  'M'='m',
  'L' = 'l',
  'XL' = 'xl'
}
export interface AppInputProps<T extends string> extends HTMLInputProps{
    className?: string,
    type?: string,
    placeholder?: string,
    value?: T,
    onChange?: (value: T) => void,
    autofocus?: boolean,
    size?: AppInputSize,
}

export const AppInput = genericMemo(<T extends string>(props: AppInputProps<T>) => {
  const {
    className,
    type = 'text',
    placeholder,
    onChange,
    value = '',
    autofocus = false,
    size = AppInputSize.M,
    ...otherProps
  } = props

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value as T);
  }

  return (
    <div className={classNames(cls.AppInput, {}, [className, cls[size]])}>
      { placeholder && <div>{`${placeholder}/>`}</div>}
      <div className={cls.input_wrapper}>
        <input
          type={type}
          className={cls.input}
          value={value}
          onChange={inputChange}
          {...otherProps}
          autoFocus={autofocus}
        />
      </div>
    </div>
  );
})
