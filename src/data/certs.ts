export interface Certificates {
  certTitle: string;
  certTypes: CertType[];
  certImage: string;
  certDescription: string;
  certVerificationURL: string;
  certBy: string;
  certDate: string;
}

export type CertType =
  | 'react'
  | 'all'
  | 'redux'
  | 'typescript'
  | 'javascript'
  | 'css'
  | 'sass'
  | 'firebase'
  | 'cybersecurity'
  | 'frontend'
  | 'backend'
  | 'node'
  | 'ui/ux'
  | 'accessibility'
  | 'html'
  | 'jest'
  | 'jquery'
  | 'mui'
  | 'eslint'
  | 'babel'
  | 'webpack'
  | 'bootstrap'
  | 'vite'
  | 'sharepoint'
  | 'networking'
  | 'linux'
  | 'office'
  | 'hardware'
  | 'support'
  | 'database'
  | 'postgres'
  | 'sql'
  | 'git'
  | 'version control'
  | 'nosql'
  | 'php'
  | 'python'
  | 'environmental'
  | 'express';

const CERTS: Certificates[] = [
  {
    certTitle: 'Lighthouse Labs Web Developer',
    certTypes: ['react', 'sass', 'sql', 'database', 'express', 'node', 'frontend', 'backend'],
    certImage: '',
    certVerificationURL: '',
    certDescription: 'Certificate of Web Development Craftmanship',
    certBy: 'Lighthouse Labs',
    certDate: '2023-02-17',
  },
  {
    certTitle: 'Getting Started with Python',
    certTypes: ['python'],
    certImage: 'https://www.erniejohnson.ca/certimages/6EHWZF9VYRVZ.png',
    certVerificationURL: 'https://coursera.org/verify/6EHWZF9VYRVZ',
    certDescription: 'Introductory course on Python',
    certBy: 'University of Michigan',
    certDate: '2023-06-11',
  },
  {
    certTitle: 'Crash Course on Python',
    certTypes: ['python'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/BV683WNFW8B5',
    certDescription: 'Introductory course on Python',
    certBy: 'Google',
    certDate: '2023-10-17',
  },
  {
    certTitle: 'COP28 - Learning for a Sustainable Future',
    certTypes: ['environmental'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/TCVZLRE8VEYN',
    certDescription: 'Understanding environmental impacts of today',
    certBy: 'University of Edinburgh',
    certDate: '2023-12-01',
  },
  {
    certTitle: 'Technical Support Fundamentals',
    certTypes: ['hardware', 'support', 'networking'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/VSTGHNF8MXPZ',
    certDescription: 'Basics of IT technical support roles',
    certBy: 'Google',
    certDate: '2023-04-26',
  },
  {
    certTitle: 'Foundations of Cybersecurity',
    certTypes: ['cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/9UUPBL67RQP9',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
  },
  {
    certTitle: 'Linux & SQL',
    certTypes: ['cybersecurity', 'linux', 'sql'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/67CHRYRS9G3N',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
  },
  {
    certTitle: 'Google Cybersecurity Professional',
    certTypes: ['cybersecurity', 'linux', 'sql', 'python', 'networking', 'hardware'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/professional-cert/VDRRFKJ4ZAR8',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-21',
  },
  {
    certTitle: 'Assets, Threats & Vulnerabilities',
    certTypes: ['cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/UG8PUVCATF22',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
  },
  {
    certTitle: 'Networks & Network Security',
    certTypes: ['cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/UVHVXU885QDX',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
  },
  {
    certTitle: 'Detection & Response',
    certTypes: ['cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/V4TJRYHH85V6',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-20',
  },
  {
    certTitle: 'Version Control',
    certTypes: ['git', 'version control'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/RPMCXVANDD2D',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-04-28',
  },
  {
    certTitle: 'React Basics',
    certTypes: ['react', 'frontend'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/TBU24BKURZPZ',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-04-28',
  },
  {
    certTitle: 'Programming with Javascript',
    certTypes: ['javascript', 'frontend', 'html', 'css', 'ui/ux'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/DZQKJJUK5KPQ',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-04-28',
  },
  {
    certTitle: 'Introduction to Back-End Development',
    certTypes: ['javascript', 'backend', 'html', 'css'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/L27644FUTU2Q',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-09-16',
  },
  {
    certTitle: 'HTML and CSS in Depth',
    certTypes: ['frontend', 'html', 'css'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/UA3UTY5DTWHW',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-04-29',
  },
  {
    certTitle: 'Introduction to Front-End Development',
    certTypes: ['javascript', 'frontend', 'html', 'css'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/9WVRYMN7C635',
    certDescription: '',
    certBy: 'Meta',
    certDate: '2023-09-16',
  },
  {
    certTitle: 'Automate Cybersecurity Tasks with Python',
    certTypes: ['python', 'cybersecurity'],
    certImage: '',
    certVerificationURL: 'https://coursera.org/verify/YGF9VT59V242',
    certDescription: '',
    certBy: 'Google',
    certDate: '2023-04-21',
  },
];

export default CERTS;
