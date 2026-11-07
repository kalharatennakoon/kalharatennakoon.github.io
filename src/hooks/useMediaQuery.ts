import { useSyncExternalStore } from 'react'

/** Live boolean for a CSS media query, e.g. `useMediaQuery('(max-width: 719px)')`. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export default useMediaQuery
