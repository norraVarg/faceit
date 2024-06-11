import { useEffect, useRef } from 'react'

const useScrollPosition = <T extends HTMLElement>(position: number) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    // use timeout as a workaround to solve a known issue
    // https://github.com/facebook/react/issues/23396#issuecomment-1376887787
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTo({ top: position, left: 0, behavior: 'instant' })
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return ref
}

export default useScrollPosition
