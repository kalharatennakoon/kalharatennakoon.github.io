import { useEffect } from 'react'

const SITE_NAME = 'Kalhara Tennakoon'

/** Sets the tab title for a page; pass nothing for the home page. */
function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  }, [title])
}

export default usePageTitle
