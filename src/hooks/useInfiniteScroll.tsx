import { useEffect, useRef } from 'react'

const useInfiniteScroll = (fetchData: () => void) => {
  const observerTargetRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData()
        }
      },
      { threshold: 1 },
    )

    if (observerTargetRef.current) {
      observer.observe(observerTargetRef.current)
    }
    const observerRefValue = observerTargetRef.current
    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue)
      }
    }
  }, [fetchData, observerTargetRef])

  return observerTargetRef
}

export default useInfiniteScroll
