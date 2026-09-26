/**
 * Canonical profile data.
 *
 * This is the single source the terminal reads from, so commands print real
 * content instead of hard-coded strings scattered across the command registry.
 */

export const identity = {
  name: 'Kalhara Tennakoon',
  handle: 'kalharatennakoon',
  role: 'DevOps Engineer',
  location: 'Kurunegala, Sri Lanka',
  email: 'kalharatennakoonmck@gmail.com',
  site: 'kalharatennakoon.github.io',
  summary:
    'Computer Science graduate with hands-on industry experience in software development, ' +
    'cloud-native systems, and automation. Focused on DevSecOps, MLOps, AI infrastructure, ' +
    'and building reliable deployment workflows with Kubernetes, Docker, and CI/CD.',
  focus: ['DevSecOps', 'MLOps', 'AI Infrastructure', 'Cloud-Native Platforms'],
}

export const links = [
  { label: 'GitHub', url: 'https://github.com/kalharatennakoon' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kalharatennakoon' },
  { label: 'Medium', url: 'https://kalharatennakoon.medium.com' },
  { label: 'X', url: 'https://x.com/_KalharaT' },
  { label: 'Bluesky', url: 'https://bsky.app/profile/kalharatennakoon.bsky.social' },
  { label: 'Stack Overflow', url: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon' },
]

export const stats = [
  { label: 'Articles Published', value: '50+' },
  { label: 'Total Views', value: '150K+' },
  { label: 'Certifications', value: '13+' },
  { label: 'KubeCon Scholarships', value: '2x' },
]

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  type: string
  highlights: string[]
}

export const experience: Experience[] = [
  {
    id: 'devops-intern-ifs',
    title: 'DevOps Engineering Intern',
    company: 'IFS R&D International (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2024 – Oct 2024',
    type: 'Internship',
    highlights: [
      'Automated Kubernetes-native CI/CD workflows using Tekton, streamlining deployment for critical services',
      'Integrated Behave automated testing into Tekton pipelines, cutting manual debugging effort by ~30%',
      'Optimized pipeline configurations and resolved recurring build issues to improve deployment stability',
      'Ran a knowledge-sharing session on testing best practices to lift team code quality',
    ],
  },
  {
    id: 'swe-intern-ifs',
    title: 'Software Engineering Intern',
    company: 'IFS R&D International (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2020 – Dec 2020',
    type: 'Internship',
    highlights: [
      'Built a cloud security scanning application with Docker and Kubernetes to harden the container platform',
      'Integrated security scanning tools into CI/CD pipelines, improving vulnerability detection coverage',
      'Diagnosed deployment and runtime issues while authoring technical documentation for onboarding',
    ],
  },
]

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  stack: string[]
  status: 'Running' | 'Completed' | 'Archived'
  period: string
  github?: string
}

