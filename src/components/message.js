import '../Message.css'

function App(props) {
  return (
    <div className="message">
        <p>{props.content}</p>
      {/*  some text here */}
    </div>
  );
}

export default App;