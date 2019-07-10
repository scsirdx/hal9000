import React from 'react';

const Feed = ({ messages, isTyping, sendMessage, possibleIntents }) => (
  <div className="conversation">
    {/* FIXME: use proper ids */}
    {messages.map((message, i) => (
      <div className={message.coach === 0 ? 'luky' : 'krm'} key={i}>
        {message.message}
      </div>
    ))}
    {isTyping ? (
      <div className="krm">...</div>
    ) : (
      <React.Fragment>
        <div className="clear" />
        <div className="possible-intents">
          {possibleIntents.map(i => (
            <button
              className="intent"
              key={i.displayName}
              onClick={() => sendMessage(i.trainingPhrase)}
              disabled={isTyping}
            >
              {i.trainingPhrase}
            </button>
          ))}
        </div>
      </React.Fragment>
    )}
  </div>
);

export default Feed;
