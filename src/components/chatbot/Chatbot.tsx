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

const chatbotVersion = '1.0';
const chatbotChangeLog = 'v1.0 - 2023-08 - initial roll out';
let showQuickReplies = false;
let chatbotScore = 0;


//
// EASTER EGG Stuff.
//

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

const intents = {
  options: {
    patterns: ['options'],
    responses: ['common options to use:'],
    quickReplies: ['commands','contact','about','soft skills'],
    replies: 0,
  },
  cheatCode: {
    patterns: ["up up down down left right left right",'up, up, down, down, left, right, left, right','up,up,down,down,left,right,left,right','up-up-down-down-left-right-left-right'],
    responses: ['cheaters gonna cheat!','cheat mode on',`you've unlocked the secret to Chatterbot unlimited messages!`],
    replies: 0,
  },
  whyChatbot: {
    patterns: ['why chatbot','why a chatbot','why a chat bot','why chatterbot','why a bot','why chatbots','why have chatbots','chat bots'],
    responses: [`Chatbots offer several benefits to enchance user experience and engagement on a web site.
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
    responses: ['That is great that you want to buy the developer a coffee! <a href="https://www.buymeacoffee.com/ej88994">click here</a> to "buy me a coffee "☕'],
    replies: 0,
  },
  otherStuff: {
    patterns: ['play a game','todays weather','weather'],
    responses: [`We're hoping to implement a simple game and yes, even weather reporting into Chatterbot soon!  Come back later to check in with Chatterbot... BUT some of Chatterbot's features will be 'hidden' for you to find out on your own!`],
    replies: 0,
  },
  adventureGame: {
    patterns: ['go north','go south','go east','go west',],
    responses: [`You pack up your gear and adventure off into the unkown.`,`You wander off into adventure game land.`,`I'm not sure why, but you head off into the Forbidden Forest of Fear.`],
    replies: 0,
  },
  commands: {
    patterns: ['command','commands',],
    responses: ['Sure thing!<br><br>Here are a few common commands:<br>quit, support, feedback, about chatterbot, developer skills.'],
    replies: 0,
  },
  controversy: {
    patterns: ['blm','black lives','vaccine','covid','ukraine','russia','war','lockdown','trans','gender', 'genders', 'trump','biden','trudeau','tranny','trannies','drag queen','censorship','liberalism','liberals','queer','defund the police','abortion','vaccines','vaccinate','wuhan','vaccination','lockdown','masks','netzero','climate change','global warming','climate denier','great reset','fauci'],
    responses: ['As in the famous words of U.S. President Joe Biden, "no comment".','As U.S. President Joe Biden would say, "Trunalimunumaprzure Badakathcare"'],
    replies: 0,
  },
  greetings: {
    patterns: ['hello', 'hi', 'hey','wassup','sup','greetings',],
    responses: ['Hello!', 'Hi there!', 'Hey! How can I assist you?'],
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
  datetoday: {
    patterns: ['what day is it',`today's date`, 'todays date', 'date today','today','date','date now'],
    responses: [getFormattedDate()],
    replies: 0,
  },
  timenow: {
    patterns: ['what time is it','current time','time now','time today','time'],
    responses: [getFormattedTime()],
    replies: 0,
  },
  help: {
    patterns: ['help', 'support', 'assistance','assist'],
    responses: ['Sure, I\'m here to help!', 'What do you need assistance with?', 'I\'m here to assist you.'],
    replies: 0,
  },
  bye: {
    patterns: ['bye', 'goodbye', 'exit','quit','logout','reset','close'],
    responses: ['Goodbye!', 'Have a great day!', 'See you later!'],
    replies: 0,
  },
  contact: {
    patterns: ['contact', 'phone', 'email','operator','support','live','chat','live chat'],
    responses: ['Live chat is not presently available.<br><br>You can contact Ernie through the <a href="#contact">contact</a> section of the site, or email ernie@erniejohnson.ca'],
    replies: 0,
  },
  hobbies: {
    patterns: ['hobby', 'interests', 'hobbies','photography','scuba','hiking','dog','dogs','photos','photo'],
    responses: ['Ernie does have numerous hobbies and interests outside of web and app development.  Some of these hobbies include travelling, photography, scuba diving, hiking, and going on adventures with his dog, Guinness.'],
    replies: 0,
  },
  feedback: {
    patterns: ['feedback','comments','comment'],
    responses: ['Your feedback will be valuable! Share your thoughts and suggestions in the "<a href="#contact">contact</a>" section!'],
    replies: 0,
  },
  softSkills: {
    patterns: ['softskills','soft skills','project management'],
    responses: ['Ernie has, of course, numerous "soft skills" he has gained during many years of employment across several different industries. The ability to work independently and within a team, communications, project management and more.'],
    replies: 0,
  },
  codeSkills: {
    patterns: ['coding skills', 'skills', 'frameworks', 'libraries','languages','json','javascript','react','typescript','nextjs','c','perl','php','bootstrap','materialui','tailwind'],
    responses: ['Ernie has experience in Javascript, Typescript, React, NextJS, C, C++, and more. He is also skilled with backend technologies like NodeJS, Perl, PHP, MySQL, PostgreSQL and more.<br><br>You can find additional skills in the <a href="#about">about</a> section.<BR>Is there something more specific you need?'],
    replies: 0,
  },
  scoring: {
    patterns: ['score','my score','about score','scoring'],
    responses: ['The score you see on Chatterbox is a measure of how many responses we have avaialble to you and how many you have found. It is a bit of a gamification to the chat bot, but at the same time, helps us measure how effective Chatterbot is to answering your questions!'],
    replies: 0,
  },
  workOptions: {
    patterns: ['available to work', 'available for work', 'freelance', 'availability','take new projects','new work','new job'],
    responses: ['Ernie is currently available for freelance, part-time and full-time work. '],
    replies: 0,
  },
  currentWork: {
    patterns: ['where do you work now','current work','working currently','employed now','working now','where do you work','work now'],
    responses: ['Ernie is presently working on various freelance projects in Canada, including providing management of a WAN that supports an engineering firm operating from offices in Calgary, Regina and Windsor.'],
    replies: 0,
  },
  hackAttempt: {
    patterns: ['script', 'link', 'iframe','${','hack','backdoor','password','cybersecurity','security'],
    responses: ['Ernie has experience in cybersecurity for applications and tends not to leave security vulnerabilities open for possible hack attempts.  In 2023, Ernie completed the Google Cybersecurity Professional Certification program.'],
    replies: 0,
  },
  education: {
    patterns: ['education', 'courses', 'certification', 'certifications'],
    responses: [`Much of Ernie's developer education is from a self-taught perspective.  From growing up in the 80's with learning BASIC on Commodore and Tandy computers and progressing into C and C++ programming on PC's and later into web development with HTML, early CSS, Perl, CGI and PHP. This progressed into knowing the foundations of SQL through applications like dBase and MySQL. As web technologies progressed, Ernie was quick to become proficient in Javascript coding.  To this day, he continues to hone his skills largely in Javascript, Typescript, Python, Kotlin and Swift.<br><br>Ernie also is eager to pick up extra certifications in cybersecurity, general IT and networking support.`],
    replies: 0,
  },
  operatingSystems: {
    patterns: ['operating systems','windows','mac','macos','ventura','linux','ubuntu','redhat','sonoma','monterey','big sur','mint', 'debian','manjaro','pop','fedora','suse','elementary','puppy','networking'],
    responses: ['On a day to day basis, Ernie is using MacOS, Windows and Linux systems.<br><br>He tries to stay fairly up to date with developer beta versions to see what is new and coming for OS releases.<br><br>OS experience also includes network administration on Linux and Windows sytems back as far as Windows 2000 Server!'],
    replies: 0,
  },
  aboutBot: {
    patterns: ['about', 'chatterbot','who are you'],
    responses: ['I am Chatterbot.<br><br>Although in my infancy, I am built as a React component to work within this project<br><br>As an extra "did you know", Chatterbot was built largely by an AI system with a few prompts from Ernie, followed up with some of his human tweaks of course!'],
    replies: 0,
  },
  botChangeLog: {
    patterns: ['changelog', 'change log', 'version'],
    responses: ['Here is the recent change log for Chatterbot:<br>' + chatbotChangeLog],
    replies: 0,
  },
  downloads: {
    patterns: ['resume','download','downloads','your cv','cv'],
    responses: ['Ernie&#39;s resume can be downloaded <a href="http://www.erniejohnson.ca/resume.pdf">here</a>'],
    replies: 0,
  },
  downloads: {
    patterns: ['work in canada','work remotely','remote work','work in usa','work in us','work canada','work usa','work us'],
    responses: ['Ernie is Canadian and can work anywhere across Canada.<br>Life has dictated a necessity for remote work with the possibility of a hybrid schedule. Ernie can and has also recently worked in the USA on a B1 Business Visa and for outsourced freelance jobs.'],
    replies: 0,
  },
  useAI: {
    patterns: ['ai','bard','chatgpt','chat gpt'],
    responses: ['Yes, Ernie uses AI technologies like ChatGPT and Google Bard.<br><br>In fact, Chatterbot was written largely by prompting ChatGPT to create the outline and basics of functionality.  Sure, there were a few bugs that needed a human to iron out along the way, and there may not have been much of a time saver from writing it from scratch, but interesting just the same!<br><br>That being said, Chatterbot responses are not generated by AI.'],
    replies: 0,
  },
  botName: {
    patterns: ['your name','bot name'],
    responses: ['My name is Chatterbot v' + chatbotVersion],
    replies: 0,
  },
  usersName: {
    patterns: ['name'],
    responses: ['Your name is {userName}'],
    replies: 0,
  },
  saveMessages: {
    patterns: ['save','message history','history'],
    responses: ['Appologies,<br>but this is something I can not do quite yet.'],
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

// HELPER FUNCTIONS
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

function getResponse(message) {
  const lowerMessage = message.toLowerCase();

  for (const intentName in intents) {
    const intent = intents[intentName];
    for (const pattern of intent.patterns || []) {
      const regexPattern = new RegExp(`\\b${pattern}\\b`, 'i'); // Create regex with word boundaries
      if (regexPattern.test(lowerMessage)) {
        // chatbotScore++;
        intent.replies++;
        chatbotScore = sumPositiveReplies(intents);
        console.log('intent:',intent,' replies:',intent.replies);
        // console.log('# of intents:',Object.keys(intents).length);
        if(intentName === 'options') { 
          showQuickReplies = true; 
        } else {
          showQuickReplies = false;
        }
        return getRandomResponse(intent.responses);
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
  return responses[Math.floor(Math.random() * responses.length)];
}






//
// main Chatbot() system
//
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef(null);
  const [quickReplies, setQuickReplies] = useState('quickreplyitem');
  const [score, setScore] = useState(chatbotScore);
  
  const toggleChatbot = () => {
    console.log("open status:",isOpen);
    if(!isOpen) {
      // is open, will need to close so lets send chat stats:
      handlerSubmit();
    }
    setIsOpen(!isOpen);
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickReply = (intent) => {
    // You can add the selected quick reply as a user message
    // setChatHistory([...chatHistory, { message: intent, type: "user" }]);
    // You can also directly call `getResponse` with the selected intent
    const botResponse = getResponse(intent);
    addMessage('Bot', botResponse);
    // setChatHistory([...chatHistory, { message: response.message, type: "bot" }]);
    showQuickReplies = false;
  };

  
  const handleSendMessage = () => {
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
        const botResponse = getResponse(userInput);
        addMessage('Bot', botResponse);
      }
      // Scroll to the bottom of the chat history
      setTimeout(() => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }, 0);
      
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
    handleSubmit().then(() => {
      // Handle success here
      console.log('chatterbot log sent');
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
          message: unMatchedInputs,
          name: 'chatterbot on erniejohnson.ca',
          email: 'ej8899@gmail.com',
          botcheck: '',
        }),
      });
      const json = (await response.json()) as { success: boolean };

      if (!json.success) throw new Error('Something went wrong.');
    } catch (err) {
      console.log('chatterbot - send log error');
    }
  };


  //
  // HOOKS
  //
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log('messageHistory:',messageHistory);
  }, [messageHistory]);
  
  useEffect(() => {
    setScore(chatbotScore);
  }, [chatbotScore]);

  useEffect(() => {
    // get timeframe of day (morning, afternoon, evening)
    const timePeriod = getTimePeriod();

    const savedUserName = localStorage.getItem("userName");
    console.log(savedUserName);
    if (savedUserName) {
      setUserName(savedUserName);
    }

    if (!savedUserName) {
      console.log("message history length:",messageHistory.length);
      if (messageHistory.length === 0) {
        if(!userName) addMessage('Bot', `ue Good ${timePeriod}!<br>What is your name?`);
      }
    } else {
      addMessage('Bot',`Good ${timePeriod} & welcome back, ${savedUserName}!`);
    }
  }, []);


  //
  // MAIN JSX
  //
  return (
    <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-content"> 
      <div className="chatbot-header">
        <div className="title">ChatterBot</div>
        <div className="score">Score: {score}/{chatbotScoreMax}</div>
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
                {msg.message.includes('<a href=') || 
                  msg.message.includes('<li>') ||
                  msg.message.includes('<b>') || 
                  msg.message.includes('<br>') ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.message }} />
                  ) : msg.message.includes('{userName}') ? (
                    msg.message.replace('{userName}', userName)
                  ) : (
                    msg.message
                  )}
              </div>
            </div>
          </div>
        ))}
            {showQuickReplies && 
            <div>
              <div className="quick-replies">
                {intents.options.quickReplies.map((reply, qrindex) => (
                  <button
                    className='quickReplies'
                    key={qrindex}
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
            }
        <div ref={messagesEndRef}></div> {/* This ensures scrolling to bottom */}
      </div>
      <div className="user-input">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
        />
        &nbsp;&nbsp;&nbsp;<button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  </div>
  );
}

export default Chatbot;
