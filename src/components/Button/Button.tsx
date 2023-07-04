import { ButtonHTMLAttributes, FC } from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const Button: FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  return (
    <button {...props} className={classNames([styles.container, styles[variant], props.className])}>
      {props.children}
    </button>
  )
}

export default Button
