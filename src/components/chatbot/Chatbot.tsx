/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { ReactNode, useState, useRef, useEffect } from 'react';
import './Chatbot.scss';
import globalconfig from '../../config';
import popOut from './newWindow';
import SendIcon from './sendIcon';

// TODO use this filter
import badWordsArray from './badwords';

// TODO use config options from here
import chatbotConfigData from './chatbotConfig';

const chatbotVersion = '1.0';
const chatbotChangeLog = 'v1.0 - 2023-08 - initial roll out';
let showQuickReplies = false;
let chatbotScore = 0;

// avatar coming from free API here: https://ui-avatars.com/
// example usage: https://ui-avatars.com/api/?name=%22billy%20bob%22&length=1&rounded=true&background=1481c1
// return is the image stream itself
let userAvatar = '';
let theuserName = '';

// collect duration of use stats
// const [startTime, setStartTime] = useState(null);
// const [endTime, setEndTime] = useState(null);
// TODO below just seems sloppy way to do this - but then, we also don't need 'state' in react, nor do we need ms accuracy in the updates.  do a bit more research.
let startTime = new Date();
let endTime = new Date();
let timeUsed = 0;
const calculateTimeDifference = () => {
  const difference = (new Date()) - startTime;
  timeUsed = Math.floor(difference / 1000);
  console.log('time in app currently (s):',timeUsed);
};

const popOutIcon =`<svg class="popoutIcon" xmlns='http://www.w3.org/2000/svg' height='0.7em' width='0.7em' viewBox='0 0 512 512'>
<path d='M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z' />
</svg>`;



//
// EASTER EGG Stuff.
//


async function fetchFido() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random', { headers: {
      Accept: "application/json",
    },
    });
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching fido photo:', error);
    return [];
  }
}
const fidoImageURL = await fetchFido();
console.log("fidoURL",fidoImageURL);

// location by API
// https://ip-api.com/docs/api:json
async function fetchIPGeolocation() {
  try {
    const response = await fetch('http://ip-api.com/json/', { headers: {
      Accept: "application/json",
    },
    });
    const data = await response.json();
    let city = '';
    if (data.city == 'Amhertsburg') {
      city = 'Amherstburg';
    } else {
      city = data.city;
    }
    return {region: data.regionName, city};
  } catch (error) {
    console.error('Error fetching geo IP:', error);
    return [];
  }
}
const geoIP = await fetchIPGeolocation();
console.log("GEO IP",geoIP);

// weather  API
// https://ip-api.com/docs/api:json
async function fetchWx() {
  try {
    const response = await fetch(`https://wttr.in/${geoIP.city},${geoIP.region}?format=3`, { headers: {
      Accept: "application/html",
    },
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching wx:', error);
    return [];
  }
}
const weatherReport = await fetchWx();
console.log("wx",weatherReport);

// dad jokes
async function fetchJokes() {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', { headers: {
      Accept: "application/json",
    },
    });
    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.error('Error fetching jokes:', error);
    return [];
  }
}
const jotd = await fetchJokes();

async function fetchChuckNorris() {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random', { headers: {
      Accept: "application/json",
    },
    });
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Error fetching jokes:', error);
    return [];
  }
}

function getTimePeriod() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

function getFormattedDate() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  return `Today is ${dayOfWeek}, ${month} ${day}, ${year}`;
}

function getFormattedTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `The current time is ${formattedHours}:${formattedMinutes} ${ampm}`;
}

function socLinks() {
  return (`
                <a target='_new' rel='nofollow' href=${globalconfig.link.twitter}>
                  <li>twitter(X)
                </a>
                <a target='_new' rel='nofollow' href=${globalconfig.link.linkedin}>
                  <li>linkedin
                </a>
                <a target='_new' rel='nofollow' href=${globalconfig.link.youtube}>
                  <li>youtube
                </a>
                <a target='_new' rel='nofollow' href=${globalconfig.link.github}>
                  <li>github
                </a>
                `);
}

// TODO - might need to strip common words and phrases - example I tried "tell me about your projects" - and about gets keyed to the about response only - could we search & remove "tell me about" for example in this case?

