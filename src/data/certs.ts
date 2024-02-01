export interface Certificates {
  certTitle: string;
  certTypes: CertType[];
  certImage: string;
  certDescription: string;
  certVerificationURL: string;
  certBy: string;
  certDate: string;
  certType: string; // 'primary' or 'secondary'
  certStatus: string;
}

export type CertType =
  | 'accessibility'
  | 'ai'
  | '.all'
  | 'api'
  | 'appsec'
  | 'automation'
  | 'aws'
  | 'azure'
  | 'babel'
  | 'backend'
  | 'bootstrap'
  | 'cloud'
  | 'css'
  | 'cybersecurity'
  | 'cryptography'
  | 'database'
  | 'debugging'
  | 'environmental'
  | 'eslint'
  | 'express'
  | 'firebase'
  | 'frontend'
  | 'game dev'
  | 'go'
  | 'git'
  | 'hacking'
  | 'hardware'
  | 'html'
  | 'jest'
  | 'jquery'
  | 'javascript'
  | 'linux'
  | 'microsoft'
  | 'm365'
  | 'middleware'
  | 'mongodb'
  | 'mui'
  | 'networking'
  | 'node'
  | 'nosql'
  | 'office'
  | 'php'
  | 'postgres'
  | 'project management'
  | 'python'
  | 'react'
  | 'redux'
  | 'ruby'
  | 'sass'
  | 'sharepoint'
  | 'soft skills'
  | 'sql'
  | 'support'
  | 'testing'
  | 'typescript'
  | 'ui/ux'
  | 'version control'
  | 'vite'
  | 'webpack';

