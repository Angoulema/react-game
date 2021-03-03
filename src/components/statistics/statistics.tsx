import React from 'react';
import {
  BrowserRouter as Router, useHistory,
} from 'react-router-dom';
import './statistics.scss';

interface IFor16 {
  statsFor16: IForStatObj[]
}
interface IFor20 {
  statsFor20: IForStatObj[]
}

interface IFor24 {
  statsFor24: IForStatObj[]
}

interface IForStatObj {
  name: string,
  steps: number,
}

const Statistics: React.FC = () => {
    let stats16 = localStorage.getItem('MFSEField16');
    let stats20 = localStorage.getItem('MFSEField20');
    let stats24 = localStorage.getItem('MFSEField24');
    const statsFor16: IForStatObj[] = !!stats16 ? JSON.parse(localStorage.getItem('MFSEField16') || '{}') : [];
    const statsFor20: IForStatObj[] = !!stats20 ? JSON.parse(localStorage.getItem('MFSEField20') || '{}') : [];
    const statsFor24: IForStatObj[] = !!stats24 ? JSON.parse(localStorage.getItem('MFSEField24') || '{}') : [];

  let history = useHistory();

  const redirect = (path: string = '/') => {
    history.push(path);
  };

  return(
    <main className="game-stats">
      <div className="stats-container">
        <div className="bnt-back">
          <button onClick={() => redirect()}>
            Back to game
          </button>
        </div>
        <div className="all-stats">
          <div className="all-stats-16 block">
            <div className="title font-main-title">
              Gameboard with 16 cards
            </div>
            {statsFor16.length === 0 ? (<p>No one played this gamefield size yet</p>): 
              <StatsFor16Field statsFor16={statsFor16} />            
            }          
          </div>
          <div className="all-stats-20 block">
            <div className="title font-main-title">
              Gameboard with 20 cards
            </div>
            {statsFor20.length === 0 ? (<p>No one played this gamefield size yet</p>): 
              <StatsFor20Field statsFor20={statsFor20}/>
            } 
          </div>
          <div className="all-stats-24 block">
            <div className="title font-main-title">
              Gameboard with 24 cards
            </div>
            {statsFor24.length === 0 ? (<p>No one played this gamefield size yet</p>) : 
              <StatsFor24Field statsFor24={statsFor24} />}
          </div> 
        </div>
      </div>
    </main>
  )
};

const StatsFor16Field: React.FC<IFor16> = (props: IFor16) => {
  const { statsFor16 } = props;
  console.log(statsFor16);
  if (statsFor16.length === 0) return null;
  
  return (
  <div className="all-stats-16-items items">
    {statsFor16.sort((a, b) => {
      if (a.steps < b.steps) return 1;
      if (a.steps < b.steps) return -1;
      return 0;
    })
      .slice(0, 10)
      .map((item, index) => {
      return (
        <div className="item" key={index}>
          {item.name}:&emsp;{item.steps} steps
        </div>
      )
    })}
  </div>
  )
};

const StatsFor20Field: React.FC<IFor20> = (props: IFor20) => {
  const { statsFor20 } = props;
  console.log(statsFor20);
  if (statsFor20.length === 0) return null;
  
  return (
  <div className="all-stats-20-items items">
    {statsFor20.sort((a, b) => {
      if (a.steps < b.steps) return 1;
      if (a.steps < b.steps) return -1;
      return 0;
    })
      .slice(0, 10)
      .map((item, index) => {
      return (
        <div className="item" key={index}>
          {item.name}:&emsp;{item.steps} steps
        </div>
      )
    })}
  </div>
  )
};

const StatsFor24Field: React.FC<IFor24> = (props: IFor24) => {
  const { statsFor24 } = props;
  console.log(statsFor24);
  if (statsFor24.length === 0) return null;
  
  return (
  <div className="all-stats-24-items items">
    {statsFor24.sort((a, b) => {
      if (a.steps < b.steps) return 1;
      if (a.steps < b.steps) return -1;
      return 0;
    })
      .slice(0, 10)
      .map((item, index) => {
      return (
        <div className="item" key={index}>
          {item.name}:&emsp;{item.steps} steps
        </div>
      )
    })}
  </div>
  )
};

export default Statistics;
