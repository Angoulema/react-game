import React, { useState } from 'react';
import './App.scss';
import Header from './../header';
import GameField from './../game-field';
import Footer from './../footer';

// interface IForGameField {
//   fieldSize: number,
// }

const App: React.FC = () => {
  const [fieldSize, setFieldSize] = useState<number>(12); // 12 || 16 || 20
  // const [counter, setCounter] = useState<number>(0);
  const [isTimerOn, setTimerOn] = useState<boolean>(false);
  const [isGameNew, setIsGameNew] = useState<boolean>(true);

  return (
    <div className="app">
      <Header />
      <GameField fieldSize={fieldSize}
        isGameNew={isGameNew}
        updateIsGameNew={setIsGameNew} />
      <Footer />
    </div>
  );
}

export default App;
