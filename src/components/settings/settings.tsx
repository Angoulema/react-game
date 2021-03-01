import React, { ReactNode, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, Link,
} from 'react-router-dom';
import './settings.scss';

interface IForSetting {
  fieldSize: number,
  updateFieldSize: React.Dispatch<React.SetStateAction<number>>,
  isGameNew: boolean,
  updateIsGameNew: React.Dispatch<React.SetStateAction<boolean>>,
  cardSet: number,
  updateCardSet: React.Dispatch<React.SetStateAction<number>>,
}

const Settings: React.FC<IForSetting> = (props: IForSetting) => {

  const {
    fieldSize, updateFieldSize, isGameNew, updateIsGameNew, cardSet,
    updateCardSet,
  } = props;

  const gameFieldOptions: number[] = [16, 20, 24];
  const cardSetOptions: number[] = [1, 2, 3];

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
  }

  const OnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <div className="settings-page">
      <form onSubmit={OnSubmit}>
        <fieldset className="set-gamefield-options">
          <legend>
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
        <fieldset className="set-pics-options">
          <legend>
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
      
      <Link to="/"
        className="settings-link">
          Back to game
      </Link>
    </div>
  );
};

export default Settings;