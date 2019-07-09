import React, { useEffect, useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';

import './Chat.css';

const ApiAi = require('api-ai-javascript');
const client = new ApiAi.ApiAiClient({
  accessToken: '9adc7d8b03ba4e9f9c01f084f3d92765',
});

function Chat() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [userMessage, setUserMessage] = useState('');

  const sendMessage = message => {
    // HACK: for initial load -----
    userMessage &&
      // ----- HACK
      setMessages(messages => [
        ...messages,
        new Message({ id: 0, message: userMessage }),
      ]);

    setIsTyping(true);

    client
      .textRequest(message)
      .then(res => {
        console.log(res);
        setMessages(messages => [
          ...messages,
          new Message({ id: 1, message: res.result.fulfillment.speech }),
        ]);
        setUserMessage('');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsTyping(false));
  };

  useEffect(() => {
    sendMessage('Hello');
  }, []);

  return (
    <div className="Chat">
      <div className="chat-wrap">
        <ChatFeed
          messages={messages}
          isTyping={isTyping}
          hasInputField={false}
          showSenderName
          bubblesCentered={false}
          bubbleStyles={{
            text: {
              fontSize: 18,
            },
            chatbubble: {
              borderRadius: 18,
              padding: 16,
            },
          }}
        />
      </div>
      <input
        className="chat-input"
        onChange={({ target: { value } }) => setUserMessage(value)}
        value={userMessage}
        onKeyPress={({ key }) => key === 'Enter' && sendMessage(userMessage)}
      />
      <button
        disabled={isTyping}
        className="chat-send"
        onClick={() => sendMessage(userMessage)}
      >
        Send
      </button>
    </div>
  );
}

export default Chat;
