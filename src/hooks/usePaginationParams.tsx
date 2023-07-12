import { useCallback, useRef } from 'react'

const usePaginationParams = () => {
  const currentPageRef = useRef<number>(0)
  const totalPageRef = useRef<number>(10)

  const updatePagination = useCallback((page: number, totalPages: number) => {
    totalPageRef.current = totalPages
    currentPageRef.current = page
  }, [])

  const getPagination = useCallback(() => {
    return { page: currentPageRef.current, totalPages: totalPageRef.current }
  }, [])

  const clearPages = useCallback(() => {
    updatePagination(0, 10)
  }, [updatePagination])

  return {
    clearPages,
    updatePagination,
    getPagination,
  }
}

export default usePaginationParams
