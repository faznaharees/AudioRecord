import React from 'react';
import Recording from './components/Recording';
import Image from './components/Image';
import Question from './components/Question'

function App() {
  return (
    <div className="App">
  
      <center>
      <Question/>
      <Image/>
      <Recording/>
      </center>
    </div>
  );
}

export default App;
