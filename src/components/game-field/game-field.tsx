import React from 'react';
import "./game-field.scss";
import cards from './cards';
import cover from './assets/cover.png';
import GameCard from './../game-card';

interface IForGameField {
  fieldSize: number,
}
function shuffleArray(arr:any[]) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

const GameField: React.FC<IForGameField> = ({
  fieldSize // размер поля
}) => {
  const gameCards = [];
  for (let i = 0; i < (fieldSize / 2); i++) {
    const card = {
      id: i + 1,
      name: cards[i].name,
      url: cards[i].url,
      coverUrl: cover,
    };
    gameCards.push(card);
    gameCards.push(card);
  };
  const currentCards = shuffleArray(gameCards);

  return(
    <main className="app-main">
        <div className="game-field">
          
          {currentCards.map((card, i) => {
            return (
              // <GameCard />
              <img src={card.url} id={i.toString()} className={card.name} alt="cover" />
            )
          })}

        </div>
    </main>
  )
};

export default GameField;