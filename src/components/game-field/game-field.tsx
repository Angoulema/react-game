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
  fieldSize, // размер поля
  isGameNew,
  updateIsGameNew,
  cardSet,
  cardColor,
  sound,
  isSoundsOn
}) => {
  const [counter, setCounter] = useState<number>(0);
  const [allGameCards, setAllGameCards] = useState<any[]>([]);
  const [pairOfCards, setPairOfCards] = useState<any[]>([]);
  const [finalizedCards, setFinalizedCards] = useState<any[]>([]);

  const handle = useFullScreenHandle();
   
    useEffect(() => {
      if (isGameNew) {
        let cards: any;
        switch (cardSet) {
          case 1: cards = cards1;
          break;
          case 2: cards = cards2;
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

    const clearPairOfCards = () => {
      setPairOfCards([]);
      console.log('should be clean now');
    };
    const gameOver = () => {
      alert('you won!');
      setFinalizedCards([]);
      setCounter(0);
      updateIsGameNew(true);
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

  return(
    <main className="app-main">
      <FullScreen handle={handle}>
      <div className="game-stat">
        <p>
          Your score:
          &nbsp;
          {counter}
        </p>
        <button className="fullscreen-btn" onClick={HandleFullScreen}>
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
      </FullScreen>
      
    </main>
  )
};

export default GameField;
