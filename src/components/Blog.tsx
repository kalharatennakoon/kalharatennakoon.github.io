import { useEffect, useState } from 'react'
import { FaPen, FaMedium, FaCalendarAlt, FaFire, FaClock } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'

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

function PostCard({ post, delay = 0, visible = true }: { post: BlogPost; delay?: number; visible?: boolean }) {
  return (
    <article
      className={`reveal-scale ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: visible ? `${delay}s` : '0s' }}
    >
      <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(30,58,138,0.16)] transition-all duration-400 overflow-hidden flex flex-col group h-full shimmer-hover">
        {/* Thumbnail */}
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-44 overflow-hidden flex-shrink-0 bg-gradient-to-br from-[rgba(30,58,138,0.08)] to-[rgba(6,182,212,0.1)]"
        >
          {post.image ? (
            <img
              src={post.image.startsWith('//') ? `https:${post.image}` : post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              style={{ '--tw-scale-x': '1.08', '--tw-scale-y': '1.08' } as React.CSSProperties}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaMedium className="text-5xl text-[rgba(30,58,138,0.2)]" />
            </div>
          )}
        </a>

        {/* Header strip */}
        <div className="px-5 pt-4 pb-3 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.04)] to-transparent">
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
                className="px-2.5 py-0.5 rounded-full text-xs text-[var(--color-primary)] font-medium border border-[rgba(30,58,138,0.15)] hover:bg-[rgba(30,58,138,0.1)] transition-colors"
                style={{ background: 'rgba(30,58,138,0.07)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(30,58,138,0.35)] transition-all duration-200 self-start"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)' }}
          >
            <FaMedium className="text-sm" /> Read on Medium
          </a>
        </div>
      </div>
    </article>
  )
}

function SubsectionLabel({ icon, label, isVisible }: { icon: React.ReactNode; label: string; isVisible: boolean }) {
  return (
    <div className={`flex items-center gap-2 mb-6 reveal ${isVisible ? 'is-visible' : ''}`}>
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)]"
        style={{ background: 'rgba(30,58,138,0.08)' }}>
        {icon} {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(30,58,138,0.25), transparent)' }} />
    </div>
  )
}

function Blog() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [mostViewedRef, mostViewedVisible] = useScrollReveal<HTMLDivElement>(0.05)
  const [latestRef, latestVisible] = useScrollReveal<HTMLDivElement>(0.05)

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
    <section id="blog" className="py-20 bg-[var(--bg-primary)] relative overflow-hidden dark:bg-[var(--bg-secondary)]">

      {/* Background blobs */}
      <div
        className="blob-shape w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,0.08), transparent)',
          top: '-100px',
          left: '-80px',
          animationDuration: '22s',
          animationDelay: '-5s',
        }}
      />

      <div className="max-w-6xl mx-auto px-8 relative z-10">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-[var(--color-primary)] opacity-30 rounded-full" />
              <FaPen className="relative text-3xl text-[var(--color-primary)]" />
            </div>
            <h2
              className="text-5xl font-bold bg-clip-text text-transparent animate-gradient-text pb-1"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
            >
              Writing
            </h2>
          </div>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
        </div>

        {/* Most Viewed */}
        <div ref={mostViewedRef}>
          <SubsectionLabel icon={<FaFire />} label="Most Viewed" isVisible={mostViewedVisible} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {MOST_VIEWED.map((post, i) => (
              <PostCard key={post.url} post={post} delay={i * 0.1} visible={mostViewedVisible} />
            ))}
          </div>
        </div>

        {/* Latest */}
        <div ref={latestRef}>
          <SubsectionLabel icon={<FaClock />} label="Latest" isVisible={latestVisible} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {latestPosts.length > 0
              ? latestPosts.map((post, i) => (
                  <PostCard key={post.url} post={post} delay={i * 0.1} visible={latestVisible} />
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-72 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] animate-pulse"
                  />
                ))}
          </div>
        </div>

        <div className={`text-center reveal ${latestVisible ? 'is-visible' : ''}`} style={{ transitionDelay: latestVisible ? '0.4s' : '0s' }}>
          <a
            href="https://kalharatennakoon.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(30,58,138,0.4)] hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), #3b82f6, #06b6d4)', backgroundSize: '200% 200%' }}
          >
            <FaMedium /> View All Posts on Medium
          </a>
        </div>
      </div>
    </section>
  )
}

export default Blog