export const projects: Project[] = [
  {
    id: 'vetcare-pro',
    name: 'vetcare-pro',
    tagline: 'Smart veterinary clinic management system',
    description:
      'Full-stack veterinary platform supporting appointment, medical record, and inventory workflows, role-based access, and a SwiftUI app. ' +
      'Features a local RAG assistant (Ollama & pgvector) with intelligent SQL query routing and ML services for disease & demand forecasting.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'pgvector', 'Python', 'Flask', 'Scikit-learn', 'Ollama', 'SwiftUI'],
    status: 'Completed',
    period: 'Oct 2025 – Aug 2026',
    github: 'https://github.com/kalharatennakoon/vetcarepro',
  },
  {
    id: 'solarcast',
    name: 'solarcast',
    tagline: 'Personal solar energy forecasting app',
    description:
      'Full-stack ML app predicting monthly solar generation, grid export, and cash payouts from ' +
      "residential inverter data using Meta's Prophet with 90% confidence intervals. Interactive " +
      'React dashboard with CSV upload support.',
    stack: ['Python', 'FastAPI', 'React', 'Prophet', 'Pandas', 'REST APIs'],
    status: 'Running',
    period: 'Apr 2026 – Present',
  },
  {
    id: 'course-difficulty',
    name: 'course-difficulty-ml',
    tagline: 'Predicting course difficulty from student evaluations',
    description:
      'Supervised ML models predicting perceived course difficulty from student evaluation datasets. ' +
      'Identified instructor-related attributes as significant predictors through statistical validation ' +
      'and model interpretation.',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'SPSS', 'Statistics'],
    status: 'Completed',
    period: 'Feb 2025 – Jul 2025',
    github: 'https://github.com/kalharatennakoon/course-difficulty-analysis',
  },
  {
    id: 'k8s-scanner',
    name: 'k8s-security-scanner',
    tagline: 'Kubernetes cluster & container image security scanner',
    description:
      'Containerized security scanning solution for Kubernetes environments, detecting vulnerabilities ' +
      'in container images and cluster configurations. Wired into CI/CD pipelines via GitOps tooling ' +
      'for secure, scalable cluster operations.',
    stack: ['Kubernetes', 'Docker', 'Golang', 'ArgoCD', 'Rancher', 'AKS', 'GKE', 'Azure DevOps'],
    status: 'Completed',
    period: 'Jul 2020 – Dec 2020',
  },
  {
    id: 'hospital-appointments',
    name: 'hospital-appointments',
    tagline: 'Hospital appointment management system',
    description:
      'Appointment system with queue-based rescheduling (FIFO), stack-based cancellation history (LIFO), ' +
      'and CSV data persistence.',
    stack: ['Java', 'Data Structures', 'Queue', 'Stack', 'CSV'],
    status: 'Archived',
    period: '2023',
    github: 'https://github.com/kalharatennakoon/doctor_channeling_system',
  },
  {
    id: 'ecoride',
    name: 'ecoride',
    tagline: 'Car rental management system',
    description:
      'Java car rental platform with vehicle management, bookings, payment processing, and automated ' +
      'invoice generation.',
    stack: ['Java', 'OOP', 'File I/O', 'Data Persistence'],
    status: 'Archived',
    period: '2023',
    github: 'https://github.com/kalharatennakoon/EcoRideCarRentalSystem',
  },
]

export interface SkillGroup {
  id: string
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    items: [
      'Docker', 'Kubernetes', 'Tekton', 'ArgoCD', 'GitHub Actions',
      'Azure DevOps', 'Jenkins', 'CI/CD', 'Infrastructure as Code',
    ],
  },
  {
    id: 'cloud-platforms',
    label: 'Cloud Platforms',
    items: ['Microsoft Azure', 'AWS', 'Google Cloud', 'AKS', 'GKE', 'EKS', 'Rancher'],
  },
  {
    id: 'programming',
    label: 'Programming',
    items: ['Python', 'Golang', 'Java', 'JavaScript', 'C', 'Bash / Shell'],
  },
  {
    id: 'web-data',
    label: 'Web & Databases',
    items: ['React', 'Node.js', 'Express', 'Flask', 'REST APIs', 'PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    id: 'data-ai',
    label: 'Data & AI',
    items: ['Power BI', 'Jupyter', 'Google Colab', 'Data Cleaning', 'EDA', 'Scikit-learn'],
  },
  {
    id: 'networking',
    label: 'Networking',
    items: ['TCP/IP', 'DNS', 'Load Balancing', 'Firewalls', 'VPN', 'OSI Model'],
  },
  {
    id: 'tools-practices',
    label: 'Tools & Practices',
    items: ['Git', 'GitHub', 'Bitbucket', 'Jira', 'Confluence', 'Agile', 'Scrum', 'Kanban'],
  },
]

export interface Certification {
  name: string
  issuer: string
  date: string
  group: 'cloud-devops' | 'ai-data'
}

export const certifications: Certification[] = [
  { name: 'Containers & Kubernetes Essentials', issuer: 'IBM', date: 'Feb 2025', group: 'cloud-devops' },
  { name: 'GitHub Foundations', issuer: 'GitHub', date: 'Jan 2025', group: 'cloud-devops' },
  { name: 'Cloud DevOps', issuer: 'Intel', date: 'Jan 2025', group: 'cloud-devops' },
  { name: 'Introduction to Kubernetes', issuer: 'Linux Foundation', date: 'Dec 2024', group: 'cloud-devops' },
  { name: 'Azure Fundamentals (AZ-900)', issuer: 'Microsoft', date: 'Jan 2023', group: 'cloud-devops' },
  { name: 'Getting Started with GKE', issuer: 'Google Cloud', date: 'Jul 2020', group: 'cloud-devops' },
  { name: 'AI Technical Practitioner', issuer: 'Cisco', date: 'Mar 2026', group: 'ai-data' },
  { name: 'Google AI Professional Certificate', issuer: 'Google', date: 'Feb 2026', group: 'ai-data' },
  { name: 'Artificial Intelligence Fundamentals', issuer: 'IBM SkillsBuild', date: 'Jun 2025', group: 'ai-data' },
  { name: 'Azure Data Fundamentals (DP-900)', issuer: 'Microsoft', date: 'Nov 2024', group: 'ai-data' },
  { name: 'Azure AI Fundamentals (AI-900)', issuer: 'Microsoft', date: 'Apr 2024', group: 'ai-data' },
]

