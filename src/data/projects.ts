// IMAGE IMPORTS
import learnthisLessons from '../assets/learnthis/lessons.png';
import learnthisHome from '../assets/learnthis/title.jpg';
import learnthisClipper from '../assets/learnthis/webclipper.png';
import learnthisAbout from '../assets/learnthis/about.png';

import schedulerOverview from '../assets/project-scheduler/title.jpg';
import schedulerEdit from '../assets/project-scheduler/edit.png';
import schedulerDark from '../assets/project-scheduler/darkmode.png';
import schedulerAbout from '../assets/project-scheduler/about.png';

import lightbnbOverview from '../assets/project-lightbnb/mockup.jpg';
import lightbnbMain from '../assets/project-lightbnb/screenshot-main.png';
import lightbnbSearch from '../assets/project-lightbnb/screenshot-search-main.png';
import lightbnbCurrency from '../assets/project-lightbnb/screenshot-currency.png';

import tweeterOverview from '../assets/project-tweeter/image-tweeter-mockup.jpg';
import tweeterMain from '../assets/project-tweeter/image-mainusing-desktop.png';
import tweeterCompose from '../assets/project-tweeter/image-main-compose.png';
import tweeterPagination from '../assets/project-tweeter/image-main-pagination.png';
import tweeterMobile from '../assets/project-tweeter/image-tweeter-phone.jpg';

import tinyOverview from '../assets/project-tinyapp/image-readme.png';
import tinySignin from '../assets/project-tinyapp/image-login.png';
import tinyList from '../assets/project-tinyapp/image-tinylist.png';
import tinyStats from '../assets/project-tinyapp/image-createtinyurl.png';

import mapWikiMap from '../assets/project-mapmywiki/screenshot-main.png';
import mapWikiSelect from '../assets/project-mapmywiki/screenshot-select.png';

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
  | 'jquery'
  | 'mui'
  | 'eslint'
  | 'babel'
  | 'webpack'
  | 'bootstrap'
  | 'postgres'
  | 'vite'
  | 'express';

