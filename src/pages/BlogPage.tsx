import Blog from '../components/Blog'
import usePageTitle from '../hooks/usePageTitle'

function BlogPage() {
  usePageTitle('Writing')

  // Top padding clears the fixed navbar; colour matches the section below.
  return (
    <div className="pt-12 bg-[var(--bg-primary)]">
      <Blog />
    </div>
  )
}

export default BlogPage