const CERTS: Certificates[] = [
  {
    certTitle: 'Lighthouse Labs Web Developer',
    certTypes: [
      'react',
      'sass',
      'sql',
      'express',
      'git',
      'node',
      'frontend',
      'backend',
      'css',
      'api',
      'middleware',
      'html',
      'version control',
      'postgres',
      'database',
      'jquery',
      'eslint',
      'ruby',
      'testing',
    ],
    certImage: '',
    certVerificationURL:
      'https://ejnotes.notion.site/Lighthouse-Labs-Web-Development-feb5124870f44594a9ef4a07c5b10d4b?pvs=4',
    certDescription: 'Certificate of Web Development Craftmanship',
    certBy: 'Lighthouse Labs',
    certDate: '2023-02-17',
    certType: 'primary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Getting Started with Python',
    certTypes: ['python'],
    certImage: 'https://www.erniejohnson.ca/certimages/6EHWZF9VYRVZ.png',
    certVerificationURL: 'https://coursera.org/verify/6EHWZF9VYRVZ',
    certDescription: 'Introductory course on Python',
    certBy: 'University of Michigan',
    certDate: '2023-06-11',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Crash Course on Python',
    certTypes: ['python'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/BV683WNFW8B5',
    certDescription: 'Introductory course on Python',
    certBy: 'Google',
    certDate: '2023-10-17',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'COP28 - Learning for a Sustainable Future',
    certTypes: ['environmental', 'soft skills'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/TCVZLRE8VEYN',
    certDescription: 'Understanding environmental impacts of today',
    certBy: 'University of Edinburgh',
    certDate: '2023-12-01',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Technical Support Fundamentals',
    certTypes: ['hardware', 'support', 'networking'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/VSTGHNF8MXPZ',
    certDescription: 'Basics of IT technical support roles',
    certBy: 'Google',
    certDate: '2023-04-26',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Foundations of Cybersecurity',
    certTypes: ['cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/9UUPBL67RQP9',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Linux & SQL',
    certTypes: ['cybersecurity', 'linux', 'sql'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/67CHRYRS9G3N',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Google Cybersecurity Professional',
    certTypes: ['cybersecurity', 'linux', 'sql', 'python', 'networking', 'hardware'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/professional-cert/VDRRFKJ4ZAR8',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-21',
    certType: 'primary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Assets, Threats & Vulnerabilities',
    certTypes: ['cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/UG8PUVCATF22',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Networks & Network Security',
    certTypes: ['cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/UVHVXU885QDX',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Detection & Response',
    certTypes: ['cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/V4TJRYHH85V6',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Version Control',
    certTypes: ['git', 'version control'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/RPMCXVANDD2D',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-04-28',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'React Basics',
    certTypes: ['react', 'frontend'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/TBU24BKURZPZ',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-04-28',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Programming with Javascript',
    certTypes: ['javascript', 'frontend', 'html', 'css', 'ui/ux'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/DZQKJJUK5KPQ',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-04-28',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Introduction to Back-End Development',
    certTypes: ['javascript', 'backend', 'html', 'css', 'api', 'middleware'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/L27644FUTU2Q',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-09-16',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'HTML and CSS in Depth',
    certTypes: ['frontend', 'html', 'css'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/UA3UTY5DTWHW',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-04-29',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Introduction to Front-End Development',
    certTypes: ['javascript', 'frontend', 'html', 'css'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/9WVRYMN7C635',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-09-16',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Automate Cybersecurity Tasks with Python',
    certTypes: ['python', 'cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/YGF9VT59V242',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-21',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Getting Started in MS SharePoint',
    certTypes: ['office', 'sharepoint'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/9EKT2WG694CJ',
    certDescription: '',
    certBy: 'Coursera Project Network',
    certDate: '2023-04-21',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Manage Security Risks',
    certTypes: ['cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify//9Y8D4ZEE4JL',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'How Social-Emotional Skills Bring Success at Work',
    certTypes: ['soft skills'],
    certImage: '',
    certVerificationURL: '',
    certDescription: '',
    certBy: 'Ottawa Chinese Community Service Centre',
    certDate: '2023-04-04',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Ethical Hacking for IT and OT',
    certTypes: ['cybersecurity', 'hacking'],
    certImage: 'none',
    certVerificationURL: 'none',
    certDescription: '',
    certBy: 'CIP Cyber',
    certDate: '2023-12-09',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'PMP Basics',
    certTypes: ['project management', 'soft skills'],
    certImage: 'none',
    certVerificationURL: 'https://simpli-web.app.link/e/zlFTYMrMoFb',
    certDescription: '',
    certBy: 'Simplilearn',
    certDate: '2023-12-09',
    certType: 'primary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Getting Started with MongoDB Atlas',
    certTypes: ['nosql', 'mongodb', 'database'],
    certImage: 'none',
    certVerificationURL:
      'https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/6c1285f7-70df-4474-8d11-903343435202-ernie-johnson-439eaf3b-93e5-451c-8d12-54a058dc4c0f-certificate.pdf',
    certDescription: '',
    certBy: 'MongoDB',
    certDate: '2023-10-28',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'MongoDB and the Document Model',
    certTypes: ['nosql', 'mongodb', 'database'],
    certImage: 'none',
    certVerificationURL:
      'https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/6c1285f7-70df-4474-8d11-903343435202-ernie-johnson-4ba3ec9b-d036-449b-94b0-7fc2689923c1-certificate.pdf',
    certDescription: '',
    certBy: 'MongoDB',
    certDate: '2023-10-28',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Connecting to a MongoDB Database',
    certTypes: ['nosql', 'mongodb', 'database'],
    certImage: 'none',
    certVerificationURL:
      'https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/6c1285f7-70df-4474-8d11-903343435202-ernie-johnson-4a8e8b2b-03b1-4222-bd16-48c7317e4986-certificate.pdf',
    certDescription: '',
    certBy: 'MongoDB',
    certDate: '2023-10-28',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Learn Python with Games',
    certTypes: ['python', 'game dev'],
    certImage: 'none',
    certVerificationURL: 'none',
    certDescription: '',
    certBy: 'Udemy',
    certDate: 'in progress',
    certType: 'primary',
    certStatus: 'inprogress',
  },
  {
    certTitle: 'IT Support Professional',
    certTypes: ['hardware', 'support', 'networking'],
    certImage: 'none',
    certVerificationURL: 'none',
    certDescription: '',
    certBy: 'Google',
    certDate: 'in progress',
    certType: 'primary',
    certStatus: 'inprogress',
  },
  {
    certTitle: 'IT Automation with Python',
    certTypes: ['python', 'automation'],
    certImage: 'none',
    certVerificationURL: 'none',
    certDescription: '',
    certBy: 'Google',
    certDate: 'in progress',
    certType: 'primary',
    certStatus: 'inprogress',
  },
  {
    certTitle: 'Meta Front End Developer Professional',
    certTypes: ['frontend', 'react', 'html', 'javascript', 'css'],
    certImage: 'none',
    certVerificationURL: 'none',
    certDescription: '',
    certBy: 'Meta',
    certDate: 'in progress',
    certType: 'primary',
    certStatus: 'inprogress',
  },
  {
    certTitle: 'Introduction to Microsoft Azure',
    certTypes: ['azure', 'cloud'],
    certImage: 'none',
    certVerificationURL: 'https://coursera.org/verify/Q79KDW2UWR9F',
    certDescription: '',
    certBy: 'Microsoft',
    certDate: '2023-12-16',
    certType: 'primary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Introduction to AWS Cloud',
    certTypes: ['aws', 'cloud'],
    certImage: 'none',
    certVerificationURL: 'none',
    certDescription: '',
    certBy: 'Amazon Web Services',
    certDate: 'in progress',
    certType: 'primary',
    certStatus: 'inprogress',
  },
  {
    certTitle: 'AWS Cloud Technology Consultant Specialization',
    certTypes: ['aws', 'cloud'],
    certImage: 'none',
    certVerificationURL: 'none',
    certDescription: '',
    certBy: 'Amazon Web Services',
    certDate: 'in progress',
    certType: 'primary',
    certStatus: 'inprogress',
  },
  {
    certTitle: 'Introduction to Git and GitHub',
    certTypes: ['version control', 'git'],
    certImage: 'none',
    certVerificationURL: 'https://coursera.org/verify/6NK2ABTHVW4Z',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-12-16',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Troubleshooting & Debugging Techniques',
    certTypes: ['testing', 'debugging', 'python'],
    certImage: 'none',
    certVerificationURL: 'https://coursera.org/verify/JFMVA6EB6ETS',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-12-16',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Applied Python Cryptography',
    certTypes: ['cryptography', 'cybersecurity', 'python', 'hacking'],
    certImage: 'none',
    certVerificationURL:
      'https://codered.eccouncil.org/certificate/78f022f0-672d-433b-8493-012cd5eab56d',
    certDescription: '',
    certBy: 'EC Council',
    certDate: '2023-12-17',
    certType: 'secondary',
    certStatus: 'complete',
  },
  {
    certTitle: 'Deep Web and Cybersecurity',
    certTypes: ['cybersecurity', 'python', 'hacking'],
    certImage: 'none',
    certVerificationURL: '',
    certDescription: '',
    certBy: 'EC Council',
    certDate: 'in progress',
    certType: 'secondary',
    certStatus: 'inprogress',
  },
  {
    certTitle: 'Getting Started with Go',
    certTypes: ['go'],
    certImage: 'none',
    certVerificationURL: 'https://coursera.org/verify/88GW4ZJYVP5K',
    certDescription: '',
    certBy: 'University of California',
    certDate: '2023-12-18',
    certType: 'secondary',
    certStatus: 'primary',
  },
  {
    certTitle: 'Application Security Foundations Level 1',
    certTypes: ['cybersecurity', 'appsec'],
    certImage: 'none',
    certVerificationURL: '',
    certDescription: '',
    certBy: 'We Hack Purple',
    certDate: 'in progress',
    certType: 'primary',
    certStatus: 'primary',
  },
  {
    certTitle: 'API Security',
    certTypes: ['cybersecurity', 'appsec', 'api'],
    certImage: 'none',
    certVerificationURL:
      'https://ejnotes.notion.site/api-security-mini-course-c768ee5e705c4911a25788bf0ddf716a?pvs=4',
    certDescription: '',
    certBy: 'We Hack Purple',
    certDate: '2023-12-20',
    certType: 'primary',
    certStatus: 'primary',
  },
  {
    certTitle: 'Functions, Methods and Interfaces in Go',
    certTypes: ['go'],
    certImage: 'none',
    certVerificationURL: '',
    certDescription: '',
    certBy: 'University of California',
    certDate: '2023-12-23',
    certType: 'secondary',
    certStatus: 'primary',
  },
  {
    certTitle: 'Pair Programming with an LLM',
    certTypes: ['ai'],
    certImage: 'none',
    certVerificationURL:
      'https://ejnotes.notion.site/Pair-Programming-with-a-Large-Language-Model-296956d1d0174e46ad993d96d54dd502?pvs=4',
    certDescription: '',
    certBy: 'DeepLearning.AI',
    certDate: '2023-12-26',
    certType: 'secondary',
    certStatus: 'primary',
  },
  {
    certTitle: 'ChatGPT Prompt Engineering for Developers',
    certTypes: ['ai'],
    certImage: 'none',
    certVerificationURL:
      'https://ejnotes.notion.site/chatGPT-Prompt-Engineering-for-Developers-2ae3bf7db10b45c59dbc3b04ef269920?pvs=4',
    certDescription: '',
    certBy: 'DeepLearning.AI',
    certDate: '2023-12-27',
    certType: 'secondary',
    certStatus: 'primary',
  },
  {
    certTitle: 'Introduction to Generative AI',
    certTypes: ['ai'],
    certImage: 'none',
    certVerificationURL:
      'https://ejnotes.notion.site/Introduction-to-Generative-AI-f37c5db240884699bd395c757a964a2f?pvs=4',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-12-27',
    certType: 'secondary',
    certStatus: 'primary',
  },
  {
    certTitle: 'M365 Fundamentals',
    certTypes: ['m365', 'microsoft'],
    certImage: 'none',
    certVerificationURL:
      'https://ejnotes.notion.site/m365-fundamentals-7cf788c5415e48d4828543c37acb25a9?pvs=4',
    certDescription: '',
    certBy: '',
    certDate: '2024-01-24',
    certType: 'secondary',
    certStatus: 'primary',
  },
];

export default CERTS;
