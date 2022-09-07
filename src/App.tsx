import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getCurrentInnings, getCurrentMatch, getCurrentOver, persistInnings, persistMatch, persistOver } from './api/matchData';
import BattersAndBowler from './components/BattersAndBowler';
import FairDelivery from './components/FairDelivery';
import ExtrasComponent from './components/ExtrasComponent';
import WicketComponent from './components/WicketComponent';
import { Over } from './interfaces/Match';
import { Supabase } from './api/supabase';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


function App() {
  const matchData = getCurrentMatch();
  const inningData = getCurrentInnings(matchData.id);
  const overData = getCurrentOver();

  const getCurrentBatsman = () => {
    const currentBatsman = localStorage.getItem('currentBatsmen');
    if (!currentBatsman) {
      return {batsman1: '', batsman2: '', facinc: 1};
    } else {
      return JSON.parse(currentBatsman);
    }
  }
 
  const getCurrentBowler = () => {
    const currentBowler = localStorage.getItem('currentBowler');
    if (!currentBowler) {
      return '';
    } else {
      return JSON.parse(currentBowler);
    }
  }

  const batsmen = getCurrentBatsman();
  const currentBowler = getCurrentBowler();

  const [match, setMatch] = useState(matchData);
  const [innings, setInnings] = useState(inningData);
  const [over, setOver] = useState(overData);
  const [bowler, setBowler] = useState(currentBowler);
  const [batsman1, setBatsman1] = useState(batsmen.batsman1);
  const [batsman2, setBatsman2] = useState(batsmen.batsman2);
  const [batsman, setBatsman] = useState('');
  const [facing, setFacing] = useState(batsmen.facing);
  const [multiplier, setMultiplier] = useState(1);
  const [extra, setExtra] = useState('');

  const ballTemplate = {
    bowler: '',
    batsman: '',
    ball: '',
    wicket: '',
    score: 0,
    extras: 0,
    bowlerScore: 0,
    batsmanScore: 0,
    symbol: '',
    multiplier: 1,
  };

  useEffect(() => {
    const base = new Supabase();
    const fetchPlayers = async () => {
      try {
        const players = await base.getPlayers();
        
        console.log(players);
      } catch (err) {

      }
    }

    (async () => await fetchPlayers())();
  }, []);
  
  // @ts-ignore
  const handleBall = (ball, extraScore) => {
    const newBall = { ...ballTemplate, ball, bowler, batsman, multiplier };
    switch (ball) {
      case 'DOT':
        newBall.score = 0;
        break;
      case '1':
        newBall.score = 1 * multiplier;
        newBall.batsmanScore = newBall.score;
        newBall.bowlerScore = newBall.score;
        break;
      case '2':
        newBall.score = 2 * multiplier;
        newBall.batsmanScore = newBall.score;
        newBall.bowlerScore = newBall.score;
        break;
      case '3':
        newBall.score = 3 * multiplier;
        newBall.batsmanScore = newBall.score;
        newBall.bowlerScore = newBall.score;
        break;
      case 'FOUR':
        newBall.score = 4 * multiplier;
        newBall.batsmanScore = newBall.score;
        newBall.bowlerScore = newBall.score;
        break;
      case '5':
        newBall.score = 5 * multiplier;
        newBall.batsmanScore = newBall.score;
        newBall.bowlerScore = newBall.score;
        break;
      case 'SIX':
        newBall.score = 6 * multiplier;
        newBall.batsmanScore = newBall.score;
        newBall.bowlerScore = newBall.score;
        break;
      case 'WIDE':
        newBall.extras = 1 + extraScore;
        newBall.batsmanScore = 0;
        newBall.bowlerScore = newBall.score;
        break;
      case 'NOBALL':
        newBall.extras = 1 + extraScore;
        newBall.batsmanScore = 0;
        newBall.bowlerScore = newBall.score;
        break;
      // should this be here?? byes should be extra, does it count against the bowler though?
      case 'BYE':
        newBall.extras = 0 + extraScore;
        break;
      case 'LEGBYE':
        newBall.extras = 0 + extraScore;
        break;
      case 'CAUGHT':
        newBall.score = 0;
        newBall.wicket = 'CAUGHT';
        break;
      case 'BOWLED':
        newBall.score = 0;
        newBall.wicket = 'CAUGHT';
        break;
      case 'RUNOUT':
        newBall.score = 0;
        newBall.wicket = 'RUNOUT';
        break;
      case 'STUMPED':
        newBall.score = 0;
        newBall.wicket = 'STUMPED';
        break;
    }

    const balls = [...over.balls, newBall];
    setOver({ ...over, balls });
    persistOver({ ...over, balls });

    setExtra('');
    setMultiplier(1);
  };

  const handleEndOver = () => {
    const inningData = { ...innings, overs: [...innings.overs, over] };
    

    setInnings(inningData);
    persistInnings(inningData);

    setOver({ bowler: '', balls: [] });
    persistOver({ bowler: '', balls: [] });

    persistMatch(match);
  };

  const handleEndMatch = () => {
    handleEndInnings();

    localStorage.removeItem('currentMatch');
    localStorage.removeItem('currentInnings');
    
    const newMatch = getCurrentMatch();
    const newInnings = getCurrentInnings(newMatch.id);
    setMatch(newMatch);
    setInnings(newInnings);
  };

  const handleEndInnings = () => {
    const matchData = {...match, innings: {...match.innings, [innings.id]: innings}};
    setMatch(matchData);
    persistMatch(matchData);
    localStorage.removeItem('currentInnings');
    localStorage.removeItem('currentOver');
    localStorage.removeItem('currentBowler');
    localStorage.removeItem('currentBatsmen');

    const inningData = getCurrentInnings(match.id);
    persistInnings(inningData);
    setInnings(inningData);
  };

  // @ts-ignore
  const handleFacing = (facingBatsman) => {
    setBatsman(facingBatsman === 1 ? batsman1 : batsman2);
    setFacing(facingBatsman);
  };

  // @ts-ignore
  const getBatsmenScore = (batsman) => {
    // @ts-ignore
    const score = innings.overs.reduce((acc, cur) => {
      // @ts-ignore
      return (acc += cur.balls.reduce((overAcc, overCur) => {
        if (overCur.batsman === batsman) {
          overAcc += overCur.batsmanScore;
        }
        return overAcc;
      }, 0));
    }, 0);
    return score;
  };

  const displayScore = (): number => {
    // @ts-ignore
    const score = innings.overs.reduce((acc, cur) => {
      // @ts-ignore
      return (acc += cur.balls.reduce((overAcc, overCur) => {
        return (overAcc += overCur.score + overCur.extras);
      }, 0));
    }, 0);
    return score;
  };

  const getWicketCount = (): number => {
    return innings.overs.reduce((acc, cur) => {
      // @ts-ignore
      return (acc += cur.balls.reduce((ballAcc, ballCur) => {
        return ballAcc += ballCur.wicket !== '' ? 1 : 0;
      }, 0));
    }, 0);
    
  }

  return (
    <div className="container m-auto px-1">
      <header className="my-2">
        <button className="btn btn-primary m-1" onClick={handleEndMatch}>
          New Match
        </button>
        <button className="btn btn-primary m-1" onClick={handleEndInnings}>
          New Innings
        </button>

      </header>
      <BattersAndBowler
        bowler={bowler}
        setBowler={setBowler}
        batsman1={batsman1}
        setBatsman1={setBatsman1}
        handleFacing={handleFacing}
        batsman2={batsman2}
        setBatsman2={setBatsman2}
        facing={facing}
      />
      <div>Over:</div>
      <div className='overflow-x-auto'>
        <ul className={'steps'}>          
          {over.balls.map((ball, ballIndex) => (
            <li key={ballIndex} className='step'>{ball.ball}</li>
          ))}
        </ul>
      </div>
      <FairDelivery
        multiplier={multiplier}
        setMultiplier={setMultiplier}
        handleBall={handleBall}
      />
      <ExtrasComponent
        extra={extra}
        setExtra={setExtra}
        handleBall={handleBall}
      />
      <WicketComponent handleBall={handleBall} />
      <footer className="mt-5">
        <button className="btn btn-error m-1" onClick={handleEndOver}>
          End Over
        </button>
        <button className="btn btn-error m-1" onClick={handleEndOver}>
          End Innings
        </button>
        <button className="btn btn-error m-1" onClick={handleEndOver}>
          End Match
        </button>
      </footer>

      <div>
        <div>
          Scoresheet: {displayScore()} for {getWicketCount()} after {innings.overs.length} overs
        </div>
        <ul>
          <li>{batsman1} - {getBatsmenScore(batsman1)}</li>
          <li>{batsman2} - {getBatsmenScore(batsman2)}</li>
        </ul>
        
      </div>
    </div>
  );
}

export default App;
