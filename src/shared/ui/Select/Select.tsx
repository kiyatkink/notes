import React, { SelectHTMLAttributes, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss'
import { genericMemo } from '../../types/genericMemo';

type HTMLSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>

export interface OptionsProps<T extends string> {
    name: string,
    value: T
}

export enum SelectThems {
    DEFAULT = 'default'
}
interface SelectProps<T extends string> extends HTMLSelectProps{
    className?: string,
    placeholder?: string,
    value?: T,
    onChange: (value: T) => void,
    options: Array<OptionsProps<T>>,
    theme?: SelectThems,
    readonly?: boolean,
}

export const Select = genericMemo(<T extends string>(props: SelectProps<T>) => {
  const {
    className,
    placeholder,
    value,
    onChange,
    options,
    theme = SelectThems.DEFAULT,
    readonly,
  } = props

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  }

  const optionsList = useMemo(() => options.map((option) => (
    <option
      className={cls.option}
      key={option.name}
      value={option.value}
    >
      {option.name}
    </option>
  )), [options])

  return (
    <div className={classNames(cls.SelectWrapper, {}, [className, cls[theme]])}>
      {
         placeholder && <div>{`${placeholder}/>`}</div>
      }
      <select className={cls.select} value={value} onChange={selectChange} disabled={readonly}>
        {optionsList}
      </select>
    </div>
  );
});
