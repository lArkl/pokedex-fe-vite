import { FC, ReactNode } from 'react'
import styles from './ItemCard.module.scss'
import { capitalize } from '../../utils/strings'
import Typography from '../Typography/Typography'
import { DEFAULT_SPRITE } from '../../config/main'

interface ItemCardProps {
  title: string
  id: number
  imgUrl?: string
  children?: ReactNode
}

const ItemCard: FC<ItemCardProps> = ({ title, id, imgUrl, children }) => {
  return (
    <article className={styles.container}>
      <div className={styles.title}>
        <Typography variant="lg">{capitalize(title)}</Typography>
        <Typography variant="md" className={styles.id}>
          {id}
        </Typography>
      </div>
      <div className={styles.image}>
        <img src={imgUrl ?? DEFAULT_SPRITE} alt={title} width={180} height={180} />
      </div>
      {children ? <div className={styles.bottom}>{children}</div> : null}
    </article>
  )
}

export default ItemCard
