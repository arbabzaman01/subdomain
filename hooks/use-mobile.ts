import * as React from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect if the current screen width is mobile.
 * Returns true if window.innerWidth < MOBILE_BREAKPOINT
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Function to update mobile state
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    updateIsMobile()

    // Listen for window resize events
    window.addEventListener('resize', updateIsMobile)

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  return isMobile
}
