import React, { ReactNode, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import './App.scss';
import Header from './../header';
import GameField from './../game-field';
import Settings from './../settings';
import Statistics from './../statistics';
import Footer from './../footer';

// interface IForGameField {
//   fieldSize: number,
// }

const App: React.FC = () => {
  const [fieldSize, setFieldSize] = useState<number>(20); // 16 || 20 || 24
  const [cardSet, setCardSet] = useState<number>(1); // 1 || 2 || 3
  const [cardColor, setCardColor] = useState<number>(0); // 0 || 1 || 2
  const [isTimerOn, setTimerOn] = useState<boolean>(false);
  const [isGameNew, setIsGameNew] = useState<boolean>(true);



  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
        <Route path="/settings" render={() => (
            <Settings fieldSize={fieldSize}
              updateFieldSize={setFieldSize}
              isGameNew={isGameNew}
              updateIsGameNew={setIsGameNew}
              cardSet={cardSet}
              updateCardSet={setCardSet}
              cardColor={cardColor}
              updateCardColor={setCardColor} /> 
            )} />
        <Route path="/statistics" render={() => (
            <Statistics  /> 
            )} />
          <Route path="/" render={() =>  (
            <GameField fieldSize={fieldSize}
              isGameNew={isGameNew}
              updateIsGameNew={setIsGameNew}
              cardSet={cardSet}
              cardColor={cardColor} />
          )} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
