import React from 'react';
import './App.css';

import Comentario from './components/Comentario';


function App() {
  return (
    <div className="App">
      <h1>Meu primeiro projeto.</h1>
      <Comentario nome="Dartagnan" email="dartagnan.jr@gmail.com" data={new Date(1961, 12, 30)}>
        Olá Tudo bem ?
      </Comentario>
      <Comentario nome="Anália" email="eunalihinha@gmail.com" data={new Date(1964, 4, 19)}>
        Olá Eu sou Anália...
      </Comentario> 
    </div>
  );
}

export default App;