const PROJECTS: IProject[] = [
  {
    title: 'LearnThis!',
    featured: true,
    links: {
      live: 'https://github.com',
      repo: 'https://github.com',
    },
    techIcons: ['react', 'sass', 'mui', 'postgres', 'express', 'node'],
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
          '5RLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,dfdfd quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        type: 'more|teamwork challenges...',
        value:
          'I cant say too much about there being challenges as I had  a great team to work with.  We did have some time zone differences between our group of three, but a weekly catch up meeting via Google Meet and some regular Discord chat messages were all that was required to keep the project on time and on track. Our main working system was to follow the minimal viable project (mvp) plan while myself, assuming role of project manager and front end designer/developer, was able to submit back-end/database API tickets into a shared Trello (Kanban) type board.',
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
    techIcons: ['react', 'sass', 'typescript', 'vite'],
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
    title: 'Map My Wiki',
    featured: true,
    links: {
      live: '',
      repo: 'https://github.com/ej8899/lhl-midterm',
    },
    techIcons: ['html', 'sass', 'jquery', 'postgres', 'express', 'node'],
    screenshots: [
      { url: mapWikiMap, alt: 'Map My Wiki main sccreen' },
      { url: mapWikiSelect, alt: 'selecting a map from the list' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          'Map My Wiki was a LHL mid-term project.  We were given a list of several project ideas and our group agreed upon a mapping system utilizing the Google Maps API. Originally, the plan was to have a single topic of interest that we would map and add to a database, but it was easy enough to add to the scop and allow for unlimited maps!',
      },
      {
        type: 'more|learning objectives...',
        value:
          'Some of the main learning objectives were to build upon our knowledge of jQuery, and utilizing a backend API to an SQL server along with interfacing with a third-party API. In addition, it was a good experience working with someone outside of my local time zone via Google Meet.  This complexity was easily minimized with an agreement to work simulataneously from a Kanban board style ticket system largely generated by myself (in charge of the project front end).',
      },
      {
        type: 'more|challenges...',
        value:
          'Time is of course, always a challenge.  More time would have been great so our team could have been adding more features or rolling this project out live for our bootcamp cohort to experiment with in real time. Additional challenges also included creating our own "roll-up" sections, custom "select" lists.  These things are available in well known libraries, but a challenge to make on your own - however, a very good learning experience!',
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

  {
    title: 'Light BnB',
    featured: false,
    links: {
      live: 'https://github.com',
      repo: 'https://github.com/ej8899/lightBnB',
    },
    techIcons: ['javascript', 'sass', 'jquery', 'postgres', 'express', 'node'],
    screenshots: [
      { url: lightbnbOverview, alt: 'using LightBnB application' },
      { url: lightbnbMain, alt: 'LightBnB main screen with Google Maps API' },
      { url: lightbnbSearch, alt: 'Searching in LightBnB with various options' },
      { url: lightbnbCurrency, alt: 'LightBnB supports multiple currencies!' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          'Light BnB is a Lighthouse Labs (LHL) AirBnB type clone for students to work on SQL interactions via Ajax on a client-server application build. It came with a somewhat preassembled front end that was lacking in both style and functional design since this application was primarily for backend learning.',
      },
      {
        type: 'more|learning objectives...',
        value:
          'My learning objectives were simple - take the existing project requirements and build more.  This happened with both front and back end -- by expanding and fixing the front end, I was able to build extra requirements for back-end API functions.',
      },
      {
        type: 'more|what I learned...',
        value:
          'I really went overboard with LightBnB extra feature. One thing I got heavily invested in to was Google Maps API. I  plotted LightBnB locations on the map, and not only that, but they were plotted based on search results and were also interactive on the map to also search backwards into the main application. Additionally, this use of Google Maps had me dive into caching of API results rather quickly so I could save both costs and time in repeated API calls.',
      },
    ],
    bulletPoints: ['SQL', 'Ajax', 'react-router-dom', 'vite'],
  },

  {
    title: 'Tweeter',
    featured: false,
    links: {
      live: 'https://github.com',
      repo: 'https://github.com/ej8899/tweeter',
    },
    techIcons: ['javascript', 'jquery', 'sass', 'express', 'node'],
    screenshots: [
      { url: tweeterOverview, alt: 'using Tweeter application' },
      {
        url: tweeterMain,
        alt: 'Tweeter main screen with reporting of mean Tweeters and tagging favorites',
      },
      {
        url: tweeterCompose,
        alt: 'Composing in Tweeter with input checking and dad jokes api',
      },
      {
        url: tweeterMobile,
        alt: 'Tweeter supports full responsive design for mobile use.',
      },
      {
        url: tweeterPagination,
        alt: 'Tweeter supports pagination - only required data is fetched!',
      },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          'Tweeter is a Lighthouse Labs inspired clone of Twitter (now X) designed to give students some experience in dealing with CSS via SASS, jQuery, and to expand upon our general Javascript knowledge. ',
      },
      {
        type: 'more|learning objectives...',
        value:
          'During our coursework, importance on a mobile-first development strategy was emphasized, and therefore it was important that responsive design was closely monitored with Tweeter.',
      },
      {
        type: 'more|extra features...',
        value:
          'I added numerous extra features into Tweeter like dark mode, favorites, offensive message flagging, re-Tweeter functionality and a jokes API system. Also implemented was a pagination system - fetching only additional Tweeter messages from the Node implemented data system as required.',
      },
    ],
    bulletPoints: ['SQL', 'Ajax', 'react-router-dom', 'vite'],
  },

  {
    title: 'TinyApp!',
    featured: false,
    links: {
      live: 'https://github.com',
      repo: 'https://github.com/ej8899/tinyapp',
    },
    techIcons: ['javascript', 'bootstrap', 'sass', 'express', 'node'],
    screenshots: [
      { url: tinyOverview, alt: 'using TinyApp!' },
      {
        url: tinySignin,
        alt: 'TinyApp runs a secure login system with encrypted cookies for managing logged in state.',
      },
      {
        url: tinyList,
        alt: 'View your tiny urls, edit and delete them.',
      },
      {
        url: tinyStats,
        alt: 'Full click through stats are available for each Tiny URL created!',
      },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          'TinyApp! is a Lighthouse Labs inspired clone of a typical URL shortening service (like bit.ly) designed to give students some experience in dealing with using libraries like Bootstrap, as well as user login and verification methods through persistent cookies. ',
      },
      {
        type: 'more|learning objectives...',
        value:
          'TODO add in more stuff here.  blah blah blah lfaskdjfl aslfjdl fasdl ldsfls dlfjdlfj dljfdl',
      },
      {
        type: 'more|extra features...',
        value:
          'I took the liberty to add in numerous extra features into TinyApp! on both the server and front end sides.  The server has verbose logging and a quiet mode and on the client/front end side we have a hidden menu bar if not logged in, incorrect password notification, duplicate account error checking, total click counting, unique click counting, and click through logs with graphs for each tiny URL created.',
      },
    ],
    bulletPoints: ['SQL', 'Ajax', 'react-router-dom', 'vite'],
  },
];

export default PROJECTS;
