import { useEffect, useState } from 'react'
import { FaMedium } from 'react-icons/fa'

interface BlogPost {
  title: string
  excerpt: string
  date: string
  url: string
  tags: string[]
  image?: string
}

const MOST_READ: BlogPost[] = [
  {
    title: 'Getting Started with CronJobs in Kubernetes',
    excerpt: 'Scheduling and automating workloads with Kubernetes CronJobs, including concurrency policies and restart strategies.',
    date: 'Dec 24, 2021',
    url: 'https://faun.pub/getting-started-with-cronjobs-in-kubernetes-d3cfce10fd9b',
    tags: ['Kubernetes', 'DevOps'],
  },
  {
    title: "Getting Started with Tekton Pipelines: A Beginner's Guide to CI/CD on Kubernetes",
    excerpt: 'Building cloud-native CI/CD with Tekton, from Tasks and Pipelines to a first working workflow.',
    date: 'Aug 9, 2024',
    url: 'https://levelup.gitconnected.com/getting-started-with-tekton-pipelines-a-beginners-guide-to-ci-cd-on-kubernetes-afd21e98b9fe',
    tags: ['Tekton', 'CI/CD'],
  },
  {
    title: 'Why Daily Exercises Are Essential for IT Industry Professionals',
    excerpt: 'Physical and mental health for engineers who spend long hours at a desk.',
    date: 'Jan 21, 2023',
    url: 'https://kalharatennakoon.medium.com/why-daily-exercises-are-essential-for-it-industry-professionals-2b0524fcbb68',
    tags: ['Health'],
  },
]

function publication(url: string): string {
  if (url.includes('faun.pub')) return 'FAUN.dev'
  if (url.includes('levelup.gitconnected.com')) return 'Level Up Coding'
  if (url.includes('medium.com/macoclock')) return "Mac O'Clock"
  return 'Medium'
}

function formatDate(date: string): string {
  const t = Date.parse(date)
  if (Number.isNaN(t)) return date
  return new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(new Date(t))
}

function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="border-t border-rule">
      {posts.map((p) => (
        <li key={p.url} className="border-b border-rule">
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block py-5">
            <p className="text-[1.0625rem] font-medium leading-snug text-ink group-hover:text-accent transition-colors">
              {p.title}
            </p>
            <p className="mt-1.5 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">{p.excerpt}</p>
            <p className="mt-2 text-[0.8125rem] text-faint">
              {publication(p.url)}, {formatDate(p.date)}
            </p>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Blog() {
  const [recent, setRecent] = useState<BlogPost[]>([])

  useEffect(() => {
    const controller = new AbortController()
    fetch('/blog-posts.json', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: BlogPost[]) => {
        const featuredUrls = new Set(MOST_READ.map((p) => p.url))
        const sorted = [...data]
          .filter((p) => !featuredUrls.has(p.url))
          .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
        setRecent(sorted.slice(0, 3))
      })
      .catch(() => {
        // The list is a bonus; the section still works with the most-read posts alone.
      })
    return () => controller.abort()
  }, [])

  return (
    <section id="blog" className="section">
      <div className="page-wrap">
        <div className="section-head">
          <h2 className="section-title">Writing</h2>
          <p className="section-lede">
            Practical guides on Kubernetes, Tekton, Docker and CI/CD, written on Medium since 2021
            and published in Level Up Coding and FAUN.dev.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <div>
            <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
              <div>
                <dt className="text-[0.875rem] text-muted">Articles</dt>
                <dd className="mt-1 text-[2.25rem] font-semibold leading-none tracking-[-0.02em]">50+</dd>
              </div>
              <div>
                <dt className="text-[0.875rem] text-muted">Total views</dt>
                <dd className="mt-1 text-[2.25rem] font-semibold leading-none tracking-[-0.02em]">150K+</dd>
              </div>
            </dl>
            <a
              href="https://kalharatennakoon.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mt-8"
            >
              <FaMedium aria-hidden="true" />
              All articles on Medium
            </a>
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-10">
            <div>
              <h3 className="mb-3 text-[0.9375rem] font-medium text-muted">Most read</h3>
              <PostList posts={MOST_READ} />
            </div>
            {recent.length > 0 && (
              <div>
                <h3 className="mb-3 text-[0.9375rem] font-medium text-muted">Recent</h3>
                <PostList posts={recent} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog
