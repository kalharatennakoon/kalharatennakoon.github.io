import {
  FaEnvelope, FaGithub, FaLinkedin, FaMedium,
  FaStackOverflow, FaGoogle, FaAward, FaHeart, FaCoffee
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiBluesky, SiLinktree, SiGooglecloud } from 'react-icons/si'

const contactLinks = [
  {
    href: 'mailto:kalharatennakoonmck@gmail.com',
    icon: <FaEnvelope />,
    label: 'Email',
    external: false,
  },
  {
    href: 'https://www.linkedin.com/in/kalharatennakoon',
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    external: true,
  },
  {
    href: 'https://github.com/kalharatennakoon',
    icon: <FaGithub />,
    label: 'GitHub',
    external: true,
  },
  {
    href: 'https://kalharatennakoon.medium.com',
    icon: <FaMedium />,
    label: 'Medium',
    external: true,
  },
  {
    href: 'https://x.com/_KalharaT',
    icon: <FaXTwitter />,
    label: 'X',
    external: true,
  },
  {
    href: 'https://bsky.app/profile/kalharatennakoon.bsky.social',
    icon: <SiBluesky />,
    label: 'Bluesky',
    external: true,
  },
  {
    href: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon',
    icon: <FaStackOverflow />,
    label: 'Stack Overflow',
    external: true,
  },
  {
    href: 'https://linktr.ee/kalharatennakoon',
    icon: <SiLinktree />,
    label: 'Linktree',
    external: true,
  },
  {
    href: 'https://g.dev/TMKRBTennakoon',
    icon: <FaGoogle />,
    label: 'Google Dev',
    external: true,
  },
  {
    href: 'https://www.cloudskillsboost.google/public_profiles/e074e12f-53b1-4ccd-ae0f-c18216f147fd',
    icon: <SiGooglecloud />,
    label: 'Google Cloud',
    external: true,
  },
  {
    href: 'https://www.credly.com/users/kalharatennakoon',
    icon: <FaAward />,
    label: 'Credly',
    external: true,
  },
]

function Contact() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <section id="contact" className="py-20 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:via-[var(--bg-secondary)] dark:to-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center">
            <h2 className="text-5xl mb-4 text-[var(--text-primary)] font-bold bg-gradient-to-r from-[#172554] to-[#172554] bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-[#172554] mb-4 font-medium">
              Let's connect and build something amazing together
            </p>
            <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed">
              I'm always open to discussing new projects, opportunities, or collaborations.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group bg-[var(--card-bg)] py-8 px-6 rounded-2xl transition-all duration-300 border-2 border-[var(--border-color)] shadow-[0_4px_15px_var(--shadow)] flex flex-col items-center gap-3 hover:-translate-y-2 hover:border-[#172554] hover:shadow-[0_8px_30px_rgba(30,58,138,0.3)] backdrop-blur-sm hover:bg-gradient-to-br hover:from-[rgba(30,58,138,0.05)] hover:to-[rgba(23,37,84,0.05)]"
                >
                  <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#172554] to-[#172554] flex items-center justify-center text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:shadow-[0_8px_20px_rgba(30,58,138,0.5)]">
                    {link.icon}
                  </div>
                  <h3 className="text-base text-[var(--text-primary)] m-0 font-semibold">
                    {link.label}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 right-0 bg-[var(--card-bg)]/95 backdrop-blur-md border-t border-[var(--border-color)] py-5 z-50 shadow-[0_-4px_20px_var(--shadow)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(30,58,138,0.03)] via-transparent to-[rgba(23,37,84,0.03)]"></div>
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="text-center">
            <p className="text-[var(--text-primary)] text-sm m-0 mb-1 font-semibold tracking-wide">
              © {currentYear} Kalhara Tennakoon. All Rights Reserved.
            </p>
            <p className="text-[var(--text-secondary)] text-xs m-0 opacity-70 flex items-center justify-center gap-1">
              Crafted with <FaHeart className="text-[#172554]" /> and <FaCoffee className="text-[#172554]" />
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Contact
