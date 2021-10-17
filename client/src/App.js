import React, { useState } from 'react';
import './App.css';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      {!loggedIn? 
      <h1>You are not Logged In!</h1>:
      <h1>You are  Logged In!</h1>}
  </div>
  );
}

export default App;
