import React, { ReactNode, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import './App.scss';
import Header from './../header';
import GameField from './../game-field';
import Settings from './../settings';
import Footer from './../footer';

// interface IForGameField {
//   fieldSize: number,
// }

const App: React.FC = () => {
  const [fieldSize, setFieldSize] = useState<number>(20); // 12 || 16 || 20 || 24
  // const [counter, setCounter] = useState<number>(0);
  const [isTimerOn, setTimerOn] = useState<boolean>(false);
  const [isGameNew, setIsGameNew] = useState<boolean>(true);

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
        <Route path="/settings" render={() => (
            <Settings updateFieldSize={setFieldSize} /> 
            )} />
          <Route path="/" render={() =>  (
            <GameField fieldSize={fieldSize}
              isGameNew={isGameNew}
              updateIsGameNew={setIsGameNew} />
          )} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
