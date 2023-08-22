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

const intents = {
  options: {
    patterns: ['options'],
    responses: ['common options to use:'],
    quickReplies: ['commands','contact','about','soft skills'],
  },
  commands: {
    patterns: ['command','commands',],
    responses: ['Sure thing!<br><br>Here are a few common commands:<br>quit, support, feedback, about chatterbot, developer skills.']
  },
  greetings: {
    patterns: ['hello', 'hi', 'hey','wassup','sup','greetings'],
    responses: ['Hello!', 'Hi there!', 'Hey! How can I assist you?']
  },
  help: {
    patterns: ['help', 'support', 'assistance'],
    responses: ['Sure, I\'m here to help!', 'What do you need assistance with?', 'I\'m here to assist you.']
  },
  bye: {
    patterns: ['bye', 'goodbye', 'exit','quit','logout','reset','close'],
    responses: ['Goodbye!', 'Have a great day!', 'See you later!']
  },
  contact: {
    patterns: ['contact', 'phone', 'email','operator','support','live'],
    responses: ['You can contact Ernie through the <a href="#contact">contact</a> section of the site, or email ernie@erniejohnson.ca']
  },
  feedback: {
    patterns: ['feedback','comments','comment'],
    responses: ['Your feedback will be valuable! Share your thoughts and suggestions in the "<a href="#contact">contact</a>" section!']
  },
  softSkills: {
    patterns: ['softskills','soft skills','project management'],
    responses: ['Ernie has, of course, numerous "soft skills" he has gained during many years of employment across several different industries. The ability to work independently and within a team, communications, project management and more.'],
  },
  codeSkills: {
    patterns: ['coding skills', 'skills', 'frameworks', 'libraries','languages','json','javascript','react','typescript','nextjs','c','perl','php','bootstrap','materialui','tailwind'],
    responses: ['Ernie has experience in Javascript, Typescript, React, NextJS, C, C++, and more. He is also skilled with backend technologies like NodeJS, Perl, PHP, MySQL, PostgreSQL and more.<br><br>You can find additional skills in the <a href="#about">about</a> section.<BR>Is there something more specific you need?']
  },
  workOptions: {
    patterns: ['work', 'freelance', 'availability'],
    responses: ['Ernie is currently available for freelance, part-time and full-time work. ']
  },
  hackAttempt: {
    patterns: ['script', 'link', 'iframe','${','hack','backdoor','password','cybersecurity','security'],
    responses: ['Ernie has experience in cybersecurity for applications and tends not to leave security vulnerabilities open for possible hack attempts.']
  },
  aboutBot: {
    patterns: ['about', 'chatterbot',],
    responses: ['Chatterbot is in it`s infancy, but built as a React component to work within this project<br><br>As an extra "did you know", Chatterbot was built largely by an AI system with a few prompts from Ernie, followed up with some of his human tweaks of course!']
  },
  botChangeLog: {
    patterns: ['changelog', 'change log', 'version'],
    responses: ['Here is the recent change log for Chatterbot:<br>' + chatbotChangeLog],
  },
  downloads: {
    patterns: ['resume','download','downloads'],
    responses: ['Ernie&#39;s resume can be downloaded <a href="http://www.erniejohnson.ca/resume.pdf">here</a>'],
  },
  useAI: {
    patterns: ['ai','bard','chatgpt','chat gpt'],
    responses: ['Yes, Ernie uses AI technologies like ChatGPT and Google Bard.<br><br>In fact, Chatterbot was written largely by prompting ChatGPT to create the outline and basics of functionality.  Sure, there were a few bugs that needed a human to iron out along the way, and there may not have been much of a time saver from writing it from scratch, but interesting just the same!'],
  },
  botName: {
    patterns: ['your name','bot name'],
    responses: ['My name is Chatterbot v' + chatbotVersion],
  },
  usersName: {
    patterns: ['name'],
    responses: ['Your name is {userName}']
  },
  saveMessages: {
    patterns: ['save','message history','history'],
    responses: ['Appologies,<br>but this is something I can not do quite yet.']
  },
  default: {
    responses: ["I'm sorry, I don't understand that.", "Could you please rephrase that?", "I'm not sure how to help with that."]
  }
};

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
        if(intentName === 'options') { 
          showQuickReplies = true; 
        } else {
          showQuickReplies = false;
        }
        return getRandomResponse(intent.responses);
      }
    }
  }
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
  };

  const handleSendMessage = () => {
    if (userInput.trim() == '' && !userName) {
      // addMessage('Bot', `What is your name?`);
      return;
    }
    if (userInput.trim() !== '') {
      if(!userName) {
        setUserName(userInput);
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
    // get timeframe of day (morning, afternoon, evening)
    const timePeriod = getTimePeriod();
    if(!userName) addMessage('Bot', `ue Good ${timePeriod}!<br>What is your name?`);
  }, []);

  return (
    <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-content"> 
      <div className="chatbot-header">
        <div className="title">ChatterBot</div>
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
