import React, { useEffect, useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';

import '../chat/Chat.css';

// FIXME: url from env/config
const url = 'https://peaceful-meadow-87500.herokuapp.com/';

function Chat() {
  // FIXME: useReducer
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [userMessage, setUserMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [intents, setIntents] = useState([]);
  const [context, setContext] = useState([]);

  const cleanIntents = intents =>
    intents
      .filter(i => i.displayName.startsWith('freeletics'))
      .map(i => ({
        displayName: i.displayName,
        inputContextNames: i.inputContextNames.map(
          c => c.split('/').slice(-1)[0],
        ),
        outputContexts: i.outputContexts.map(
          c => c.name.split('/').slice(-1)[0],
        ),
        trainingPhrase: i.trainingPhrases[0].parts.reduce(
          (s, p) => `${s} ${p.text}`,
          '',
        ),
      }));

  const cleanContext = context =>
    context.map(c => c.name.split('/').slice(-1)[0]);

  const sendMessage = async (message, hidden) => {
    if (!message) return;

    // HACK: for initial load -----
    !hidden &&
      // ----- HACK
      setMessages(messages => [
        ...messages,
        new Message({ id: 0, message: message }),
      ]);

    setIsTyping(true);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, message }),
      });
      const { response, context } = await res.json();

      setMessages(messages => [
        ...messages,
        new Message({ id: 1, message: response }),
      ]);
      setContext(cleanContext(context));
      setUserMessage('');
    } catch (err) {
      console.log(err);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    (async function getInitData() {
      const res = await fetch(url);
      const { sessionId, intents } = await res.json();
      setSessionId(sessionId);
      setIntents(cleanIntents(intents));
      setIsTyping(false);
    })();
  }, []);

  useEffect(() => {
    if (sessionId) sendMessage('Hello', true);
  }, [sessionId]);

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
      <hr />
      {intents
        .filter(i =>
          context.length
            ? i.inputContextNames.length &&
              i.inputContextNames.reduce(
                (res, ic) => (res ? context.includes(ic) : res),
                true,
              )
            : !i.inputContextNames.length,
        )
        .map(i => (
          <button
            key={i.displayName}
            onClick={() => sendMessage(i.trainingPhrase)}
            disabled={isTyping}
          >
            {i.trainingPhrase}
          </button>
        ))}
      <hr />
      <input
        disabled={isTyping}
        className="chat-input"
        onChange={({ target: { value } }) => setUserMessage(value)}
        value={userMessage}
        onKeyPress={({ key }) => key === 'Enter' && sendMessage(userMessage)}
      />
      <button
        disabled={isTyping || !userMessage}
        className="chat-send"
        onClick={() => sendMessage(userMessage)}
      >
        Send
      </button>
    </div>
  );
}

export default Chat;
