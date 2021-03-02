import React, { useState, useEffect, useCallback, } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
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
}

interface IForCard {
  id: string,
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
}) => {
  const [, forceUpdate] = useState();
  const [counter, setCounter] = useState<number>(0);
  const [allGameCards, setAllGameCards] = useState<any[]>([]);
  const [pairOfCards, setPairOfCards] = useState<any[]>([]);
  const [pairOfKeys, setPairOfKeys] = useState<any[]>([]);
  const [finalizedCards, setFinalizedCards] = useState<any[]>([]);

  const handle = useFullScreenHandle();
   
    // по крайней мере загружает и показывает. почитать про useRef
    // с запуском новой игры проблемы
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
          const card: IForCard = {
            id: cards[i].name,
            picURL: cards[i].url,
            isFlipped: false,
          };
          gameCards.push(card);
          gameCards.push(card);
        };
        currentCards = shuffleArray(gameCards);
        setAllGameCards([...currentCards]);
        updateIsGameNew(false);
      };
    }, [ isGameNew ])

    useEffect(() => {
      if (pairOfKeys.length === 2) {
        if (pairOfCards[0] === pairOfCards[1]) {
          setFinalizedCards((card) => [...card, ...pairOfKeys]);
          setPairOfCards([]);
          setPairOfKeys([]);
        } else {
          // потом добавить код на удаление сеттаймаута при анмаунтинге!
          // упс, вот так почему-то назад не закрываются.
          // потому что рендер заканчивается до очищения
          // setTimeout(() => {
          //   setPairOfCards([]);
          //   setPairOfKeys([]);
          //   console.log('hi settimeout');
          // }, 700);
          // а вот так закрывается, но слишком быстро(
          setPairOfCards([]);
          setPairOfKeys([]);
          
          console.log(pairOfCards, pairOfKeys);
        }
        
      };
      console.log('in the useEffect');
      console.log(pairOfCards, pairOfKeys);
      if (finalizedCards.length === fieldSize) {
        alert('you won!');
        setFinalizedCards([]);
        setCounter(0);
        updateIsGameNew(true); 
      }
      
    }, [ pairOfKeys, pairOfCards, finalizedCards])
    
    // e: React.MouseEvent<HTMLDivElement, MouseEvent>
  const CardClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const imgID = (e.currentTarget as Element).id;
    const nodeKey = e.currentTarget.dataset.key;
    console.log(imgID, nodeKey, e.currentTarget.dataset.flipped);
    if (finalizedCards.includes(nodeKey)) return;
    if (pairOfCards.includes(imgID) && pairOfKeys.includes(nodeKey)) return;

    setPairOfCards((pair) => [...pair, imgID]);
    setPairOfKeys((pair) => [...pair, nodeKey]);

    setCounter(counter + 1);
    console.log('click');
  };

  const HandleFullScreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  const screenButton = handle.active ? (<i className="fa fa-compress"></i>) : (<i className="fa fa-expand"></i>);

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


          let isFlipped = false;
          if (pairOfKeys.includes(i.toString())) isFlipped = true;
          if (finalizedCards.includes(i.toString())) isFlipped = true;
          console.log(i, isFlipped);

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
            <div id={card.id} className={`game-field-card ${isFlipped ? "flipped" : ""}`} 
              key={i} 
              onClick={CardClickHandler}
              data-key={i}
              data-flipped={isFlipped}>
              <div className="inner">
                <div className="front">
                    <img src={card.picURL} id={card.id} className={`front-card-img`} alt="cover" />
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