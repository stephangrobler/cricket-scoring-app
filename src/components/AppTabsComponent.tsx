import {  useState } from 'react';

import { getCurrentInnings, getCurrentMatch, persistInnings, persistMatch } from '../api/matchData';
import { useAuth } from '../contexts/AuthProvider';
import MatchComponent from './MatchComponent';
import ScoreCardTabComponent from './ScoreCardTabComponent';
import ScoringTabComponent from './ScoringTabComponent';

const AppTabsComponent = () => {
    

    const matchData = getCurrentMatch();
    const inningData = getCurrentInnings(matchData.id);

    const [match, setMatch] = useState(matchData);
    const [innings, setInnings] = useState(inningData);

    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [activeTab, setActiveTab] = useState('Scoring');

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
        <div className="container mx-auto h-screen">            
            <div className="tabs tabs-boxed">
                <div
                    className={activeTab === 'MatchSettings' ? 'tab tab-active flex-1' : 'tab flex-1'}
                    onClick={() => setActiveTab('MatchSettings')}>
                    Match Settings
                </div>
                <div
                    className={activeTab === 'Scoring' ? 'tab tab-active flex-1' : 'tab flex-1'}
                    onClick={() => setActiveTab('Scoring')}>
                    Scoring
                </div>
                <div
                    className={activeTab === 'ScoreCard' ? 'tab tab-active flex-1' : 'tab flex-1'}
                    onClick={() => setActiveTab('ScoreCard')}>
                    Score Cards
                </div>
            </div>

            {activeTab === 'MatchSettings' && (
                <MatchComponent
                    team1={team1}
                    team2={team2}
                    setTeam1={setTeam1}
                    setTeam2={setTeam2}
                    handleEndInnings={handleEndInnings}
                    handleEndMatch={handleEndMatch}
                />
            )}
            {activeTab === 'Scoring' && (
                <ScoringTabComponent match={match} setMatch={setMatch} innings={innings} setInnings={setInnings} />
            )}

            {activeTab === 'ScoreCard' && <ScoreCardTabComponent />}
        </div>
    );
};

export default AppTabsComponent;