//
// dynamic variables we can use:
// {username} - replaces with actual users name
// {prevresponse} - replaces with previous user message 'keyword'
//
const intents = {
  options: {
    patterns: ['options','what can i do','can i ask'],
    responses: ['common options to use:<br>[commands],[contact],[about chatterbot]'],
    quickReplies: [
      { display: 'common commands',
        response: 'commands'
      },
      { display: 'contact Ernie',
        response: 'contact'
      },
      { display: 'learn about Chatterbot',
      response: 'about chatterbot'
      },
    ],
    replies: 0,
  },
  zzz: {
    patterns: ['zzz'],
    responses: [`Asleep at the keyboard are you?`],
    replies: 0,
  },
  about: {
    patterns: ['about'],
    responses: [`You'll want to elaborate further - perhaps add an additional word or two on what you're looking for.`],
    replies: 0,
  },
  greetingsDay: {
    patterns: ['good morning','good afternoon','good evening'],
    responses: [`Good ${getTimePeriod()} to you as well {username}!`],
    replies: 0,
  },
  cheatCode: {
    patterns: ["up up down down left right left right",'up, up, down, down, left, right, left, right','up,up,down,down,left,right,left,right','up-up-down-down-left-right-left-right'],
    responses: ['Cheaters gonna cheat!','Cheat mode on!',`You've unlocked the secret to Chatterbot unlimited messages!`],
    replies: 0,
  },
  cheatMode: {
    patterns: ['cheat mode','cheat code','cheat access',],
    responses: ['That, my friend is the answer.<br>What is the proper input?'],
    replies: 0,
  },
  location: {
    patterns: ['where are you','your location', 'address',],
    responses: ['Ernie is located in Canada and travels between two primary locations - Windsor Ontario and Calgary Alberta.  [Relocation] is a possibility, so [contact] Ernie if it is a requirement.'],
    replies: 0,
  },
  whyChatbot: {
    patterns: ['why chatbot','why a chatbot','why a chat bot','why chatterbot','why a bot','why chatbots','why have chatbots','chat bots'],
    responses: [`Chatbots offer several benefits to enhance user experience and engagement on a web site.
      <li>provide instant assistance to questions that may not be answered elsewhere,
      <li>engaging to visitors with interactive and dynamic content,
      <li>showcasing skills as a developer,
      <li>learning tool with AI and development techniques,
      <li>efficiency as chat bots can handle multiple 'conversations' simultaneously
      <br><br>Of course this isn't an all inclusive list, and we encourage you to contact us if you're looking for a chat bot for yoru own web site!
      `],
    replies: 0,
  },
  socialMedia: {
    patterns: ['social','social media','socialmedia','youtube','twitter','linkedin','linked in','github','whatsapp','facebook','instagram','insta','reddit','flickr','tiktok','tumblr','discord','slack','wechat','telegram','snapchat','quora','twitch','mastodon','threads'],
    responses: ["Here are our current primary social media links:<br>" + socLinks()],
    replies: 0,
  },
  donate: {
    patterns: ['donate','donations','buy me a coffee', 'buy coffee', 'tips','coffee'],
    responses: ['That is great that you want to buy the developer a coffee! <a class="keyword-link" href="https://www.buymeacoffee.com/ej88994">click here</a> to "buy me a coffee "☕'],
    replies: 0,
  },
  biden: {
    patterns: ['corn pop','cornpop','joe biden','biden'],
    responses: ['sniff sniff','truinnerashuvaduprezure','Four more years of George, uh, George, uh, he, uh.',"I get a lot of credit I don't deserve.","we're gonna um, get a lot of unfinished business we're gonna get done","I took control. I shoudn't do that. I'm not allowed to do that.","I'll lead an effective strategy to, um, um.. Zzzzz."],
    replies: 0,
  },
  otherStuff: {
    patterns: ['play a game',],
    responses: [`We're hoping to implement a simple game and yes, even weather reporting into Chatterbot soon!  Come back later to check in with Chatterbot... BUT some of Chatterbot's features will be 'hidden' for you to find out on your own!`],
    replies: 0,
  },
  feelings: {
    patterns: ['how are you today','how do you feel today','do you feel','how are you','can you feel'],
    responses: [`I feel grrrreat!`,`I'm a computer... I don't have feelings!`,`Today, I'm feeling great!`,`Feeling great!<br>Thanks for asking!`],
    replies: 0,
  },
  weather: {
    patterns: ['todays weather','weather'],
    responses: [`Here is the current weather for you:<br>${weatherReport}<br><br>We use your public IP address to figure out your location and therefore your weather, so fingers crossed we got it right!  If not, perhaps you're behind a firewall!<br><br>If we got your town right, and are a bit concerned about privacy, you might want to study up on [cybersecurity] and how to protect your online identity!`],
    replies: 0,
  },
  whereami: {
    patterns: ['my location','geolocation','my address','where am i'],
    responses: [`Currently, your computer is showing you in <br>${geoIP.city},${geoIP.region}.<br><br>We use your public IP address to figure out your location and therefore your weather, so fingers crossed we got it right!  If not, perhaps you're behind a firewall!`],
    replies: 0,
  },
  adventureGame: {
    patterns: ['go north','go south','go east','go west',],
    responses: [`You pack up your gear and adventure off into the unkown.`,`You wander off into adventure game land.`,`I'm not sure why, but you head off into the Forbidden Forest of Fear.`],
    replies: 0,
  },
  commands: {
    patterns: ['command','commands',],
    responses: [`Sure thing {username}!<br><br>Here are a few common commands:<br>[quit], [support], [feedback], [about chatterbot], [developer skills], [what is front-end], [Ernie's education].`],
    replies: 0,
  },
  controversy: {
    patterns: ['blm','black lives','vaccine','covid','ukraine','russia','war','lockdown','trans','gender', 'genders', 'trump','trudeau','tranny','trannies','drag queen','censorship','liberalism','liberals','queer','defund the police','abortion','vaccines','vaccinated','vaccinate','wuhan','vaccination','lockdown','lockdowns', 'lock downs','lock down','masks','netzero','climate change','global warming','climate denier','great reset','fauci','vegan','pronouns','greta','climate hoax','pronoun'],
    responses: ['As in the famous words of U.S. President Joe Biden, "no comment".','As U.S. President Joe Biden would say, "Trunalimunumaprzure Badakathcare"'],
    replies: 0,
  },
  greetings: {
    patterns: ['hello', 'hi', 'hey','wassup','sup','greetings','good day',],
    responses: ['Hello!', 'Hi there!', 'Hey! How can I assist you {username}?'],
    replies: 0,
  },
  beamMeUp: {
    patterns: ['beam me','beam me up scotty','live long and prosper','star trek', 'startrek','scotty','spock','captain'],
    responses: ['Live long, and prosper.','I canna’ change the laws of physics. 🚀','Computers make excellent and efficient servants, but I have no wish to serve under them. 💻','I’m tellin’ ya, Captain, I dinna have enough power! 🚀','Dammit Jim, I’m a doctor not a physicist!'],
    replies: 0,
  },
  jokes: {
    patterns: ['tell me a joke','dad joke','jokes','joke','know any jokes','make me laugh'],
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    responses: [await fetchJokes() + ' 😆',await fetchJokes() + ' 🤣', await fetchJokes() + ' 😂', await fetchJokes() + ' 🤓', await fetchJokes() + ' 🤨'],
    replies: 0,
  },
  dogPhoto: {
    patterns: ['show me a dog','dog photo'],
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    responses: [`<img alt="dog of the day" src="${fidoImageURL}">`],
    replies: 0,
  },
  chucknorris: {
    patterns: ['chuck norris','norris','chucknorris','chuck'],
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    responses: [await fetchChuckNorris(),
      await fetchChuckNorris(),
      await fetchChuckNorris(),
      await fetchChuckNorris(),
      await fetchChuckNorris(),
      await fetchChuckNorris(),
      await fetchChuckNorris(),
    ],
    replies: 0,
  },
  help: {
    patterns: ['help', 'support', 'assistance','assist'],
    responses: ['Sure, {username} I\'m here to help!', 'What do you need assistance with?', 'I\'m here to assist you.'],
    replies: 0,
  },
  bye: {
    patterns: ['bye', 'goodbye', 'exit','quit','logout','reset','close'],
    responses: ['Goodbye!', 'Have a great day!', 'See you later!'],
    replies: 0,
  },
  contact: {
    patterns: ['contact', 'administrator', 'phone', 'email','operator','support','assistant','chat','live chat'],
    responses: ['Live chat is not presently available.<br><br>You can contact Ernie through the <a class="keyword-link" href="#contact">contact</a> section of the site, or email ernie@erniejohnson.ca'],
    replies: 0,
  },
  salaries: {
    patterns: ['salary','salaries','rate of pay','starting salary','hourly rate'],
    responses: ['It is best to discuss offer of employment including salaries via in person, phone or video conversation. That being said, a starting salary can be quite negotiable depending on the terms of employment and responsibilities.'],
    replies: 0,
  },
  hobbies: {
    patterns: ['hobby', 'hobbies', 'leisure', 'interests', 'hobbies','photography','scuba','hiking','dog','dogs','photos','photo'],
    responses: ['Ernie does have numerous hobbies and interests outside of web and app development.  Some of these hobbies include travelling, photography, scuba diving, hiking, and going on adventures with his dog, Guinness.'],
    replies: 0,
  },
  feedback: {
    patterns: ['feedback','comments','comment'],
    responses: ['Your feedback will be valuable!<br><br>Share your thoughts and suggestions in the "<a class="keyword-link"   href="#contact">contact</a>" section!'],
    replies: 0,
  },
  engineer: {
    patterns: ['software engineer','engineer','software engineering'],
    responses: [`Ernie is not a software engineer in the professional term of 'engineer'.<br><br>Although Ernie has the skills, training and experience of what is typically coined a "software engineer", here in Canada, we are not allowed to utilitze the term "engineer" unless licensed through a provincial licensing regulator.<br>`],
    links: ['https://engineerscanada.ca/news-and-events/news/engineering-regulators-reiterate-licensure-requirements-for-those-using-software-engineer-and-other-it-titles'],
    replies: 0,
  },
  softSkills: {
    patterns: ['softskills','soft skills','project management','interpersonal'],
    responses: ['Ernie has, of course, numerous "soft skills" he has gained during many years of employment across several different industries. The ability to work independently and within a team, communications, project management and more.'],
    replies: 0,
  },
  codeSkills: {
    patterns: ['coding skills', 'skills', 'frameworks', 'libraries','languages','json','javascript','react','typescript','nextjs','perl','php','bootstrap','materialui','tailwind','jquery','mysql','postgresql','nosql','python','sass'],
    responses: ['Ernie has experience in Javascript, jQuery, Typescript, React, NextJS, C, C++, and more. He is also skilled with backend technologies like NodeJS, Perl, PHP, MySQL, PostgreSQL and more.<br><br>You can find additional skills in the <a class="keyword-link" href="#about">about</a> section.<BR>Is there something more specific your looking to know?'],
    replies: 0,
  },
  wordpress: {
    patterns: ['wordpress','word press',],
    responses: ["Yes, Ernie has experience with WordPress, along with the installation of different themes and plugins and also with doing some customization of these themes and plugins.<br><br>Ernie actually has a shared hosting service that he runs hosting a variety of WordPress sites for friends, family and as a small business for people who need something simple.  He's also quite versed in technical support for WordPress installs."],
    replies: 0,
  },
  fullstack: {
    patterns: ['fullstack','full stack','full-stack'],
    responses: ['TODO add full stack info'],
    replies: 0,
  },
  frontend: {
    patterns: ['font end','frontend','front-end'],
    responses: ["Ernie enjoys the challenges of front-end development to ensure a smooth, fast and effective user experience through user interface design as well as streamlining code used in the front-end development. <br><br>Ernie is also skilled in [back-end] development and can handle [full-stack] applications."],
    replies: 0,
  },
  backend: {
    patterns: ['back end','backend','back-end'],
    responses: ["Ernie can do back-end development just as well as [front-end] work.<br><br>He has experience with [SQL] and flat file databases, RESTful API's and takes pride in ensuring back end code follows full file-sharing rules, fast & efficient respones and maintaining a secure code base at the same time."],
    replies: 0,
  },
  shareware: {
    patterns: ['shareware','share-ware','freeware','adware','donationware','donatation ware','donation-ware','freemium'],
    responses: ['Shareware is a type of proprietary software that is initially shared by the owner for trial use at little or no cost. Often the software has limited functionality until the user sends payment to the software developer. Shareware differs from freeware, which is fully-featured software distributed at no cost to the user but without source code being made available; and free and open-source software, in which the source code is freely available for anyone to inspect and alter.'],
    links: ['https://en.wikipedia.org/wiki/Shareware'],
    replies: 0,
  },
  scoring: {
    patterns: ['score','my score','about score','scoring','perfect score','how to get 100','get 100', 'score 100'],
    responses: ["The score you see on Chatterbox is a measure of how many responses we have avaialable to you and how many you have found. It adds a bit of a gamification to the chat bot, but at the same time, helps us measure how effective Chatterbot is to answering your questions!<br><br>To get a score of 100%, means you've found all the responses within Chatterbot!"],
    replies: 0,
  },
  workOptions: {
    patterns: ['available to work', 'available for work', 'freelance', 'availability','take new projects','new work','new job','part time','full time','part-time','full-time','when start work','start date','available date','availability'],
    responses: ['Ernie is currently available for freelance, part-time and full-time work. '],
    replies: 0,
  },
  gameDev: {
    patterns: ['game dev','game development','game developer'],
    responses: ['Ernie has a strong interest in game development and has a history in doing early game development quite some time ago before the day of enhanced graphics. These were text based games, or games utilizing very simple sprites and collision detection routines.<br><br>That being said, Ernie would thoroughly enjoy working with a team on more modern day game development!'],
    replies: 0,
  },
  workRelocation: {
    patterns: ['can you relocate','relocate', 'relocation', "travel for work",'available for travel','available to travel'],
    responses: ['Relocation for on-site work may be considered an option depending on the offer of employment.  This is something that would need further discussion direclty with Ernie.'],
    replies: 0,
  },
  currentWork: {
    patterns: ['where do you work now','current work','working currently','employed now','working now','where do you work','work now','current job','current employer','current employment','looking for a job','job wanted','current employer','employer'],
    responses: ['Ernie is presently working on various freelance projects in Canada, including providing management of a WAN that supports a heavy civil engineering firm operating from offices in Calgary, Regina and Windsor.<br><br>Ernie is available and interested in additional opportunities which would include additional freelance work, project collaboration, part-time and full-time opportunities.'],
    replies: 0,
  },
  hackAttempt: {
    patterns: ['script', 'link', 'iframe','${','hack','backdoor','password','cybersecurity','security'],
    responses: ['Ernie has experience in cybersecurity for applications and tends not to leave security vulnerabilities open for possible hack attempts.  In 2023, as additional [education], Ernie completed the Google Cybersecurity Professional Certification program.'],
    replies: 0,
  },
  education: {
    patterns: ['education', 'courses', 'certification', 'certifications','school','where did you go to school','where did ernie go to school','go to school','self taught','college','university'],
    responses: [`Much of Ernie's developer education is from a self-taught perspective.  From growing up in the 80's with learning BASIC on [Commodore] and [Tandy] computers and progressing into C and C++ programming on PC's and later into web development with HTML, early CSS, Perl, CGI and PHP. This progressed into knowing the foundations of SQL through applications like dBase and MySQL. As web technologies progressed, Ernie was quick to become proficient in Javascript coding.  To this day, he continues to hone his skills largely in Javascript, Typescript, Python, Kotlin and Swift.<br><br>Ernie recently completed a coding [bootcamp] at [Lighthouse Labs] to get his knowledge up to current trends.<br><br>Ernie also is eager to pick up extra certifications in [cybersecurity], general IT and networking support.`],
    replies: 0,
  },
  lighthouselabs: {
    patterns: ['bootcamp','lighthouselabs','lighthouse labs','bootcamps'],
    responses: ['Ernie has attended Lighthouse Labs coding bootcamp in 2022-2023.<br><br>This was a great experience and a way to fast-track into the current technologies being used in web development since it had been some time since Ernie was in web development.<br><br>Although expensive, Lighthouse Labs was a great experience and a great way to work in teams on web application development.'],
    links: ['https://lighthouselabs.ca'],
    replies: 0,
  },
  commodore: {
    patterns: ['commodore'],
    responses: ['Ernie used the Commodore VIC-20, and later upgraded to my favorite, the C-128. Accessories included a tape drive on the VIC-20 and 5.25" floppy drive on the C-128!<br><br>Did you use any of these computers?<br><br>Which was your favorite?'],
    replies: 0,
  },
  vic20: {
    patterns: ['vic20','vic-20','c64','c-64','c-128','c128'],
    responses: ["{prevresponse}, cool! "]
  },
  noyes: {
    patterns: ['no','yes'],
    responses: ['cool','ok'],
  },
  tandy: {
    patterns: ['tandy'],
    responses: [`I used primarily the CoCo3...<br><br>... that was about 35 years ago for me!<br>Crazy to think, 128kb of RAM was "lots"!`]
  },
  operatingSystems: {
    patterns: ['operating systems','windows','mac','macos','ventura','linux','ubuntu','redhat','sonoma','monterey','big sur','mint', 'debian','manjaro','pop','fedora','suse','elementary','puppy','networking','apple'],
    responses: ['On a day to day basis, Ernie is using MacOS, Windows and Linux systems.<br><br>He tries to stay fairly up to date with developer beta versions to see what is new and coming for OS releases.<br><br>OS experience also includes network administration on Linux and Windows sytems back as far as Windows 2000 Server!'],
    replies: 0,
  },
  ecommerce: {
    patterns: ['ecommerce','e-commerce',],
    responses: ['Ernie has experience in building, maintaining and even operating e-commerce web applications.  From the early days of the internet, Ernie build and ran several e-commerce sites and was the lead developer for these applications using HTML, CSS and Javascript on the front end, which tied to PHP/Perl/CGI on the backend along with interfacing to MySQL database engine.'],
    replies: 0,
  },
  databases: {
    patterns: ['database','databases','sql','mysql','postgresql','nosql'],
    responses: ['Ernie has experience with SQL - largely using MySQL and PostreSQL systems.<br><br>Including these relational databases, Ernie also has experience with "flat file" type databases for smaller applications<br><br>This also ties into knowledge and the understanding of the necessity of file locking requirements in multi-user applications.'],
    replies: 0,
  },
  
  botAPI: {
    patterns: ['what api',"what api's","api in","api's you use","api used","api's used"],
    responses: ['Chatterbot is built to not use any API calls in my main programming features. I am strictly a front-end operating chat bot system.<br><br>That being said, I do use a few API calls for additional user experience in this demo. We use Dad Jokes API, Weather API, GeoLocation by IP API, Chuck Norris API and a few others.'],
    replies: 0,
  },
  
  aboutBot: {
    patterns: ['about chatterbot','about chatbot','about chat bot', 'what is chatterbot','who are you','about yourself'],
    responses: ['I am Chatterbot.<br><br>Although in my infancy, I am built as a React component to work within this project<br><br>As an extra "did you know", Chatterbot was built in-part by an AI system with a few prompts from Ernie, followed up with some of his human tweaks (& corrections) of course!.<br><br>Chatterbog [changelog].'],
    replies: 0,
  },
  chatterbot: {
    patterns: ['chatterbot','chatbot','chatbots','chat bot','chat bots'],
    responses: ["I know a few things about myself, Chatterbot, as well as things about chat bots in general.  Can you describe with a bit more detail about what you're looking for?<br><br>You try [about chatterbot] or [why chatbot] for example."],
    replies: 0,
  },
  merryChristmas: {
    patterns: ['merry christmas','merry xmas','xmas','christmas time','christmas'],
    responses: ["Merry Christmas! 🎄 Wishing you joy, peace, and festive celebrations!",
      "Happy holidays! 🎅 May your Christmas be filled with warmth and happiness.",
      "Wishing you a wonderful Christmas season! 🌟 Enjoy the magic of this special time.",
    ],
    replies: 0,
  },
  happyHalloween: {
    patterns: ['happy halloween','holloween','hallowen','hallowean','halloween'],
    responses: ["Happy Halloween! 🎃 May your day be filled with spooky fun and sweet treats!",
      "Wishing you a spook-tacular Halloween! 👻 Enjoy the thrills of the season.",
      "Have a hauntingly good time this Halloween! 🕷️ Stay safe and enjoy the festivities.",
    ],
    replies: 0,
  },
  botChangeLog: {
    patterns: ['changelog', 'change log', 'version'],
    responses: ['Here is the recent change log for Chatterbot:<br>' + chatbotChangeLog],
    replies: 0,
  },
  downloads: {
    patterns: ['resume','download','downloads','your cv','cv'],
    responses: ['Ernie&#39;s resume can be downloaded <a class="keyword-link" href="http://www.erniejohnson.ca/resume.pdf">here</a>'],
    replies: 0,
  },
  volunteer: {
    patterns: ['volunteer work','volunteer',],
    responses: ['Ernie has extensive volunteer experience, mostly in emergency medical services, but has also completed a few web projects for non profit/charitable organizations in the past.'],
    replies: 0,
  },
  workavailble: {
    patterns: ['work in canada','work remotely','remote work','work remote','work in usa','work in america', 'work in us','work canada','work usa','work us','work in the usa','work in the us','where are you from','where from'],
    responses: ['Ernie is Canadian and can work anywhere across Canada.<br>Life has dictated a necessity for remote work with the possibility of a hybrid schedule. Ernie can and has also recently worked in the USA on a B1 Business Visa and for outsourced freelance jobs.'],
    replies: 0,
  },
  useAI: {
    patterns: ['ai','bard','chatgpt','chat gpt','ai systems','ai system'],
    responses: ['Yes, Ernie uses AI technologies like ChatGPT and Google Bard.<br><br>In fact, Chatterbot was written largely by prompting ChatGPT to create the outline and basics of functionality.  Sure, there were a few bugs that needed a human to iron out along the way, and there may not have been much of a time saver from writing it from scratch, but interesting just the same!<br><br>That being said, Chatterbot responses are not generated by AI.'],
    replies: 0,
  },
  datetoday: {
    patterns: ['what day is it',`today's date`, 'todays date', 'date today','today','date','date now','day'],
    responses: [getFormattedDate()],
    replies: 0,
  },
  timenow: {
    patterns: ['what time is it','current time','time now','time today','the time'],
    responses: [getFormattedTime()],
    replies: 0,
  },
  botName: {
    patterns: ['your name','bot name'],
    responses: ['My name is Chatterbot v' + chatbotVersion],
    replies: 0,
  },
  usersName: {
    patterns: ['my name','is my name'],
    responses: ['Your name is {userName}'],
    replies: 0,
  },
  saveMessages: {
    patterns: ['save','message history','history'],
    responses: ['Appologies,<br>but this is something I can not do quite yet.'],
    replies: 0,
  },
  nameChange: {
    patterns: ['change name','change my name','name reset'],
    responses: ['Sure thing, just enter your new name:'],
    replies: 0,
  },
  default: {
    responses: ["I'm sorry, I don't understand that.", "Could you please rephrase that?", "I'm not sure how to help with that."],
    replies: 0,
  }
};

