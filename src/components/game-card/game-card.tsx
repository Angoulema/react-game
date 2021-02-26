import React, { useEffect } from 'react';
import "./game-card.scss";
import { IGameCard } from './../../constants/interfaces';

const GameCard: React.FC<IGameCard> = ( props: IGameCard ) => {
  const { picURL, id, coverURL, counter, updateCounter, position } = props;

  
    
      const CardClickHandler = () => {
      updateCounter(counter + 1);
      console.log('click');
      };
   
    
  

  return(
    <div className="game-field-card flipped" key={position} onClick={CardClickHandler}>
      <div className="inner">
        <div className="front">
          <img src={picURL} id={id} className={`front-card-img`} alt="cover" />
        </div>
        <div className="back">
          <img src={coverURL} alt="cover" />
        </div>
      </div>
    </div>
  )
};

export default GameCard;