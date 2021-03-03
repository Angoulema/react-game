import React, { ReactNode, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import useSound from 'use-sound';
import './App.scss';
import Header from './../header';
import GameField from './../game-field';
import Settings from './../settings';
import Statistics from './../statistics';
import Footer from './../footer';
import info from './../../sounds/info.mp3';
import bensoundUkulele from './../../sounds/bensoundUkulele.mp3';

const App: React.FC = () => {
  const [fieldSize, setFieldSize] = useState<number>(20); // 16 || 20 || 24
  const [cardSet, setCardSet] = useState<number>(1); // 1 || 2 || 3
  const [cardColor, setCardColor] = useState<number>(0); // 0 || 1 || 2
  const [isGameNew, setIsGameNew] = useState<boolean>(true);
  const [isSoundsOn, setIsSoundsOn] = useState<boolean>(false);
  const [isMusicOn, setIsMusicOn] = useState<boolean>(false);
  const [soundVolume, setSoundVolume] = useState<number>(0.5);
  const [musicVolume, setMusicVolume] = useState<number>(0.5);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [ playSound ] = useSound(info, {volume: soundVolume});
  const [ playMusic, { stop } ] = useSound(bensoundUkulele, {volume: musicVolume});

  return (
    <Router>
      <div className="app">
        <Header isSoundsOn={isSoundsOn}
          updateSoundOn={setIsSoundsOn}
          isMusicOn={isMusicOn}
          updateMusicOn={setIsMusicOn}
          playMusic={playMusic}
          stop={stop}
          soundVolume={soundVolume}
          updateSoundVolume={setSoundVolume}
          musicVolume={musicVolume}
          updateMusicVolume={setMusicVolume}
          showModal={showModal}
        />
        <Switch>
        <Route path="/settings" render={() => (
            <Settings fieldSize={fieldSize}
              updateFieldSize={setFieldSize}
              isGameNew={isGameNew}
              updateIsGameNew={setIsGameNew}
              cardSet={cardSet}
              updateCardSet={setCardSet}
              cardColor={cardColor}
              updateCardColor={setCardColor}
              isSoundsOn={isSoundsOn}
              updateSoundOn={setIsSoundsOn}
              isMusicOn={isMusicOn}
              updateMusicOn={setIsMusicOn}
              soundVolume={soundVolume}
              updateSoundVolume={setSoundVolume}
              musicVolume={musicVolume}
              updateMusicVolume={setMusicVolume}
              stop={stop}
              playMusic={playMusic}
              playSound={playSound} /> 
            )} />
        <Route path="/statistics" render={() => (
            <Statistics  /> 
            )} />
          <Route path="/" render={() =>  (
            <GameField fieldSize={fieldSize}
              isGameNew={isGameNew}
              updateIsGameNew={setIsGameNew}
              cardSet={cardSet}
              cardColor={cardColor}
              isSoundsOn={isSoundsOn}
              sound={playSound}
              showModal={showModal}
              setShowModal={setShowModal} />
          )} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
