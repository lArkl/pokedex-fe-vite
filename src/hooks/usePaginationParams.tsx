import { useCallback, useRef } from 'react'
import { PAGE_SIZE } from '../config/main'

const usePaginationParams = () => {
  const currentPageRef = useRef<number>(1)
  const totalPageRef = useRef<number>(10)

  const updatePagination = useCallback((page: number, count: number) => {
    totalPageRef.current = Math.ceil(count / PAGE_SIZE)
    currentPageRef.current = page
  }, [])

  const getPagination = useCallback(() => {
    return { page: currentPageRef.current, totalPages: totalPageRef.current }
  }, [])

  const clearPages = useCallback(() => {
    updatePagination(1, 10 * PAGE_SIZE)
  }, [updatePagination])

  return {
    clearPages,
    updatePagination,
    getPagination,
  }
}

export default usePaginationParams
