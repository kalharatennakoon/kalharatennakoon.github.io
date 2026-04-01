import { useEffect, useState } from 'react'
import { FaPen, FaMedium, FaCalendarAlt, FaFire, FaClock } from 'react-icons/fa'

interface BlogPost {
  title: string
  excerpt: string
  date: string
  url: string
  tags: string[]
  image?: string
}

const MOST_VIEWED: BlogPost[] = [
  {
    title: 'Getting Started with CronJobs in Kubernetes',
    excerpt: 'A practical guide to scheduling and automating workloads using Kubernetes CronJobs, with real-world examples and best practices.',
    date: 'December 24, 2021',
    url: 'https://faun.pub/getting-started-with-cronjobs-in-kubernetes-d3cfce10fd9b',
    tags: ['Kubernetes', 'DevOps', 'Automation'],
    image: 'https://miro.medium.com/1*lSbm5so0zwaSZFwh0BlXfg.jpeg',
  },
  {
    title: 'Getting Started with Tekton Pipelines: A Beginner\'s Guide to CI/CD on Kubernetes',
    excerpt: 'Learn how to build cloud-native CI/CD pipelines with Tekton on Kubernetes — from Tasks and Pipelines to running your first workflow.',
    date: 'August 9, 2024',
    url: 'https://levelup.gitconnected.com/getting-started-with-tekton-pipelines-a-beginners-guide-to-ci-cd-on-kubernetes-afd21e98b9fe',
    tags: ['Tekton', 'CI/CD', 'Kubernetes', 'DevOps'],
    image: 'https://miro.medium.com/1*sw4RrWUIoLyCq9UXIQdZsQ.jpeg',
  },
  {
    title: 'Why Daily Exercises Are Essential for IT Industry Professionals',
    excerpt: 'Exploring the physical and mental health benefits of regular exercise for software engineers and IT professionals who spend long hours at their desks.',
    date: 'January 21, 2023',
    url: 'https://kalharatennakoon.medium.com/why-daily-exercises-are-essential-for-it-industry-professionals-2b0524fcbb68',
    tags: ['Health', 'Productivity', 'Lifestyle'],
    image: 'https://miro.medium.com/1*Zx22odHuJCM1TEySeSpB8A.jpeg',
  },
]

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Thumbnail */}
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-44 overflow-hidden flex-shrink-0 bg-gradient-to-br from-[rgba(30,58,138,0.08)] to-[rgba(23,37,84,0.12)]"
      >
        {post.image ? (
          <img
            src={post.image.startsWith('//') ? `https:${post.image}` : post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaMedium className="text-5xl text-[rgba(30,58,138,0.25)]" />
          </div>
        )}
      </a>

      {/* Header strip */}
      <div className="px-5 pt-4 pb-3 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
        <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
          <FaCalendarAlt className="text-[var(--color-primary)]" /> {post.date}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex flex-col flex-grow gap-3">
        <h3 className="text-sm font-bold leading-snug text-[var(--text-primary)]">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            {post.title}
          </a>
        </h3>
        <p className="text-xs leading-relaxed text-[var(--text-secondary)] flex-grow m-0">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-[rgba(30,58,138,0.08)] rounded-full text-xs text-[var(--color-primary)] font-medium border border-[rgba(30,58,138,0.15)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-2)] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(30,58,138,0.35)] transition-all duration-200 self-start"
        >
          <FaMedium className="text-sm" /> Read on Medium
        </a>
      </div>
    </article>
  )
}

function SubsectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[rgba(30,58,138,0.1)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)]">
        {icon} {label}
      </span>
      <div className="flex-1 h-px bg-[var(--border-color)]" />
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
      .catch(err => console.log('Could not fetch blog posts:', err))
  }, [])

  return (
    <section id="blog" className="py-20 bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-12 text-center font-bold flex items-center justify-center gap-3">
          <FaPen className="text-4xl text-[var(--color-primary)] flex-shrink-0" />
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent pb-1">
            Writing
          </span>
        </h2>

        {/* Most Viewed */}
        <SubsectionLabel icon={<FaFire />} label="Most Viewed" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MOST_VIEWED.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </div>

        {/* Latest */}
        <SubsectionLabel icon={<FaClock />} label="Latest" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {latestPosts.length > 0
            ? latestPosts.map((post) => <PostCard key={post.url} post={post} />)
            : Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] animate-pulse"
                />
              ))}
        </div>

        <div className="text-center">
          <a
            href="https://kalharatennakoon.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_25px_rgba(30,58,138,0.35)] hover:-translate-y-0.5"
          >
            <FaMedium /> View All Posts on Medium
          </a>
        </div>
      </div>
    </section>
  )
}

export default Blog
