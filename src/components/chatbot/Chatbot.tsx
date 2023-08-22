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

type TProps = {
  tooltip: string;
  children: ReactNode;
};

// TODO need to ensure we check for full words - presently 'history' triggers based on 'hi' in the greetings!
const intents = {
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
    patterns: ['bye', 'goodbye', 'exit','quit','logout','reset'],
    responses: ['Goodbye!', 'Have a great day!', 'See you later!']
  },
  contact: {
    patterns: ['contact', 'phone', 'email','operator','support','live'],
    responses: ['You can contact Ernie through the contact section of the site, or email ernie@erniejohnson.ca']
  },
  feedback: {
    patterns: ['feedback','comments','comment'],
    responses: ['Your feedback will be valuable! Share your thoughts and suggestions in the "contact" section!']
  },
  codeSkills: {
    patterns: ['coding skills', 'skills', 'frameworks', 'libraries','languages'],
    responses: ['Ernie has experience in Javascript, Typescript, React, NextJS, C, C++, PHP, Perl and more. Is there something more specific you need?']
  },
  hackAttempt: {
    patterns: ['script', 'link', 'iframe','${','hack','backdoor','password',],
    responses: ['Ernie has experience in cybersecurity for applications. This attack has been blocked!']
  },
  aboutBot: {
    patterns: ['about', 'chatterbot',],
    responses: ['Chatterbot is in it`s infancy, but built as a React component to work within this project. As an extra "did you know", Chatterbot was built largely by an AI system with a few prompts from Ernie, followed up with some of his human tweaks of course!']
  },
  botChangeLog: {
    patterns: ['changelog', 'change log'],
    responses: ['Here is the changelog for Chatterbot:<br>2023-08 - 1.0 - initial release'],
  },
  downloads: {
    patterns: ['resume'],
    responses: ['Ernie&#39;s resume can be downloaded <a href="http://www.erniejohnson.ca/resume.pdf">here</a>'],
  },
  botName: {
    patterns: ['your name','bot name'],
    responses: ['My name is Chatterbot 1.0'],
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

function getResponse(message) {
  const lowerMessage = message.toLowerCase();

  for (const intentName in intents) {
    const intent = intents[intentName];
    // for (const pattern of intent.patterns || []) {
    //   if (lowerMessage.includes(pattern)) {
    //     return getRandomResponse(intent.responses);
    //   }
    // }
    for (const pattern of intent.patterns || []) {
      const regexPattern = new RegExp(`\\b${pattern}\\b`, 'i'); // Create regex with word boundaries
      if (regexPattern.test(lowerMessage)) {
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

  const handleSendMessage = () => {
    if (userInput.trim() == '' && !userName) {
      // addMessage('Bot', `What is your name?`);
      return;
    }
    if (userInput.trim() !== '') {
      if(!userName) {
        setUserName(userInput);
        addMessage('Bot', `Hi ${userInput}! How can I assist you today?`);
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
    if(!userName) addMessage('Bot', `ue What is your name?`);
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
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === 'Bot' && (
              <div className="avatar-circle">
                {/* You can place an image tag or an icon here */}
                <i className="fa-solid fa-robot"></i>
              </div>
            )}
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
        ))}
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
