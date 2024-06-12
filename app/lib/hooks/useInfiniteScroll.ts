import { useEffect, useState } from 'react'

export const useInfiniteScroll = (anchorEl: HTMLElement | null, enabled: boolean = true) => {
  const [fetchMore, setFetchMore] = useState(false)

  useEffect(() => {
    if (!enabled) {
      return
    }

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

  return { fetchMore }
}
