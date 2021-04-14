import logo from './logo.svg';
import './App.css';
import FetchData from './components/FetchData';
import FetchDataFunction from './components/FetchDataFunction'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{marginBottom: "5px"}}> Dashboard </h1>
        <a class="Header-link" href="https://openmonitor.zeekay.dev" >&gt;&gt;&gt;   Visit us on GitHub!   &lt;&lt;&lt;</a>
        
      </header>
      <div >
        <FetchDataFunction />
      </div>
    </div>

    /*<div className="App"> 
       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
  );
}

export default App;
