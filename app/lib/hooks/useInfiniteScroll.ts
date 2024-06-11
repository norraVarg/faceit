import { useEffect, useRef, useState } from 'react'

export const useInfiniteScroll = (enabled: boolean = true) => {
  const [fetchMore, setFetchMore] = useState(false)
  const anchorRef = useRef(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

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
  }, [fetchMore, enabled])

  return { anchorRef, fetchMore }
}
