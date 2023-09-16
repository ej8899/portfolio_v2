// IMAGE IMPORTS
import learnthisLessons from '../assets/learnthis/lessons.png';
import learnthisHome from '../assets/learnthis/title.jpg';
import learnthisClipper from '../assets/learnthis/webclipper.png';
import learnthisAbout from '../assets/learnthis/about.png';

import schedulerOverview from '../assets/project-scheduler/title.jpg';
import schedulerEdit from '../assets/project-scheduler/edit.png';
import schedulerDark from '../assets/project-scheduler/darkmode.png';
import schedulerAbout from '../assets/project-scheduler/about.png';

export interface IProject {
  title: string;
  featured: boolean;
  links?: {
    live: string;
    repo: string;
  };
  techIcons: TTech[];
  screenshots: TScreenshot[];
  // description?: { type: 'header' | 'p' | 'more'; value: string }[];
  description?: { type: string; value: string }[];
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
  | 'webpack'
  | 'postgres'
  | 'express';

const PROJECTS: IProject[] = [
  {
    title: 'LearnThis!',
    featured: true,
    links: {
      live: 'https://github.com',
      repo: 'https://github.com',
    },
    techIcons: ['react', 'sass', 'postgres', 'express', 'node'],
    screenshots: [
      { url: learnthisHome, alt: 'LearnThis! Screenshot' },
      { url: learnthisLessons, alt: 'LearnThis! Screenshot' },
      { url: learnthisClipper, alt: 'LearnThis! Screenshot' },
      { url: learnthisAbout, alt: 'LearnThis! Screenshot' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          '1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        type: 'more',
        value:
          '2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      { type: 'header', value: 'High Level Breakdown' },
      {
        type: 'p',
        value:
          '3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
      },
      {
        type: 'p',
        value:
          '4Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
      },
      {
        type: 'p',
        value:
          '5RLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
    bulletPoints: ['react-router-dom', 'react-icons', 'react-router-dom', 'vite'],
  },

  {
    title: 'filler app',
    featured: false,
    links: {
      live: 'https://github.com',
      repo: 'https://github.com',
    },
    techIcons: ['react', 'sass', 'postgres', 'express', 'node'],
    screenshots: [
      { url: learnthisHome, alt: 'LearnThis! Screenshot' },
      { url: learnthisLessons, alt: 'LearnThis! Screenshot' },
      { url: learnthisClipper, alt: 'LearnThis! Screenshot' },
      { url: learnthisAbout, alt: 'LearnThis! Screenshot' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          '1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        type: 'more|learning objectives',
        value:
          '2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      { type: 'header', value: 'High Level Breakdown' },
      {
        type: 'p',
        value:
          '3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
      },
      {
        type: 'p',
        value:
          '4Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
      },
      {
        type: 'more',
        value:
          '5RLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
    bulletPoints: ['react-router-dom', 'react-icons', 'react-router-dom', 'vite'],
  },

  {
    title: 'LHL Scheduler',
    featured: false,
    links: {
      live: 'https://github.com',
      repo: 'https://github.com/ej8899/scheduler',
    },
    techIcons: ['react', 'sass', 'postgres', 'express', 'node'],
    screenshots: [
      { url: schedulerOverview, alt: 'person using LHL Scheduler' },
      { url: schedulerAbout, alt: 'About the scheduler' },
      { url: schedulerEdit, alt: 'Edit a schedule' },
      { url: schedulerDark, alt: 'Scheduler dark mode!' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          '1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        type: 'more',
        value:
          '2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      { type: 'header', value: 'High Level Breakdown' },
      {
        type: 'p',
        value:
          '3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
      },
      {
        type: 'p',
        value:
          '4Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
      },
      {
        type: 'more',
        value:
          '5RLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
    bulletPoints: ['react-router-dom', 'react-icons', 'react-router-dom', 'vite'],
  },
];

export default PROJECTS;
