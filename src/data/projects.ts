import comedyComedian from '../assets/comedy/comedian-page.jpg';
import comedyHome from '../assets/comedy/home-page.jpg';

export interface IProject {
  title: string;
  featured: boolean;
  links?: {
    live: string;
    repo: string;
  };
  techIcons: TTech[];
  screenshots: TScreenshot[];
  description?: { type: 'header' | 'p'; value: string }[];
  bulletPoints?: string[];
}

export type TScreenshot = {
  url: string;
  alt: string;
};

type TTech =
  | 'react'
  | 'redux'
  | 'typescript'
  | 'javascript'
  | 'css'
  | 'sass'
  | 'firebase'
  | 'node'
  | 'html'
  | 'jest'
  | 'eslint'
  | 'babel'
  | 'webpack';

const PROJECTS: IProject[] = [
  {
    title: 'LearnThis!',
    featured: true,
    links: {
      live: 'https://github.com',
      repo: 'https://github.com',
    },
    techIcons: ['react', 'sass', 'firebase', 'node'],
    screenshots: [
      { url: comedyHome, alt: 'The Comedy DB Desktop Home Screenshot' },
      { url: comedyComedian, alt: 'The Comedy DB Desktop Special Screenshot' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        type: 'p',
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      { type: 'header', value: 'High Level Breakdown' },
      {
        type: 'p',
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
      },
      {
        type: 'p',
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
      },
      {
        type: 'p',
        value:
          'RLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
    bulletPoints: ['react-router-dom', 'react-icons', 'react-router-dom', 'vite'],
  },
];

export default PROJECTS;
