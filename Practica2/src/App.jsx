import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NoteList from './componentes/NoteList';

function App() 
{
  return (
    <div className="App">
      <p className="app-title">Aplicación de Notas</p>
      <NoteList />
    </div>
  );
}

export default App;
