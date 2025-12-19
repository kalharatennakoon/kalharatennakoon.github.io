function Certifications() {
  const certifications = [
    {
      title: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft',
      date: 'AZ-900',
      credentialUrl: 'https://www.credly.com/badges/1cd00bda-ffc7-467f-83a9-c8f7c9702be7/public_url'
    },
    {
      title: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      date: 'AI-900',
      credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/1C53DDEE0DB410A4?sharingId=87BD701455AA18AA'
    },
    {
      title: 'Microsoft Certified: Azure Data Fundamentals',
      issuer: 'Microsoft',
      date: 'DP-900',
      credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/38133387373C82E1?sharingId=87BD701455AA18AA'
    },
    {
      title: 'GitHub Foundations',
      issuer: 'GitHub',
      date: '2024',
      credentialUrl: 'https://www.credly.com/badges/91239f31-74c8-4175-93a0-0855efb3c46e/public_url'
    },
    {
      title: 'Gemini Certified Educator',
      issuer: 'Google for Education',
      date: '2024',
      credentialUrl: 'https://edu.google.accredible.com/ae8c5710-9e25-4048-82d5-8e2f15288978'
    },
    {
      title: 'Gemini Certified University Student',
      issuer: 'Google for Education',
      date: '2024',
      credentialUrl: 'https://edu.google.accredible.com/fd37035c-4b98-4d55-a083-80fbb8a7ad57'
    },
    {
      title: 'Introduction to Kubernetes',
      issuer: 'The Linux Foundation',
      date: '2024',
      credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/ff96589e-6699-4b22-847c-d9ec38812b30-t-m-kalhara-tennakoon-5b479bc0-2836-48c1-8abc-35ad7de91aa7-certificate.pdf'
    },
    {
      title: 'Introduction to GitOps',
      issuer: 'The Linux Foundation',
      date: '2024',
      credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/26a061f2-539e-41a7-9e6a-8ee41a2d21ca-t-m-kalhara-randil-bandara-tennakoon-d03dccea-4781-4578-9d2c-de8fa9c0f7db-certificate.pdf'
    },
    {
      title: 'Getting Started with Google Kubernetes Engine',
      issuer: 'Google Cloud',
      date: '2024',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/KHP2Z9NZ9FY7'
    },
    {
      title: 'AWS Fundamentals: Going Cloud-Native',
      issuer: 'AWS',
      date: '2024',
      credentialUrl: 'https://coursera.org/share/a527b8fa5b14962328c02a3c3e8b54f9'
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      date: '2024',
      credentialUrl: 'https://www.credly.com/badges/9061852c-fdf7-4219-926b-523d30a31111'
    },
    {
      title: 'Career Essentials in Generative AI',
      issuer: 'Microsoft and LinkedIn',
      date: '2024',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/3df7542a5c778a0e3e180571caf85ba59fb4a1afddbf58ea438e2e1badf72d80'
    }
  ]

  return (
    <section id="certifications" className="py-20 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center text-[var(--text-primary)] font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          Certifications
        </h2>
        
        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(102,126,234,0.08)] to-[rgba(118,75,162,0.08)] rounded-full border-2 border-[rgba(102,126,234,0.2)] dark:from-[rgba(102,126,234,0.12)] dark:to-[rgba(118,75,162,0.12)] dark:border-[rgba(102,126,234,0.3)]">
          <span className="text-2xl flex-shrink-0">🎓</span>
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Cloud Platforms • DevOps • Security • Modern Development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div 
              key={cert.title} 
              className="group bg-[var(--card-bg)] p-8 rounded-2xl shadow-[0_4px_15px_var(--shadow)] transition-all duration-300 border-l-4 border-[#667eea] hover:-translate-y-3 hover:shadow-[0_12px_35px_rgba(102,126,234,0.25)] hover:border-[#764ba2] backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(102,126,234,0.03)] to-[rgba(118,75,162,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-xl mb-3 text-[var(--text-primary)] font-bold relative z-10">
                {cert.title}
              </h3>
              <p className="text-base text-[#667eea] font-semibold mb-2 relative z-10">
                {cert.issuer}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-4 relative z-10">
                {cert.date}
              </p>
              <a 
                href={cert.credentialUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-[#667eea] font-semibold text-sm transition-all hover:text-[#764ba2] group-hover:gap-2 relative z-10"
              >
                View Credential
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
