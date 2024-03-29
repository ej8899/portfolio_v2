/* eslint-disable import/no-unresolved */
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

import yourtab6 from '../assets/project-yourtab/yourtab6.png';
import yourtab2 from '../assets/project-yourtab/yourtab2.png';
import yourtab3 from '../assets/project-yourtab/yourtab3.png';
import yourtab4 from '../assets/project-yourtab/yourtab4.png';
import yourtab5 from '../assets/project-yourtab/yourtab-design.png';

import portfolio1 from '../assets/project-portfolio/meetingtitle.jpg';
import portfolio2 from '../assets/project-portfolio/scr1.png';
import portfolio3 from '../assets/project-portfolio/scr2.png';
import portfolio4 from '../assets/project-portfolio/scr3.png';
import portfolio6 from '../assets/project-portfolio/scr5.jpg';

import loga1 from '../assets/project-loga/smartmockups.png';
import loga2 from '../assets/project-loga/SCR-20240109-hwjj.png';
import loga3 from '../assets/project-loga/SCR-20240109-hwpu.png';

import k1 from '../assets/project-kiosk/1.jpg';
import k2 from '../assets/project-kiosk/2.jpg';
import k3 from '../assets/project-kiosk/3.jpg';

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
  | 'php'
  | 'python'
  | 'tailwind'
  | 'express';

