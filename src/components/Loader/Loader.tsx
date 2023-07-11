import { FC } from 'react'
import styles from './Loader.module.scss'

const Loader: FC = () => {
  return (
    <div className={styles.container} role="alert" aria-label="loading">
      <div className={styles.pokeball}></div>
    </div>
  )
}

export default Loader
