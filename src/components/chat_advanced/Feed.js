import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Feed = ({ messages, isTyping, sendMessage, possibleIntents }) => (
  <div className="conversation">
    <TransitionGroup className="dialog">
      {/* FIXME: use proper ids */}
      {messages.map((message, i) => (
        <CSSTransition key={i} timeout={500} classNames="dialog-item">
          <div
            className={`message ${message.coach === 0 ? 'luky' : 'krm'}`}
            key={i}
            dangerouslySetInnerHTML={{ __html: message.message }}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
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
