import { InputHTMLAttributes, FC } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} className={classNames([styles.container, props.className])} />
}

export default Input
