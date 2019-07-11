import React from 'react';
import { useTransition, animated } from 'react-spring';

const Feed = ({ messages, isTyping, sendMessage, possibleIntents }) => {
  const dialogTransitions = useTransition(messages, message => message.id, {
    from: { transform: 'translate3d(0,4px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,4px,0)' },
  });
  return (
    <div className="conversation">
      {dialogTransitions.map(({ item: message, props, key }) => (
        <animated.div
          className={`message ${message.coach === 0 ? 'luky' : 'krm'}`}
          key={key}
          style={props}
          dangerouslySetInnerHTML={{ __html: message.message }}
        />
      ))}
      <div className="clear"></div>
      {!isTyping && (
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
      )}
    </div>
  );
};

export default Feed;
