import { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import { Control, FieldValues, useController, FieldPath } from 'react-hook-form'
import classNames from 'classnames'

export type InputProps<TFieldValues extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
}

export default function Input<TFieldValues extends FieldValues>({ control, name, ...props }: InputProps<TFieldValues>) {
  const { field } = useController<TFieldValues>({
    control,
    name,
  })
  return <input {...props} id={name} {...field} className={classNames([styles.container, props.className])} />
}
