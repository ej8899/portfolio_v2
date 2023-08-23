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


const chatbotVersion = '1.0';
const chatbotChangeLog = 'v1.0 - 2023-08 - initial roll out';
let showQuickReplies = false;
let chatbotScore = 0;

// TODO - might need to strip common words and phrases - example I tried "tell me about your projects" - and about gets keyed to the about response only - could we search & remove "tell me about" for example in this case?

const intents = {
  options: {
    patterns: ['options'],
    responses: ['common options to use:'],
    quickReplies: ['commands','contact','about','soft skills'],
    replies: 0,
  },
  donate: {
    patterns: ['donate','donations','buy me a coffee', 'buy coffee', 'tips'],
    responses: ['That is great that you want to buy the developer a coffee! <a href="https://www.buymeacoffee.com/ej88994">click here</a> to "buy me a coffee"'],
    replies: 0,
  },
  commands: {
    patterns: ['command','commands',],
    responses: ['Sure thing!<br><br>Here are a few common commands:<br>quit, support, feedback, about chatterbot, developer skills.'],
    replies: 0,
  },
  greetings: {
    patterns: ['hello', 'hi', 'hey','wassup','sup','greetings'],
    responses: ['Hello!', 'Hi there!', 'Hey! How can I assist you?'],
    replies: 0,
  },
  help: {
    patterns: ['help', 'support', 'assistance'],
    responses: ['Sure, I\'m here to help!', 'What do you need assistance with?', 'I\'m here to assist you.'],
    replies: 0,
  },
  bye: {
    patterns: ['bye', 'goodbye', 'exit','quit','logout','reset','close'],
    responses: ['Goodbye!', 'Have a great day!', 'See you later!'],
    replies: 0,
  },
  contact: {
    patterns: ['contact', 'phone', 'email','operator','support','live'],
    responses: ['You can contact Ernie through the <a href="#contact">contact</a> section of the site, or email ernie@erniejohnson.ca'],
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
  workOptions: {
    patterns: ['work', 'freelance', 'availability'],
    responses: ['Ernie is currently available for freelance, part-time and full-time work. '],
    replies: 0,
  },
  hackAttempt: {
    patterns: ['script', 'link', 'iframe','${','hack','backdoor','password','cybersecurity','security'],
    responses: ['Ernie has experience in cybersecurity for applications and tends not to leave security vulnerabilities open for possible hack attempts.'],
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
    patterns: ['resume','download','downloads'],
    responses: ['Ernie&#39;s resume can be downloaded <a href="http://www.erniejohnson.ca/resume.pdf">here</a>'],
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


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      addMessage('Bot','Welcome back, ' + savedUserName);
    }
  }, []);

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
                {msg.message.includes('<a href=') || msg.message.includes('<b>') || msg.message.includes('<br>') ? (
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
