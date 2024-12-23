import React from 'react';
import './App.css';

import Pessoas from './components/Pessoas';

function App (){
  return (
    <div className="App">
      <main>
      <h1> Meu controle de remédios </h1>
        <Pessoas />
      </main>
    </div>
  );
}

export default App;
