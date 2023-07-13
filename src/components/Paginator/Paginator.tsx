import { FC } from 'react'
import styles from './Paginator.module.scss'
import classNames from 'classnames'
import { usePagination, needsDots } from './usePagination'
import Button from '../Button'
import Typography from '../Typography/Typography'

export interface PaginatorProps {
  pageSize: number
  currentPage: number
  totalCount: number
  className?: string
  setCurrentPage: (page: number) => void
}

const Paginator: FC<PaginatorProps> = ({
  currentPage,
  pageSize,
  totalCount,
  className,
  setCurrentPage,
}: PaginatorProps) => {
  const indexRange = usePagination({ currentPage, pageSize, totalCount })
  return (
    <ul className={classNames(styles.container, className)}>
      {indexRange.map((pageIndex) => {
        const isDots = needsDots(pageIndex)
        return (
          <li key={`page-${pageIndex}`} className={styles.item}>
            {isDots ? (
              <Typography className={styles.dots}>...</Typography>
            ) : (
              <Button
                className={classNames(styles.page, {
                  [styles.current]: currentPage === pageIndex,
                })}
                onClick={() => setCurrentPage(pageIndex)}
              >
                {pageIndex}
              </Button>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Paginator
