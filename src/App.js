import './App.css';
import Message from './components/message'
import React, {useState, useEffect} from 'react'

function App() {

  const [message, changeMessage] = useState('');

  function onMessageChanged(e) {
    changeMessage(e.target.value);
    console.log(e.target.value);
  }

  function onEnter(e) {
    if(e.key === "Enter") {
      e.target.value = ''

      // SEND MESSAGE
    }
  }

  return (
    <div>
      <div className="messages">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <input onKeyDown={(e) => {onEnter(e)}} onChange={(e) => {onMessageChanged(e)}} className="text-entry-box" placeholder="Start typing here..."></input>
    </div>
  );
}

export default App;
