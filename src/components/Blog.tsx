import { useEffect, useState } from 'react'
import { FaPen, FaMedium, FaCalendarAlt, FaFire, FaClock, FaExternalLinkAlt } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'
import { soundFx } from '../utils/sound'

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
    excerpt: 'A practical, production guide to scheduling and automating workloads using Kubernetes CronJobs, covering real-world concurrency policies and restart strategies.',
    date: 'Dec 24, 2021',
    url: 'https://faun.pub/getting-started-with-cronjobs-in-kubernetes-d3cfce10fd9b',
    tags: ['Kubernetes', 'DevOps', 'Automation'],
    image: 'https://miro.medium.com/1*lSbm5so0zwaSZFwh0BlXfg.jpeg',
  },
  {
    title: 'Getting Started with Tekton Pipelines: A Beginner\'s Guide to CI/CD on Kubernetes',
    excerpt: 'Learn how to build cloud-native CI/CD pipelines with Tekton on Kubernetes — from Tasks and Pipelines to running your first production workflow.',
    date: 'Aug 9, 2024',
    url: 'https://levelup.gitconnected.com/getting-started-with-tekton-pipelines-a-beginners-guide-to-ci-cd-on-kubernetes-afd21e98b9fe',
    tags: ['Tekton', 'CI/CD', 'Kubernetes', 'DevOps'],
    image: 'https://miro.medium.com/1*sw4RrWUIoLyCq9UXIQdZsQ.jpeg',
  },
  {
    title: 'Why Daily Exercises Are Essential for IT Industry Professionals',
    excerpt: 'Exploring physical and mental health ergonomics for software engineers and DevOps professionals who spend long hours at workstations.',
    date: 'Jan 21, 2023',
    url: 'https://kalharatennakoon.medium.com/why-daily-exercises-are-essential-for-it-industry-professionals-2b0524fcbb68',
    tags: ['Health', 'Productivity', 'Lifestyle'],
    image: 'https://miro.medium.com/1*Zx22odHuJCM1TEySeSpB8A.jpeg',
  },
]

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bento-card flex flex-col justify-between overflow-hidden shimmer-hover group">
      <div>
        {/* Post Thumbnail */}
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.click()}
          className="block h-48 overflow-hidden relative bg-slate-900 cursor-pointer"
        >
          {post.image ? (
            <img
              src={post.image.startsWith('//') ? `https:${post.image}` : post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-sky-950 to-slate-900 text-sky-400">
              <FaMedium className="text-5xl opacity-40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-sky-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-sky-400">
              <FaMedium /> Medium
            </span>
          </div>
        </a>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 leading-snug group-hover:text-sky-400 transition-colors">
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </h3>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="px-5 pb-5 pt-2">
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.click()}
          className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-sky-500/10 hover:bg-sky-500 hover:text-white text-sky-400 border border-sky-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FaMedium />
          <span>Read Full Article</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </a>
      </div>
    </article>
  )
}

export function Blog() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [mostViewedRef, mostViewedVisible] = useScrollReveal<HTMLDivElement>(0.05)

  useEffect(() => {
    fetch('/blog-posts.json')
      .then((res) => res.json())
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
      .catch((err) => console.log('Could not fetch blog posts:', err))
  }, [])

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaPen className="text-xs" />
            <span>Technical Writing & Insights</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Articles & Publications
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Practical DevOps tutorials and cloud-native guides read by over 150,000 developers worldwide.
          </p>
        </div>

        {/* Most Viewed Posts */}
        <div ref={mostViewedRef} className={`reveal ${mostViewedVisible ? 'is-visible' : ''}`}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-6">
            <FaFire />
            <span>Featured & Most Read</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {MOST_VIEWED.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
        </div>

        {/* Latest posts if loaded from JSON */}
        {latestPosts.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-6">
              <FaClock />
              <span>Recent Publications</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {latestPosts.map((post) => (
                <PostCard key={post.url} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* CTA to Medium Profile */}
        <div className="text-center mt-12">
          <a
            href="https://kalharatennakoon.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.click()}
            className="glass-btn-primary px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2 group cursor-pointer"
          >
            <FaMedium className="text-base group-hover:rotate-12 transition-transform" />
            <span>Explore All 50+ Articles on Medium</span>
          </a>
        </div>

      </div>
    </section>
  )
}

export default Blog
