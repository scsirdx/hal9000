import React from 'react';

import Chat from './components/chat';
import ChatAdvanced from './components/chat_advanced';

import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        {/* <Chat /> */}
        <ChatAdvanced />
      </main>
    </div>
  );
}

export default App;
