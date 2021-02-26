import React, { useState, useEffect } from 'react';
import "./game-field.scss";
import cards from './cards';
import cover from './assets/cover.png';
import GameCard from './../game-card';
import { IGameCard } from './../../constants/interfaces';

interface IForGameField {
  fieldSize: number,
  isGameNew: boolean,
  updateIsGameNew: React.Dispatch<React.SetStateAction<boolean>>,
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
  updateIsGameNew
}) => {
  const [counter, setCounter] = useState<number>(0);
  const [allGameCards, setAllGameCards] = useState<any[]>([]);
  const [pairOfCards, setPairOfCards] = useState<any[]>([]);
  const [pairOfKeys, setPairOfKeys] = useState<any[]>([]);
  const [finalizedCards, setFinalizedCards] = useState<any[]>([]);
    
    
    // по крайней мере загружает и показывает. почитать про useRef
    useEffect(() => {
      const gameCards: any[] = [];
      let currentCards: any[] = gameCards;
      if (isGameNew) {
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
    }, [ ])

    useEffect(() => {
      if (pairOfKeys.length === 2) {
        if (pairOfCards[0] === pairOfCards[1]) {
          setFinalizedCards((card) => [...card, ...pairOfKeys]);
          setPairOfCards([]);
          setPairOfKeys([]);
        } else {
          // потом добавить код на удаление сеттаймаута при анмаунтинге!
          // упс, вот так почему-то назад не закрываются.
          // setTimeout(() => {
          //   setPairOfCards([]);
          //   setPairOfKeys([]);
          // }, 1000);
          // а вот так закрывается, но слишком быстро(
          setPairOfCards([]);
          setPairOfKeys([]);
          
          console.log(pairOfCards, pairOfKeys);
        }
        
      };
      console.log('in the useEffect');
      console.log(pairOfCards, pairOfKeys);
      
    }, [ pairOfKeys, pairOfCards, finalizedCards])
    
    // e: React.MouseEvent<HTMLDivElement, MouseEvent>
  const CardClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const imgID = (e.currentTarget as Element).id;
    const nodeKey = e.currentTarget.dataset.key;
    console.log(imgID, nodeKey, e.currentTarget.dataset.flipped);
    if (finalizedCards.includes(nodeKey)) return;

    setPairOfCards((pair) => [...pair, imgID]);
    setPairOfKeys((pair) => [...pair, nodeKey]);

    setCounter(counter + 1);
    console.log('click');
  };

  return(
    <main className="app-main">
      <div className="game-stat">
        <p>Your score:</p>
        &nbsp;
        {counter}
      </div>
      <div className="game-field">
          
        {allGameCards.map((card, i) => {

          let isFlipped = false; 
          if (pairOfKeys.includes(i.toString())) isFlipped = true;
          if (finalizedCards.includes(i.toString())) isFlipped = true;
          console.log(i, isFlipped);
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
                  <div className="back">
                    <img src={cover} alt="cover" />
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </main>
  )
};

export default GameField;