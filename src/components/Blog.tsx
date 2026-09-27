import { useEffect, useState } from 'react'
import { FaMedium } from 'react-icons/fa'

interface BlogPost {
  title: string
  excerpt: string
  date: string
  url: string
  tags: string[]
}

const MOST_VIEWED: BlogPost[] = [
  {
    title: 'Getting Started with CronJobs in Kubernetes',
    excerpt: 'A practical guide to scheduling and automating workloads using Kubernetes CronJobs, with real-world examples and best practices.',
    date: 'December 24, 2021',
    url: 'https://faun.pub/getting-started-with-cronjobs-in-kubernetes-d3cfce10fd9b',
    tags: ['Kubernetes', 'DevOps', 'Automation'],
  },
  {
    title: "Getting Started with Tekton Pipelines: A Beginner's Guide to CI/CD on Kubernetes",
    excerpt: 'Learn how to build cloud-native CI/CD pipelines with Tekton on Kubernetes — from Tasks and Pipelines to running your first workflow.',
    date: 'August 9, 2024',
    url: 'https://levelup.gitconnected.com/getting-started-with-tekton-pipelines-a-beginners-guide-to-ci-cd-on-kubernetes-afd21e98b9fe',
    tags: ['Tekton', 'CI/CD', 'Kubernetes', 'DevOps'],
  },
  {
    title: 'Why Daily Exercises Are Essential for IT Industry Professionals',
    excerpt: 'Exploring the physical and mental health benefits of regular exercise for software engineers and IT professionals who spend long hours at their desks.',
    date: 'January 21, 2023',
    url: 'https://kalharatennakoon.medium.com/why-daily-exercises-are-essential-for-it-industry-professionals-2b0524fcbb68',
    tags: ['Health', 'Productivity', 'Lifestyle'],
  },
]

function PostRow({ post }: { post: BlogPost }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', padding: '0.625rem 0' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
        >
          {post.title}
        </a>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.25rem' }}>
          {post.tags.map((tag) => (
            <span key={tag} style={{ fontSize: '0.68rem', fontWeight: 500, color: 'var(--text-primary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.1rem 0.5rem' }}>#{tag}</span>
          ))}
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{post.date}</span>
    </div>
  )
}

function Blog() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    fetch('/blog-posts.json')
      .then(res => res.json())
      .then((data: BlogPost[]) => {
        if (data && data.length > 0) {
          const sorted = [...data].sort((a, b) => {
            const da = Date.parse(a.date)
            const db = Date.parse(b.date)
            if (isNaN(da) && isNaN(db)) return 0
            if (isNaN(da)) return 1
            if (isNaN(db)) return -1
            return db - da
          })
          setLatestPosts(sorted.slice(0, 3))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="blog" style={{ background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Writing</h2>
        </div>

        <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.25rem' }}>Most Viewed</p>
        <div style={{ marginBottom: '1.5rem' }}>
          {MOST_VIEWED.map((post) => <PostRow key={post.url} post={post} />)}
        </div>

        {latestPosts.length > 0 && (
          <>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.25rem' }}>Latest</p>
            <div style={{ marginBottom: '1.5rem' }}>
              {latestPosts.map((post) => <PostRow key={post.url} post={post} />)}
            </div>
          </>
        )}

        <a
          href="https://kalharatennakoon.medium.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.72rem', fontWeight: 600, color: 'var(--bg-primary)', background: 'var(--text-primary)', border: '1px solid var(--text-primary)', borderRadius: '9999px', padding: '0.3rem 0.8rem', textDecoration: 'none', letterSpacing: '0.03em' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
        >
          <FaMedium size={12} /> View All Posts on Medium
        </a>
      </div>
    </section>
  )
}

export default Blog
