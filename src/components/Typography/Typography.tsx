import classNames from 'classnames'
import { FC, ReactNode } from 'react'
// import styles from './Typography.module.scss'

const styles = {
  large: '',
  medium: '',
  small: '',
}

interface TypographyProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const Typography: FC<TypographyProps> = ({ children, size }) => {
  return (
    <div
      className={classNames({
        [styles.large]: size === 'lg',
        [styles.medium]: size === 'md',
        [styles.small]: size === 'sm',
      })}
    >
      {children}
    </div>
  )
}

export default Typography
