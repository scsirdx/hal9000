import React from 'react';

const Feed = ({ messages, isTyping }) => (
  <div className="conversation">
    {/* FIXME: use proper ids */}
    {messages.map((message, i) => (
      <div className={message.coach === 0 ? 'luky' : 'krm'} key={i}>
        {message.message}
      </div>
    ))}
    {isTyping && <div className="krm">...</div>}
  </div>
);

export default Feed;