const unMatchedInputs = [];

const chatbotScoreMax = Object.keys(intents).length - 1;

// chatbot scoring calculator
function sumPositiveReplies(obj) {
  let sum = 0;

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if ("replies" in obj[key] && typeof obj[key].replies === "number" && obj[key].replies > 0) {
        sum += 1;
      }
    }
  }
  // don't count default replies (remove if added)
  if(obj.default.replies > 0) {
    sum --;
  }
  return sum;
}


//
// HELPER FUNCTIONS
//

function calculatePercentage(number, total) {
  if (total === 0) {
    return 0;
  }
  
  const percentage = (number / total) * 100;
  return percentage.toFixed(0); 
}

function getResponse(message) {
  calculateTimeDifference();
  if (typeof message != 'string') return;
  const lowerMessage = message.toLowerCase();
  let additionalLink = '';

  if (theuserName === '') {
    theuserName = message;
    return "Your name has been changed!";
  }

  for (const intentName in intents) {
    const intent = intents[intentName];
    for (const pattern of intent.patterns || []) {
      const regexPattern = new RegExp(`\\b${pattern}\\b`, 'i'); // Create regex with word boundaries
      if (regexPattern.test(lowerMessage)) {
        // chatbotScore++;
        if (intent.links) {
          additionalLink = ` <a class="keyword-link" href=${intent.links} target=_new>(more <nobr>info${popOutIcon})</nobr></a>`;
        }
        intent.replies++;
        chatbotScore = calculatePercentage(sumPositiveReplies(intents),chatbotScoreMax);

        if (intentName === 'nameChange') {
          // TODO how to reset user name at this point
          console.log("getResponse -> nameChange");
          theuserName = '';
        }
        

        console.log("intentName:",intentName);
        console.log('intent:',intent,' replies:',intent.replies);
        // console.log('# of intents:',Object.keys(intents).length);
        if(intent.quickReplies && intent.quickReplies.length > 0) {
          // console.log('quick replies available in ',intentName);
          showQuickReplies = intentName;
          // console.log(intents[showQuickReplies].quickReplies);
        } else {
          showQuickReplies = null;
        }
        // if(intentName === 'options') { 
        //   showQuickReplies = true; 
        // } else {
        //   showQuickReplies = false;
        // }
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        let returnString = personalizeResponse(getRandomResponse(intent.responses)) + additionalLink;
        returnString = returnString.replace("{prevresponse}",pattern);

        // if(intent.quickReplies && intent.quickReplies.length > 0) {
        //   // eslint-disable-next-line @typescript-eslint/no-loop-func
        //   const quickReplyButtons = intent.quickReplies.map((reply, qrindex) => (
        //     <button
        //       className='quickReplies'
        //       key={qrindex}
        //       onClick={() => handleQuickReply(reply.response)}
        //     >
        //       {reply.display}
        //     </button>
        //   ));
        //   // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        //   return returnString + quickReplyButtons;
        // } else {
          return returnString;
        // }
        // return ((personalizeResponse(getRandomResponse(intent.responses))) + additionalLink);
      }
    }
  }
  showQuickReplies = false;
  intents.default.replies++;
  unMatchedInputs.push(message);
  console.log('no matches: ',unMatchedInputs);
  return getRandomResponse(intents.default.responses);
}

