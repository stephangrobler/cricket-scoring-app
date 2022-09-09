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
import MatchComponent from './components/MatchComponent';
import ScoringTabComponent from './components/ScoringTabComponent';
import ScoreCardTabComponent from './components/ScoreCardTabComponent';

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
  

  const [match, setMatch] = useState(matchData);
  const [innings, setInnings] = useState(inningData);

  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [activeTab, setActiveTab] = useState('Scoring'); 

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
        const matchData = { ...match, innings: { ...match.innings, [innings.id]: innings } };
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

  return (
    <div className="container mx-auto">
      <div className="tabs tabs-boxed">
        <a className={activeTab === 'MatchSettings' ? "tab tab-active": "tab"} onClick={() => setActiveTab('MatchSettings')}>Match Settings</a> 
        <a className={activeTab === 'Scoring' ? "tab tab-active": "tab"} onClick={() => setActiveTab('Scoring')}>Scoring</a> 
        <a className={activeTab === 'ScoreCard' ? "tab tab-active": "tab"} onClick={() => setActiveTab('ScoreCard')}>Score Cards</a>
      </div>
      
      {activeTab === 'MatchSettings' &&
          <MatchComponent
            team1={team1}
            team2={team2}
            setTeam1={setTeam1}
            setTeam2={setTeam2}
            handleEndInnings={handleEndInnings}
            handleEndMatch={handleEndMatch}
          />
      }
      {activeTab === 'Scoring' &&
        <ScoringTabComponent
          match={match}
          setMatch={setMatch}
          innings={innings}
          setInnings={setInnings}
        />
      }

      {activeTab === 'ScoreCard' && 
        <ScoreCardTabComponent />      
      }      
    </div>
  );
}

export default App;
