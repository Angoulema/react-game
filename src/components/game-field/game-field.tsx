import React, { useState, useEffect, useCallback, } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useSound from 'use-sound';
import { PlayFunction } from 'use-sound/dist/types';
import hotkeys from 'hotkeys-js';
import "./game-field.scss";
import cards1 from './../../cards/cards1';
import cards2 from './../../cards/cards2';
import cards3 from './../../cards/cards3';
import cover from './assets/cover.png';
import storage from './../../constants/storage-function';
import GameCard from './../game-card';
import { IGameCard } from './../../constants/interfaces';

interface IForGameField {
  fieldSize: number,
  isGameNew: boolean,
  updateIsGameNew: React.Dispatch<React.SetStateAction<boolean>>,
  cardSet: number,
  cardColor: number,
  sound: PlayFunction,
  isSoundsOn: boolean,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

interface IForCard {
  id: number,
  name: string,
  picURL: string,
  isFlipped: boolean,
}

function shuffleArray(arr:any[]) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

const GameField: React.FC<IForGameField> = ({
  fieldSize,
  isGameNew,
  updateIsGameNew,
  cardSet,
  cardColor,
  sound,
  isSoundsOn,
  showModal,
  setShowModal,
}) => {
  const [counter, setCounter] = useState<number>(0);
  const [allGameCards, setAllGameCards] = useState<any[]>([]);
  const [pairOfCards, setPairOfCards] = useState<any[]>([]);
  const [finalizedCards, setFinalizedCards] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handle = useFullScreenHandle();
   
    useEffect(() => {
      if (isGameNew) {
        let cards: any;
        switch (cardSet) {
          case 1: cards = cards2;
          break;
          case 2: cards = cards1;
          break;
          default: cards = cards3;
        };
        
        const gameCards: any[] = [];
        let currentCards: any[] = gameCards;
        for (let i = 0; i < (fieldSize / 2); i++) {
          const card1: IForCard = {
            id: i,
            name: cards[i].name,
            picURL: cards[i].url,
            isFlipped: false,
          };
          const card2: IForCard = {
            id: fieldSize - i,
            name: cards[i].name,
            picURL: cards[i].url,
            isFlipped: false,
          };

          gameCards.push(card1);
          gameCards.push(card2);
        };
        currentCards = shuffleArray(gameCards);
        setAllGameCards([...currentCards]);
        updateIsGameNew(false);
      };
    }, [ isGameNew ])

    const HandleNewGame =() => {
      setFinalizedCards([]);
      setPairOfCards([]);
      setCounter(0);
      updateIsGameNew(true);
    };

    const clearPairOfCards = () => {
      setPairOfCards([]);
      console.log('should be clean now');
    };
    const gameOver = () => {
      alert('you won!');
      HandleNewGame();
    };

    useEffect(() => {
      if (pairOfCards.length === 2) {
        const first = pairOfCards[0].name;
        const second = pairOfCards[1].name;
        if (first === second) {
          setFinalizedCards((card) => [...card, ...pairOfCards]);
          setPairOfCards([]);
        } else {
          // потом добавить код на удаление сеттаймаута при анмаунтинге!
          pairOfCards[0].isFlipped = !pairOfCards[0].isFlipped;
          pairOfCards[1].isFlipped = !pairOfCards[1].isFlipped;
          setTimeout(clearPairOfCards, 700);

          console.log(pairOfCards, );
        }
      };
      if (finalizedCards.length === fieldSize) {
        setTimeout(gameOver, 700); 
      }
      
    // return () => {
    //   clearTimeout(clearPairOfCards);
    //   clearTimeout(gameOver);
    // }
    }, [ pairOfCards, finalizedCards])
    

  const ClickHandler = (card:IForCard) => {
    if (finalizedCards.includes(card)) return;
    if (pairOfCards.includes(card)) return;
    card.isFlipped = !card.isFlipped;
    if (isSoundsOn) sound();
    setPairOfCards((pair) => [...pair, card]);
    setCounter(counter + 1);
  }

  const HandleFullScreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  const screenButton = handle.active ? (<i tabIndex={0} className="fa fa-compress"></i>) : (<i tabIndex={5} className="fa fa-expand"></i>);

  let BasicAttention: string = '';
  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };
  const KeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log(inputValue);
    }
  };
  const ModalButtonHandler = () => {
    if (inputValue.length < 3) {
      BasicAttention = 'You name should have at least 3 characters!';
    } else {
      const newRecord = {
        name: inputValue,
        steps: counter,
      };
      switch (fieldSize) {
        case 16: storage('MFSEField16', newRecord);
        break;
        case 20: storage('MFSEField20', newRecord);
        break;
        case 24: storage('MFSEField24', newRecord);
        break;
        default: return;
      };
      setShowModal(false);
      setInputValue('');
      HandleNewGame();
    };
  };
  
  const ModalWindow = showModal ? (
    <div className="modal-window">
      <div className="modal-window-greeting">
        Congratulations! You won the game in <strong>{counter}</strong> steps!
      </div>
      <div className="modal-window-input-zone">
        <p>Please, enter you name, so we can put you on our table of glory.</p>
        <input
          className="modal-window-input-zone-input"
          type="text"
          size={20}
          minLength={3}
          maxLength={20}
          spellCheck={false}
          value={inputValue}
          onChange={InputChangeHandler}
          onKeyPress={KeyPressHandler}/>
        <p>
          You name should have at least 3 characters!
        </p>
      </div>
      <button className="modal-window-btn"
        onClick={ModalButtonHandler}>
        Send and start a new game
      </button>
    </div>
  ) : null;

  return(
    <main className="app-main">
      <FullScreen handle={handle}>
      <div className="game-stat">
        <button className="new-btn field-header-btns" onClick={HandleNewGame}>
          New Game
        </button>
        <p className="score-line">
          Your score:
          &nbsp;
          {counter}
        </p>
        <button className="fullscreen-btn field-header-btns" onClick={HandleFullScreen}>
          {screenButton}
        </button>
      </div>
      <div className="game-field">
        {allGameCards.map((card, i) => {

          // меняем цвет рубашки в зависимости от настроек
          let colorPlus: string = "";
          switch (cardColor) {
            case 1: colorPlus="secondary";
            break;
            case 2: colorPlus="primary";
            break;
            default: colorPlus="";
          };
          return (
            // <GameCard picURL={card.picURL}
            //   id={card.id}
            //   coverURL={cover}
            //   updateCounter={setCounter}
            //   counter={counter}
            //   position={i}/>
            <div id={card.name} className={`game-field-card ${card.isFlipped ? "flipped" : ""}`} 
              key={card.id} 
              onClick={() => ClickHandler(card)}
              data-key={card.id}
              data-flipped={card.isFlipped}>
              <div className="inner">
                <div className="front">
                    <img src={card.picURL} id={card.name} className={`front-card-img`} alt="cover" />
                  </div>
                <div className={`back ${colorPlus}`}>
                    <img src={cover} alt="cover" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {ModalWindow}
      </FullScreen>
      
    </main>
  )
};

export default GameField;