function getRandomResponse(responses) {
  return parseKeywords(responses[Math.floor(Math.random() * responses.length)]);
  
}

function personalizeResponse(response) {
  return response.replace("{username}",theuserName);
}

function parseKeywords(responses) {
  return responses;
  // return(responses.replace(/\[(.*?)\]/g, '<span class="keyword-link" data-keyword="$1">$1</span>'));
}



//
// main Chatbot() system
//
function Chatbot(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef(null);
  const [quickReplies, setQuickReplies] = useState('quickreplyitem');
  const [score, setScore] = useState(chatbotScore);
  const chatInputRef = useRef(null);
  const buttonRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  
  

  const handleCloseChatbot = () => { 
    // collect end of use stats
    // setEndTime(new Date());
    endTime = new Date();
  };

  const toggleChatbot = () => {
    console.log("open status:",isOpen);
    if(!isOpen) {
      // is open, will need to close so lets send chat stats:
      handlerSubmit();
      setIsOpen(!isOpen);
      // eslint-disable-next-line react/prop-types
      if (typeof props.onClose === 'function') {
        console.log("chatterbot: props closing from within bot");
        
        // stats collection (duration chatbot is used)
        handleCloseChatbot();
        console.log("time in chatbot (s):",timeUsed);
        console.log('chatbot started:',startTime);
        
        setTimeout(() => {
          // Code to execute after the delay
          console.log('Sleeping for close...');
          console.log('chatbot ended:',endTime);
          console.log('time in chatbot:',timeUsed);
          // eslint-disable-next-line react/prop-types
          props.onClose();
        }, 300);
      }
    }
  };

  const resetUserName = (newName) => {
    setUserName(newName);
    localStorage.setItem("userName", newName);
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickLinks = (responseToParse) => {
    if (!responseToParse) return;
    return(responseToParse.replace(/\[(.*?)\]/g, `<span class="keyword-link" data-keyword="$1">$1</span>`));
  };

  const handleQuickReply = (intent) => {
    // flushSync(() => { setUserInput(intent) });;

    console.log("handleQuickLinks:state:",intent);
    handleSendMessage(intent);
    // buttonRef.current.click();
  };
  
  // BUG - blank message on send crashes chatterbot
  const handleSendMessage = (inputIntent) => {
    // setIsTyping(true);
    // TODO why is setState not functioning as expected  - because of async flow -- but how can we solve the problem better than this way?

    if (userInput.trim() == '' && inputIntent == '') {
      inputIntent = "zzz";
      alert("blank");
    }

    if (inputIntent) {
      addMessage('User', inputIntent);
      const botResponse = handleQuickLinks(getResponse(inputIntent));
      addMessage('Bot', botResponse);
      setTimeout(() => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }, 0);
      setUserInput('');
      return;
    }

    if (userInput.trim() == '' && !userName) {
      // addMessage('Bot', `What is your name?`);
      return;
    }
    if (userInput.trim() !== '') {
      if(!userName) {
        setUserName(userInput);
        localStorage.setItem("userName", userInput);
        addMessage('Bot', `Hi ${userInput}!<br>How can I assist you today?`);
      } else {
        addMessage('User', userInput);
        const botResponse = handleQuickLinks(getResponse(userInput));
        addMessage('Bot', botResponse);
      }
      // Scroll to the bottom of the chat history
      setTimeout(() => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }, 0);
      // setUserName('');
      setUserInput('');
    } 
  };

  const addMessage = (sender, message) => {
    setMessageHistory((prevHistory) => [
      ...prevHistory,
      { sender, message }
    ]);
  };

  //
  // emailer for chat log and data
  //
  function handlerSubmit() {
    console.log('in handlersubmit');
    if(unMatchedInputs.length < 1) return;
    handleSubmit().then(() => {
      // Handle success here
      console.log('chatterbot log: attempt to send');
      unMatchedInputs.length = 0;
    }).catch((error) => {
      console.error('Error submitting form:', error);
      // Handle error here
    });
  }
  const handleSubmit = async (e) => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '7160e73c-4a32-4952-ab02-e07ea131ed58',
          from_name: 'erniejohnson.ca',
          subject: 'erniejohnson.ca - chatterbot: FAILED responses',
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          message: unMatchedInputs + '\n\nduration in chatterbot (s): ' + timeUsed,
          name: 'chatterbot on erniejohnson.ca',
          email: 'ej8899@gmail.com',
          botcheck: '',
        }),
      });
      const json = (await response.json()) as { success: boolean };

      if (!json.success) throw new Error('Something went wrong.');
    } catch (err) {
      console.log('chatterbot - send log error:',err);
    }
  };

  // quicklink handler
  const handleLinkClick = (event) => {
    if (event.target.classList.contains('keyword-link')) {
      const keyword = event.target.textContent;
      handleQuickReply(keyword); // Call the function with the keyword
    }
  };



  
  
  //
  // HOOKS
  //

  // INITIAL LOAD ITEMS
  useEffect(() => {
    const chatbotContainer = document.querySelector('.chatbot-popup');
    startTime = new Date();
    // user stats collection (duration used)
    // setStartTime(new Date());
    // startTime = new Date();
    window.addEventListener("beforeunload", handleCloseChatbot);

    // Add the event listener for link clicks
    chatbotContainer.addEventListener('click', handleLinkClick);

    setTimeout(() => {
      console.log('sleeping for slide in');
      setIsOpen(false);
    }, 300); 

    // get timeframe of day (morning, afternoon, evening)
    const timePeriod = getTimePeriod();

    // user name processing
    const savedUserName = localStorage.getItem("userName");
    theuserName = savedUserName || '';
    // console.log(savedUserName);
    if (savedUserName) {
      setUserName(savedUserName);
    }

    if (!savedUserName) {
      // console.log("message history length:",messageHistory.length);
      if (messageHistory.length === 0) {
        if(!userName) addMessage('Bot', `ue Good ${timePeriod}!<br>What is your name?`);
      }
    } else {
      addMessage('Bot',`Good ${timePeriod} & welcome back, ${savedUserName}!<br>How can I be of assistance?`);
      userAvatar = `https://ui-avatars.com/api/?name=${savedUserName}&length=1&rounded=true&background=1481c1`;
    }

    // deal with any cleanups
    return () => {
      // chatbotContainer.removeEventListener('click', (event) => { /* ... */ });
      chatbotContainer.removeEventListener('click', handleLinkClick);
      window.removeEventListener("beforeunload", handleCloseChatbot);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // console.log('messageHistory:',messageHistory);
  }, [messageHistory]);
  
  useEffect(() => {
    setScore(chatbotScore);
  }, [chatbotScore]);

  useEffect(() => {
    console.log("useeffect on theuserName");
    localStorage.setItem("userName", theuserName);
  }, [theuserName]);


  //
  // MAIN JSX
  //
  return (
    <div id='chatboot-root' className={`chatbot-popup ${isOpen ? 'closed' : 'open'}`}>
      <div className="chatbot-content"> 
      <div className="chatbot-header">
        <div className="title">ChatterBot</div>
        <div className="score">Score: {score}%</div>
        <button className="close-button" onClick={toggleChatbot}>Close</button>
      </div>
      <div className="message-history">
        {messageHistory.map((msg, index) => (
          <div key={index} className={`message-row row-${msg.sender}`}>
            {msg.sender === 'Bot' && (
              <div className="avatar-circle">
                <i className="fa-solid fa-robot"></i>
              </div>
            )}
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-content">
                {msg.message.includes('<a') || 
                  msg.message.includes('<li') ||
                  msg.message.includes('<img') ||
                  msg.message.includes('<i') ||
                  msg.message.includes('<span') ||
                  msg.message.includes('<b') || 
                  msg.message.includes('<br') ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.message }} />
                  ) : msg.message.includes('{userName}') ? (
                    msg.message.replace('{userName}', userName)
                  ) : (
                    msg.message
                  )}
              </div>
            </div>
            {msg.sender === 'User' && (
              <div className="avatar-circle">
                <img src={userAvatar} alt="user avatar"></img>
              </div>
            )}
          </div>
        ))}           

        <div ref={messagesEndRef}></div> {/* This ensures scrolling to bottom */}
      </div>
      <div className="user-input">
        <input
          ref={chatInputRef}
          autoComplete='off'
          id='chat-input'
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
        />
        &nbsp;&nbsp;&nbsp;<button ref={buttonRef} onClick={handleSendMessage}><SendIcon clasName='sendicon'/></button>
      </div>
    </div>
  </div>
  );
}

// TODO - evaluate react controlled components and using defaultValue instead of value here -- this might solve our chrome autofill
// BUG - chrome autofill

export default Chatbot;
