import { useEffect, useRef, useState } from 'react'

export const useInfiniteScroll = () => {
  const [fetchMore, setFetchMore] = useState(false)
  const anchorRef = useRef(null)

  useEffect(() => {
    const anchorEl = anchorRef.current

    const observer = new IntersectionObserver((entries) => {
      setFetchMore(entries[0].isIntersecting)
    })

    if (anchorEl) {
      observer.observe(anchorEl)
    }

    return () => {
      if (anchorEl) {
        observer.unobserve(anchorEl)
      }
    }
  }, [fetchMore])

  return { anchorRef, fetchMore }
}