export interface Achievement {
  title: string
  detail: string
  date: string
}

export const achievements: Achievement[] = [
  {
    title: 'Dan Kohn Scholarship — KubeCon + CloudNativeCon Europe',
    detail: 'Two-time recipient of the competitive scholarship recognizing cloud-native contributions',
    date: '2025 & 2022',
  },
  {
    title: 'First Runner-Up — Hack:Bit Hackathon',
    detail: 'Second place in a competition run with Microsoft and Sarvodaya Fusion',
    date: 'Jul 2019',
  },
  {
    title: 'Top 15 Finalist — HaXmas Hackathon',
    detail: 'Selected among 75+ competing teams nationally',
    date: 'Jan 2018',
  },
  {
    title: 'Finalist — Cisco Packet Riders',
    detail: 'National finalist in the Cisco networking competition',
    date: 'Jul 2018',
  },
  {
    title: 'Cisco NetRiders — 4th in Sri Lanka, 118th in APJ',
    detail: 'Ranked across the Asia Pacific & Japan region',
    date: 'Sep 2017',
  },
]

export const education = {
  degree: 'BSc (Hons) Computer Science (Software Engineering)',
  honours: 'First Class Honours',
  university: 'Kingston University, London, United Kingdom',
  delivery: 'Delivered via ESU, Sri Lanka',
  graduation: 'September 2026',
  finalYearProject: 'VetCare Pro — Smart Veterinary Clinic Management System (Grade A, 76%)',
  coursework: [
    'Object-Oriented Programming',
    'Data Structures & Algorithms',
    'Network Security',
    'Database Design',
    'UI/UX Design',
    'Web Application Development',
    'Research & Data Analysis',
  ],
}

export interface CommunityRole {
  role: string
  org: string
  period: string
  detail: string
}

export const community: CommunityRole[] = [
  {
    role: 'Technical Writer',
    org: 'Medium',
    period: 'Dec 2021 – Present',
    detail: '50+ articles on DevOps and cloud-native topics, 150K+ total views',
  },
  {
    role: 'Volunteer',
    org: 'STEMUp Educational Foundation',
    period: 'Aug 2018 – Dec 2020',
    detail: 'Promoted STEM education and digital literacy among students and youth communities',
  },
]

/** Career timeline rendered as a commit log by the `git log` command. */
export const timeline = [
  { hash: 'a3f91c2', date: '2026-09', subject: 'release: BSc (Hons) Computer Science — First Class Honours' },
  { hash: '7d2e084', date: '2026-04', subject: 'feat(solarcast): ship ML solar forecasting app' },
  { hash: 'c15b6af', date: '2026-03', subject: 'feat(vetcare-pro): deliver final year project, Grade A' },
  { hash: '9e40d73', date: '2025-04', subject: 'award: Dan Kohn Scholarship, KubeCon EU (2nd time)' },
  { hash: '2b8c5e1', date: '2024-10', subject: 'perf(ci): cut manual debugging ~30% with Behave in Tekton' },
  { hash: 'f6a1930', date: '2024-07', subject: 'feat(ifs): join as DevOps Engineering Intern' },
  { hash: '4c7e2db', date: '2022-05', subject: 'award: Dan Kohn Scholarship, KubeCon EU (1st time)' },
  { hash: '8a0f4c6', date: '2021-12', subject: 'docs: start technical writing on Medium' },
  { hash: 'd93b7e5', date: '2020-07', subject: 'feat(ifs): join as Software Engineering Intern' },
  { hash: '1e5a8f0', date: '2017-09', subject: 'award: Cisco NetRiders — 4th in Sri Lanka' },
]

export const resumePath = '/Kalhara_Tennakoon_Resume.pdf'
