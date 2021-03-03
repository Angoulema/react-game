import React, { ReactNode, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, Link,
} from 'react-router-dom';
import { PlayFunction } from 'use-sound/dist/types';
import './settings.scss';

interface IForSetting {
  fieldSize: number,
  updateFieldSize: React.Dispatch<React.SetStateAction<number>>,
  isGameNew: boolean,
  updateIsGameNew: React.Dispatch<React.SetStateAction<boolean>>,
  cardSet: number,
  updateCardSet: React.Dispatch<React.SetStateAction<number>>,
  cardColor: number,
  updateCardColor: React.Dispatch<React.SetStateAction<number>>,
  isSoundsOn: boolean,
  updateSoundOn: React.Dispatch<React.SetStateAction<boolean>>,
  isMusicOn: boolean,
  updateMusicOn: React.Dispatch<React.SetStateAction<boolean>>,
  soundVolume: number,
  updateSoundVolume: React.Dispatch<React.SetStateAction<number>>,
  musicVolume: number,
  updateMusicVolume: React.Dispatch<React.SetStateAction<number>>,
  stop: (id?: string) => void,
  playMusic: PlayFunction,
  playSound: PlayFunction,
}

const Settings: React.FC<IForSetting> = (props: IForSetting) => {

  const {
    fieldSize, updateFieldSize, isGameNew, updateIsGameNew, cardSet,
    updateCardSet, cardColor, updateCardColor, soundVolume, updateSoundVolume,
    musicVolume, updateMusicVolume, isSoundsOn, updateSoundOn,
    isMusicOn, updateMusicOn, stop, playMusic, playSound,
  } = props;

  useEffect(() => {
    updateIsGameNew(true);
  }, []);

  // const MAX_SOUND = 1;
  const gameFieldOptions: number[] = [16, 20, 24];
  const cardSetOptions: number[] = [1, 2, 3];
  const cardColorOptions: number[] = [0, 1, 2];

  const GameFieldOptionsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = target.value;
    console.log(value);
    updateFieldSize(+value);
    updateIsGameNew(true);
    console.log(fieldSize);
  };

  const CardSetOptionsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = target.value;
    console.log(value);
    updateCardSet(+value);
    updateIsGameNew(true);
  };

  const CardColorOptionsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = target.value;
    console.log(value);
    updateCardColor(+value);
    updateIsGameNew(true);
  };

  const MusicHandler = () => {
    updateMusicOn(!isMusicOn);
    if (isMusicOn) {
      playMusic();
    };
    if (!isMusicOn) {
      stop();
    }
  };

  const SoundHandler = () => {
    updateSoundOn(!isSoundsOn);
  };

  const MusicVolumeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = +target.value / 10;
    updateMusicVolume(value);
  }

  const soundVolumeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = +target.value / 10;
    updateSoundVolume(value);
    if (isSoundsOn) playSound();
  }

  const OnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="settings-page">
      <div className="settings-page-container">
        <div className="settings-game">
          <form onSubmit={OnSubmit}>
            <fieldset className="set-gamefield-options fieldset-opts">
              <legend className="settings-legend">
                Set gamefield size
              </legend>
              <p className="gamefield-options">
                <input type="radio" value={gameFieldOptions[0]} checked={fieldSize === gameFieldOptions[0]}
                onChange={GameFieldOptionsHandler} />
                &nbsp;
                {gameFieldOptions[0]} cards
              </p>
              <p className="gamefield-options">
                <input type="radio" value={gameFieldOptions[1]} checked={fieldSize === gameFieldOptions[1]} 
                  onChange={GameFieldOptionsHandler}/>
                &nbsp;
                {gameFieldOptions[1]} cards
              </p>
              <p className="gamefield-options">
                <input type="radio" value={gameFieldOptions[2]} checked={fieldSize === gameFieldOptions[2]}
                  onChange={GameFieldOptionsHandler}/>
                &nbsp;
                {gameFieldOptions[2]} cards
              </p>          
              <p>
                <input type="submit" className="submit-btns"/>
                </p>
            </fieldset>
          </form>
          <form onSubmit={OnSubmit}>
            <fieldset className="set-pics-options fieldset-opts">
              <legend className="settings-legend">
                Choose pictures set
              </legend>
              <p className="pics-options">
                <input type="radio" value={cardSetOptions[0]} checked={cardSet === cardSetOptions[0]}
                  onChange={CardSetOptionsHandler}/>
                &nbsp;
                Set 1: figure skaters' asses
              </p>
              <p className="pics-options">
                <input type="radio" value={cardSetOptions[1]} checked={cardSet === cardSetOptions[1]}
                  onChange={CardSetOptionsHandler}/>
                &nbsp;
                Set 2: Yuzuru Hanyu
              </p>
              <p className="pics-options">
                <input type="radio" value={cardSetOptions[2]} checked={cardSet === cardSetOptions[2]}
                  onChange={CardSetOptionsHandler}/>
                &nbsp;
                Set 2: Yuzuru Hanyu again 
              </p>
              <p>
                <input type="submit" className="submit-btns"/>
              </p>
            </fieldset>
          </form>
          <form onSubmit={OnSubmit}>
            <fieldset className="color-pics-options fieldset-opts">
              <legend className="settings-legend">
                Choose card-back color
              </legend>
              <p className="pics-color">
                <input type="radio" value={cardColorOptions[0]} checked={cardColor === cardColorOptions[0]}
                  onChange={CardColorOptionsHandler}/>
                &nbsp;
                <span className="light-light">Super-light blue</span>
              </p>
              <p className="pics-color">
                <input type="radio" value={cardColorOptions[1]} checked={cardColor === cardColorOptions[1]}
                  onChange={CardColorOptionsHandler}/>
                &nbsp;
                <span className="light-secondary">Light blue</span>
              </p>
              <p className="pics-color">
                <input type="radio" value={cardColorOptions[2]} checked={cardColor === cardColorOptions[2]}
                  onChange={CardColorOptionsHandler}/>
                &nbsp;
                <span className="light-primary">Light violet</span>
              </p>
              <p>
                <input type="submit" className="submit-btns"/>
              </p>
            </fieldset>

          </form>
        </div>
        <div className="settings-sounds">
          <form onSubmit={OnSubmit}>
            <fieldset className="music-options fieldset-opts">
              <legend className="settings-legend">
                Music settings
              </legend>
              <span className="toggle">
                <input id="music-set" className="tgl tgl-skewed" type="checkbox"
                checked={isMusicOn} onChange={MusicHandler} />
                <label className="tgl-btn" data-tg-off="OFF" data-tg-on="ON" htmlFor="music-set"></label>
              </span>
              <p className="music-opts">
                <input type="range" min="0" max="10" step="1" defaultValue={musicVolume * 10} 
                  className="range-input" id="music-range"
                  onChange={MusicVolumeHandler} />
              </p>
              <p>
                <input type="submit" className="submit-btns"/>
              </p>
            </fieldset>
          </form>
          <form onSubmit={OnSubmit}>
            <fieldset className="sounds-options fieldset-opts">
              <legend className="settings-legend">
                Sound settings
              </legend>
              <span className="toggle">
                <input id="sound-set" className="tgl tgl-skewed" type="checkbox"
                checked={isSoundsOn} onChange={SoundHandler} />
                <label className="tgl-btn" data-tg-off="OFF" data-tg-on="ON" htmlFor="sound-set"></label>
              </span>
              <p className="sound-opts">
                <input type="range" min="0" max="10" step="1" defaultValue={soundVolume * 10} 
                  className="range-input" id="sound-range"
                  onChange={soundVolumeHandler} />
              </p>
              <p>
                <input type="submit" className="submit-btns"/>
              </p>
            </fieldset>
          </form>
          <div className="control-group fieldset-opts">
            <p className="settings-legend new-block">
            Hotkeys to control settings of the game
            </p>
            <div className="control-group-art">
              Press
              &ensp;
              <kbd>
                m 
              </kbd>
              &ensp;
              to stop or start the music replay.
            </div>
            <div className="control-group-art">
              Press
              &ensp;
              <kbd>
                s
              </kbd>
              &ensp;
              to turn sounds on or off.
            </div>
            <div className="control-group-art">
              Press
              &ensp;
              <kbd>
                c
              </kbd>
              &ensp;
              to go to the settings page.
            </div>
            <div className="control-group-art">
              Press
              &ensp;
              <kbd>
                t
              </kbd>
              &ensp;
               to go to the statistics page.
            </div>
            <div className="control-group-art">
              Press
              &ensp;
              <kbd>
                g
              </kbd>
              &ensp;
               to go to the main page.
            </div>
            <p className="control-warning">Please, don't use redirecting keys in the fullscreen mode.</p>
            <p className="music-c">Royalty Free Music from Bensound.</p>         
          </div>

        </div>
        
        <div className="come-back-btn">
          <Link to="/"
            className="settings-link"
            tabIndex={10}>
              Back to game
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Settings;