import React, { useState } from 'react';
import './App.scss';
import Header from './../header';
import GameField from './../game-field';
import Footer from './../footer';

interface IForGameField {
  fieldSize: number,
}

const App: React.FC = () => {
  const [fieldSize, setFieldSize] = useState<number>(12);
  return (
    <div className="app">
      <Header />
      <GameField fieldSize={fieldSize}/>
      <Footer />
    </div>
  );
}

export default App;
