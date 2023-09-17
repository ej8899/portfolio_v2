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
    title: 'Our Portfolio',
    featured: true,
    links: {
      live: 'http://erniejohnson.ca',
      repo: 'https://github.com/ej8899/portfolio_v2',
    },
    techIcons: ['react', 'sass', 'typescript'],
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
          'It was important to assemble a quick portfolio in order to talk more about who I am and what I work with for my web development projects as well as continue on learning by doing with actual live projects.',
      },
      {
        type: 'more|learning objectives...',
        value:
          'I was looking largely to just continue my knowledge of React by putting things into a new project and let it build out as required to complete a full portfolio site.  In addition, I wanted to expand upon my CSS skills with some more advanced SCSS functionality, and work with some minimal Typescript code.  I am quite familiar with Typed code, but had not really utilitized Typescript prior to this.',
      },
      {
        type: 'more|challenges...',
        value:
          'I should have written an MVP (minimal viable product) plan for the portfolio site. Along the way of developing the portfolio site, there were always new things I wanted to add or otherwise incorporate.  The ChatBot add-in was a good example - a simple idea for an extra has turned itself into an entirely new project within the portfolio project itself!  Note to self: Create and follow your MVP!',
      },
    ],
    bulletPoints: ['react-router-dom', 'react-icons', 'react-router-dom', 'vite'],
  },

  {
    title: 'Scheduler',
    featured: true,
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
          'The Lighthouse Labs (LHL) Scheduler app was a project meant to put our introductory skills in React to use and build upon our knowledge of JavaScript. In addition, the Scheduler app was an introduction to Storybook testing as well as to build upon our skills in Jest and Cypress test platforms.',
      },
      {
        type: 'more|learning objectives...',
        value:
          'Like most of the LHL projects to date, I wanted to take this one further and learn more about React and the benefits a React based front-end can offer.  I took the base LHL project files, cleaned up some css styling and added some extra functionality such as a re-usable modal window component, learned about implementing dark mode themeing via React Context and additionally built out my own drag and drop core handler so a user could merely drag and drop to adjust schedules.',
      },
      {
        type: 'more|what I learned...',
        value:
          'I needed to learn some additional, more advanced methods in React for state, state management and context. Additionally, while working heavily in the testing components, it was reinforced to utilize appropriate test methods and even coding practices to avoid things that a third party may choose to adjust such as system colors, fonts, etc. I had found it odd that some information I would normally assign in variables was hard coded along the way, and this turned out to be specifically for testing.',
      },
    ],
    bulletPoints: ['react-router-dom', 'react-icons', 'react-router-dom', 'vite'],
  },
];

export default PROJECTS;
