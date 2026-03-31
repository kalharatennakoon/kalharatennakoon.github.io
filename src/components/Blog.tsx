import { useEffect, useState } from 'react'
import { FaPen, FaMedium, FaCalendarAlt, FaClock } from 'react-icons/fa'

interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
  url: string
  tags: string[]
  image?: string
}

function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      title: 'Building, Dockerizing, and Deploying a CRUD API in Go on Kubernetes',
      excerpt: 'A comprehensive guide on building a CRUD API in Go, containerizing it with Docker, and deploying it to Kubernetes.',
      date: '2024',
      readTime: '12 min read',
      url: 'https://levelup.gitconnected.com/building-dockerizing-and-deploying-a-crud-api-in-go-on-kubernetes-9c25b01ad2e8',
      tags: ['Go', 'Kubernetes', 'Docker', 'DevOps'],
    },
    {
      title: 'Notion Automation with Apple Shortcuts',
      excerpt: 'Learn how to automate your Notion workflows using Apple Shortcuts for improved productivity.',
      date: '2024',
      readTime: '6 min read',
      url: 'https://kalharatennakoon.medium.com/notion-automation-with-apple-shortcuts-d3ccab993cc7',
      tags: ['Productivity', 'Automation', 'Notion'],
    },
    {
      title: 'Software Testing Processes for Beginners',
      excerpt: 'A beginner-friendly guide to understanding software testing processes and methodologies.',
      date: '2024',
      readTime: '8 min read',
      url: 'https://kalharatennakoon.medium.com/software-testing-processes-for-beginners-6ac5394c1d3d',
      tags: ['Testing', 'QA', 'Software Engineering'],
    },
    {
      title: 'How to Reduce Your Screen Time',
      excerpt: 'Practical tips and strategies to reduce screen time and maintain a healthier digital lifestyle.',
      date: '2024',
      readTime: '5 min read',
      url: 'https://kalharatennakoon.medium.com/how-to-reduce-screen-time-9ee6e4ed9037',
      tags: ['Productivity', 'Health', 'Lifestyle'],
    },
    {
      title: 'iOS 26 Preview: A Closer Look at the New Phone and Messages Apps',
      excerpt: "Exploring the new features and improvements in iOS 26's Phone and Messages applications.",
      date: '2025',
      readTime: '7 min read',
      url: 'https://kalharatennakoon.medium.com/ios-26-preview-a-closer-look-at-the-new-phone-and-messages-apps-e72c20ca4c84',
      tags: ['iOS', 'Apple', 'Mobile'],
    },
  ])

  useEffect(() => {
    fetch('/blog-posts.json')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) setBlogPosts(data)
      })
      .catch(error => console.log('Using default blog posts:', error))
  }, [])

  return (
    <section id="blog" className="py-20 bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-10 text-center font-bold flex items-center justify-center gap-3">
          <FaPen className="text-[var(--color-primary)] flex-shrink-0" />
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent">
            Blog Posts / Writing
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Image */}
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
                <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-[var(--color-primary)]" /> {post.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-[var(--color-primary)]" /> {post.readTime}
                  </span>
                </div>
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:gap-2.5 transition-all"
                >
                  <FaMedium /> Read on Medium
                </a>
              </div>
            </article>
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
