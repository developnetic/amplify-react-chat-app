import './App.css';
import MessageComponent from './components/message'
import React, {useState, useEffect} from 'react'
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Message } from './models';

function App() {

  const [message, changeMessage] = useState('');
  const [Messages, updateMessages] = useState([{message: 'Nothing to see here'}]);
  const [numberOfMessages, changeNumberOfMessages] = useState(20);


  useEffect(() => {
    fetchMessages();
    const subscription = DataStore.observe(Message).subscribe(() => {
      fetchMessages();
    });
    return () => subscription.unsubscribe();
  });

  function onMessageChanged(e) {
    changeMessage(e.target.value);
  }

//FETCH MESSAGES
async function fetchMessages() {
  const fetchedMessages = await DataStore.query(Message,Predicates.ALL, {
    sort: (s) => s.timestamp(SortDirection.DESCENDING),
    limit: numberOfMessages,
  });
  updateMessages(fetchedMessages);
  // await fetchUser()
}

  async function sendMessage() {

    if(message === '') {
      return;
    }

    await DataStore.save(
      new Message({
      "content": message,
      "timestamp": Date.now(),
      // "sender": ""
    })
  );
    

  changeMessage('');
  }

  function onEnter(e) {
    if(e.key === "Enter") {
      e.target.value = ''

      sendMessage();
    }
  }

  return (
    <div className="ChatScreen">
      <div className="messages">
        {
          Messages.slice().reverse().map((message) => (
            <MessageComponent content={message.content} />
          ))};
      </div>

      <div className="input">
      <input onKeyDown={(e) => {onEnter(e)}} onChange={(e) => {onMessageChanged(e)}} className="text-entry-box" placeholder="Start typing here..."></input>
      </div>
    </div>
  );
}

export default App;