const PROJECTS: IProject[] = [
  {
    title: 'LearnThis!',
    featured: true,
    links: {
      live: '',
      repo: 'https://github.com/ej8899/lhlfinals',
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
          'As I delve further into my web and application development career, I constantly find myself collecting bits of information - learning materials, reference items, and so on. The need for a bookmarking system presented itself, BUT I wanted this to be different than just a bookmarking and organizing tool.',
      },
      {
        type: 'p',
        value:
          'As material was added to LearnThis!, I wanted to create a learning componenet to this information.  As a result, we developed some back-end algorithms to assemble bookmarked materials in a logic learning order for beginners, intermediate and advanced learners.  This information is assembled based on the end users desires, as well as recommended ratings and rankings by other users - effectively giving the end users intelligent steps to learn various materials.  Essentially, we have a "cloud sourced" learning system!',
      },
      {
        type: 'more|extra features',
        value:
          'What good is a data collection tool such as this without a quick way to get information into it?  As the front-end lead developer on this project, I took it upon myself to quickly assemble a Chrome browser extension tool so that we could collect information quickly and accurately.  A data parsing system was also implemented to assist the user in categorizing information.',
      },
      {
        type: 'more|teamwork challenges',
        value:
          'I cant say too much about there being challenges as I had  a great team to work with.  We did have some time zone differences between our group of three, but a weekly catch up meeting via Google Meet and some regular Discord chat messages were all that was required to keep the project on time and on track. Our main working system was to follow the minimal viable project (mvp) plan while myself, assuming role of project manager and front end designer/developer, was able to submit back-end/database API tickets into a shared Trello (Kanban) type board.',
      },
      {
        type: 'more|technical features',
        value:
          '<ul><li>google fonts<li>materialUI<li>youtube api<li>chatGPT<li>postgresql database<li>node.js<li>react</ul>',
      },
    ],
    bulletPoints: [],
  },

  {
    title: 'Our Portfolio',
    featured: true,
    links: {
      live: 'http://erniejohnson.ca',
      repo: 'https://github.com/ej8899/portfolio_v2',
    },
    techIcons: ['react', 'sass', 'typescript', 'vite', 'python'],
    screenshots: [
      { url: portfolio1, alt: 'web site for a meeting' },
      { url: portfolio2, alt: 'blog section  (with python backend)' },
      { url: portfolio3, alt: 'built in chat bot' },
      { url: portfolio4, alt: 'modals of extra information' },
      { url: portfolio6, alt: 'Kanban workflow process using Notion' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          'It was important to assemble a quick portfolio in order to talk more about who I am and what I work with for my web development projects as well as continue on learning by doing with actual live projects.',
      },
      {
        type: 'p',
        value:
          'My "quick" portfolio idea quickly turned into something much more, and to this day I try to remain actively developing new features within it.',
      },
      {
        type: 'more|learning objectives',
        value:
          'I was looking largely to just continue my knowledge of React by putting things into a new project and let it build out as required to complete a full portfolio site.  In addition, I wanted to expand upon my CSS skills with some more advanced SCSS functionality, and work with some minimal Typescript code.  I am quite familiar with Typed code, but had not really utilitized Typescript prior to this.',
      },
      {
        type: 'more|challenges',
        value:
          'I should have written an MVP (minimal viable product) plan for the portfolio site. Along the way of developing the portfolio site, there were always new things I wanted to add or otherwise incorporate.  The ChatBot add-in was a good example - a simple idea for an extra has turned itself into an entirely new project within the portfolio project itself!  Note to self: Create and follow your MVP!',
      },
      {
        type: 'more|technical features',
        value:
          '<ul><li>google fonts<li>chatGPT<li>vite<li>image optimization<li>Python (blog backend)</ul>',
      },
    ],
    bulletPoints: [],
  },

  {
    title: 'Front End Log Analysis',
    featured: true,
    links: {
      live: 'http://erniejohnson.ca/loga',
      repo: 'https://github.com/ej8899/ej-loga',
    },
    techIcons: ['react', 'tailwind', 'python'],
    screenshots: [
      { url: loga1, alt: 'Meeting to review Log Analysis' },
      { url: loga2, alt: 'Initial dashboard with light mode in Tailwind CSS' },
      { url: loga3, alt: 'Using Flowbite library to make layout quick and easy!' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          'With Single Page Applications (SPAs), we dont get the same server interactivity and logging as we would with a multi-page or server rendered application. To compensate for this, and to provide some additional information about users on my SPA sites, I decided to create a simple front-end logging application.',
      },
      {
        type: 'p',
        value:
          'Orignally, the logging API was a simple Python script and some simple Javascript inserted on the front-end applications to send data to the API for logging. As I started collecting log data, having a method to review the data was paramount.  I then proceeded to allow the Python to server-side render log data.  As data continued to collect, I decided to turn back to React and create a fully-functional front-end for the API data.',
      },
      {
        type: 'more|learning objectives',
        value:
          'Learning objectives were initially to just expand on my day-to-day programming in Python.  Once I decided a fully-featured front-end, could be useful, I thought it would be usefull to incorporate Tailwind CSS into the project as a learning experiment.',
      },
      {
        type: 'more|challenges',
        value:
          'Finding a finish point for the front-end application is proving difficult as I continue to collect log data. It will be important to work on additional logging and alerting features as time goes on. Full log management from the front end should also get implemented including archiving, deleting, saving logs.',
      },
      {
        type: 'more|technical features',
        value: '<ul><li>google fonts<li>chatGPT<li>vite<li>Python (API backend)</ul>',
      },
    ],
    bulletPoints: [],
  },

  {
    title: 'Company Kiosk',
    featured: true,
    links: {
      live: 'https://erniejohnson.ca/clients/kiosk-demo/',
      repo: 'https://github.com/ej8899/mykiosk',
    },
    techIcons: ['react', 'tailwind', 'php'],
    screenshots: [
      { url: k1, alt: 'Main Kiosk display screen' },
      { url: k2, alt: 'Kiosk app rotates through multiple secondary screens.' },
      { url: k3, alt: 'Kiosk app is made to display on a Raspberry PI and dedicated screen.' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          'Our client was looking for an internal kiosk type application to present upcoming events and information to both staff and visitors to the office on various screens throughout their business environment.  The client was looking for a simple, yet effective solution that would be easy to maintain and update.',
      },
      {
        type: 'more|requirements',
        value:
          'The only real requirements were to have a method for easy and quick updates of all displays this will be deployed to.   We opted for a remote configuration file that the application fetches from every 60 minutes to ensure any changes are deployed as quickly as reasonable.  In addition, some PHP middleware was written to interface with a third party weather API was created and deployed for security purposes.',
      },
      {
        type: 'more|features',
        value:
          'Although not a project requirement, we wanted to implement a screen-saver type function to prevent any possibility of display burn in.  We opted to solve this by a) rotating background images every few minutes and b) rotating through different screens showcasing various information.  The screens were designed to be as simple as possible and to be easy to maintain and update.',
      },
      {
        type: 'more|deployment',
        value:
          'Our code was written to microSD cards and deployed across the company displays via low-energy Raspberry PI units. Photos and configuration data pulls from a central locked directory on their web server.',
      },
      {
        type: 'more|technical features',
        value:
          '<ul><li>google fonts<li>flowbite UI library (with TailwindCSS)<li>PHP middleware for weather API interface<li>server hosted config file for easy, remote updates</ul>',
      },
    ],
    bulletPoints: [],
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
          'Map My Wiki was a group based LHL mid-term project.  We were given a list of several project ideas and our group agreed upon a mapping system utilizing the Google Maps API. Originally, the plan was to have a single topic of interest that we would map and add to a database, but it was easy enough to add to the scop and allow for unlimited maps!',
      },
      {
        type: 'more|learning objectives',
        value:
          'Some of the main learning objectives were to build upon our knowledge of jQuery, and utilizing a backend API to an SQL server along with interfacing with a third-party API. In addition, it was a good experience working with someone outside of my local time zone via Google Meet.  This complexity was easily minimized with an agreement to work simulataneously from a Kanban board style ticket system largely generated by myself (in charge of the project front end).',
      },
      {
        type: 'more|challenges',
        value:
          'I ran as team lead for this project as well as the front-end developer and my team members were great - little to no challenges existed in our team dynamic.   More time though would have been great so our team could have been adding more features or rolling this project out live for our bootcamp cohort to experiment with in real time. Additional challenges also included creating our own "roll-up" sections, custom "select" lists.  These things are available in well known libraries, but a challenge to make on your own - however, a very good learning experience!',
      },
      {
        type: 'more|technical features',
        value: '<ul><li>google fonts<li>google maps api<li>fontawesome<li>ajax</ul>',
      },
    ],
    bulletPoints: [],
  },

  {
    title: 'YourTab!',
    featured: true,
    links: {
      live: 'https://chrome.google.com/webstore/detail/lnakjbaboaknheaialecgjokpbgoljdc',
      repo: 'https://github.com/ej8899/newtab',
    },
    techIcons: ['javascript', 'css', 'php'],
    screenshots: [
      { url: yourtab6, alt: 'main view of YourTab!' },
      { url: yourtab2, alt: 'Do not like an image? Just block it!' },
      { url: yourtab3, alt: 'Settings to adjust your images, and other items!' },
      { url: yourtab4, alt: 'Calendar, events and many more mini apps included!' },
      { url: yourtab5, alt: 'Rough sketch-up of the proposed design' },
    ],
    description: [
      { type: 'header', value: 'The Inspiration' },
      {
        type: 'p',
        value:
          'This project stemmed off a freelance "new tab" page I had recently completed for a corporate client. I wanted to simply take that framework, add on a few features and make it publically usable. Besides, every developer project needs a to do list application in it - so why not put a to do list inside a more significant application!',
      },
      {
        type: 'more|interesting features',
        value:
          'Although the Chrome App Store does manage versions and push them to the end user, I did develop a hosted app version management system that will alert the end user if they are behind and prompt them to update.  YourTab fetches an update JSON once a day that contains version and change log information for the user.  An alert "badge" is displayed if there is newer version than being used.',
      },
      {
        type: 'more|what I learned',
        value:
          'Pushing the app into production with my PHP middleware also required me to work with .htaccess for environment variables and access rights. The PHP middleware will allow me to apply rate limits over and above the service provider limits and afford opportunity for additional user tracking in the future.',
      },
      {
        type: 'more|technical features',
        value: '<ul><li>google fonts<li>local storage<li>unsplash api<li>weather api</uL>',
      },
    ],
    bulletPoints: [],
  },

  {
    title: 'Scheduler',
    featured: true,
    links: {
      live: '',
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
        type: 'more|learning objectives',
        value:
          'Like most of the LHL projects to date, I wanted to take this one further and learn more about React and the benefits a React based front-end can offer.  I took the base LHL project files, cleaned up some css styling and added some extra functionality such as a re-usable modal window component, learned about implementing dark mode themeing via React Context and additionally built out my own drag and drop core handler so a user could merely drag and drop to adjust schedules.',
      },
      {
        type: 'more|what I learned',
        value:
          'I needed to learn some additional, more advanced methods in React for state, state management and context. Additionally, while working heavily in the testing components, it was reinforced to utilize appropriate test methods and even coding practices to avoid things that a third party may choose to adjust such as system colors, fonts, etc. I had found it odd that some information I would normally assign in variables was hard coded along the way, and this turned out to be specifically for testing.',
      },
    ],
    bulletPoints: [],
  },

  {
    title: 'Light BnB',
    featured: false,
    links: {
      live: '',
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
        type: 'more|learning objectives',
        value:
          'My learning objectives were simple - take the existing project requirements and build more.  This happened with both front and back end -- by expanding and fixing the front end, I was able to build extra requirements for back-end API functions.',
      },
      {
        type: 'more|what I learned',
        value:
          'I really went overboard with LightBnB extra feature. One thing I got heavily invested in to was Google Maps API. I  plotted LightBnB locations on the map, and not only that, but they were plotted based on search results and were also interactive on the map to also search backwards into the main application. Additionally, this use of Google Maps had me dive into caching of API results rather quickly so I could save both costs and time in repeated API calls.',
      },
      {
        type: 'more|technical features',
        value:
          '<ul><li>sql (postgres)<li>ajax<li>fontawesome<li>google maps api<li>light/dark theme<li>currency converter</ul>',
      },
    ],
    bulletPoints: [],
  },

  {
    title: 'Tweeter',
    featured: false,
    links: {
      live: '',
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
        type: 'more|learning objectives',
        value:
          'During our coursework, importance on a mobile-first development strategy was emphasized, and therefore it was important that responsive design was closely monitored with Tweeter.',
      },
      {
        type: 'more|extra features',
        value:
          'I added numerous extra features into Tweeter like dark mode, favorites, offensive message flagging, re-Tweeter functionality and a jokes API system. Also implemented was a pagination system - fetching only additional Tweeter messages from the Node implemented data system as required.',
      },
      {
        type: 'more|technical features',
        value: '<ul><li>google fonts<li>ajax<li>fontawesome</uL>',
      },
    ],
    bulletPoints: [],
  },

  {
    title: 'TinyApp!',
    featured: false,
    links: {
      live: '',
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
        type: 'more|learning objectives',
        value:
          'TODO add in more stuff here.  blah blah blah lfaskdjfl aslfjdl fasdl ldsfls dlfjdlfj dljfdl',
      },
      {
        type: 'more|extra features',
        value:
          'I took the liberty to add in numerous extra features into TinyApp! on both the server and front end sides.  The server has verbose logging and a quiet mode and on the client/front end side we have a hidden menu bar if not logged in, incorrect password notification, duplicate account error checking, total click counting, unique click counting, and click through logs with graphs for each tiny URL created.',
      },
      {
        type: 'more|technical features',
        value: '<ul><li>bootstrap</uL>',
      },
    ],
    bulletPoints: [],
  },
];

export default PROJECTS;
