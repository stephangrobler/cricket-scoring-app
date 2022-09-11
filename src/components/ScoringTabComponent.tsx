import { useState } from "react";
import { getCurrentInnings, getCurrentMatch, getCurrentOver, persistInnings, persistMatch, persistOver } from "../api/matchData";
import { Innings, Match, Over } from "../interfaces/Match";
import BattersAndBowler from "./BattersAndBowler";
import ExtrasComponent from "./ExtrasComponent";
import FairDelivery from "./FairDelivery";
import WicketComponent from "./WicketComponent";

export interface PropsForScoring {
    match: Match, setMatch: any, innings: Innings, setInnings: any
};

const ScoringTabComponent = ({ match, setMatch, innings, setInnings }: PropsForScoring) => {

    const FIRST_BATSMAN = 1;
    const SECOND_BATSMAN = 2;

    const overData = getCurrentOver();

    const getCurrentBatsman = () => {
        const currentBatsman = localStorage.getItem('currentBatsmen');
        if (!currentBatsman) {
            return { batsman1: '', batsman2: '', facinc: 1 };
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

    const [over, setOver] = useState(overData);
    const [bowler, setBowler] = useState(currentBowler);
    const [batsman1, setBatsman1] = useState(batsmen.batsman1);
    const [batsman2, setBatsman2] = useState(batsmen.batsman2);
    const [batsman, setBatsman] = useState('');
    const [facing, setFacing] = useState(batsmen.facing ? batsmen.facing : FIRST_BATSMAN);
    const [multiplier, setMultiplier] = useState(1);
    const [extra, setExtra] = useState('');
    const [error, setError] = useState('');
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
    // @ts-ignore
    const handleBall = (runs, ballType = 'FAIR') => {
        if (!bowler || !batsman1 || !batsman2 || !facing) {
            setError('No bowler or batsman set. Please ensure both is set correctly.');
            return;
        }

        const batsman = facing === FIRST_BATSMAN ? batsman1 : batsman2;

        ballType = extra !== '' ? extra : ballType;

        const newBall = { ...ballTemplate, ball: ballType, bowler, batsman, multiplier };
        switch (ballType) {
            case 'FAIR':
                newBall.score = runs * multiplier;
                newBall.batsmanScore = newBall.score;
                newBall.bowlerScore = newBall.score;
                newBall.symbol = `${runs}`;
                break;
            case 'WIDE':
                newBall.extras = 1 + runs;
                newBall.batsmanScore = 0;
                newBall.bowlerScore = newBall.extras;
                newBall.symbol = `${runs}WD`;
                break;
            case 'NOBALL':
                newBall.extras = 1 + runs;
                newBall.batsmanScore = 0;
                newBall.bowlerScore = newBall.extras;
                newBall.symbol = `${runs}NB`;
                break;
            // should this be here?? byes should be extra, does it count against the bowler though?
            case 'BYE':
                newBall.extras = 0 + runs;
                newBall.symbol = `${runs}B`;
                break;
            case 'LEGBYE':
                newBall.extras = 0 + runs;
                newBall.symbol = `${runs}LB`;
                break;
            case 'CAUGHT':
            case 'BOWLED':
            case 'RUNOUT':
            case 'STUMPED':
                newBall.score = 0;
                newBall.wicket = ballType;
                newBall.symbol = `W`;
                break;
        }

        const balls = [...over.balls, newBall];
        setOver({ ...over, balls });
        persistOver({ ...over, balls });

        if (runs % 2 !== 0) {
            setFacing(facing === FIRST_BATSMAN ? SECOND_BATSMAN : FIRST_BATSMAN);
        }

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

    // @ts-ignore
    const handleFacing = (facingBatsman) => {
        setBatsman(facingBatsman === 1 ? batsman1 : batsman2);
        setFacing(facingBatsman);
    };

    const getBatsmenScore = (batsman: string) => {
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

        const overScore = over.balls.reduce((overAcc, currBall) => {
            return overAcc += currBall.score + currBall.extras;
        }, 0);
        return score + overScore;
    };

    const getWicketCount = (): number => {
        const inningWickets = innings.overs.reduce((acc, cur) => {
            // @ts-ignore
            return (acc += cur.balls.reduce((ballAcc, ballCur) => {
                return ballAcc += ballCur.wicket !== '' ? 1 : 0;
            }, 0));
        }, 0);
        const overWickets = over.balls.reduce((ballAcc, ballCur) => {
            return ballAcc += ballCur.wicket !== '' ? 1 : 0;
        }, 0);

        return inningWickets + overWickets;
    }

    const swapBatsman = () => {
        const swapped = facing !== FIRST_BATSMAN ? FIRST_BATSMAN : SECOND_BATSMAN;
        setFacing(swapped);
    }

    return <div className="scoring-tab p-1">

        <BattersAndBowler
            bowler={bowler}
            setBowler={setBowler}
            batsman1={batsman1}
            setBatsman1={setBatsman1}
            handleFacing={handleFacing}
            batsman2={batsman2}
            setBatsman2={setBatsman2}
            facing={facing}
            setBatsman={setBatsman}
        />

        <div className="border border-base-300 rounded-box p-2 mb-2">
            {displayScore()}-{getWicketCount()} | {innings.overs.length} overs
        </div>

        <div className="border border-base-300 rounded-box p-2 mb-2">

            <ul>
                <li>{batsman1} - {getBatsmenScore(batsman1)} {facing === 1 ? <span>*</span> : null} </li>
                <li>{batsman2} - {getBatsmenScore(batsman2)} {facing === 2 ? <span>*</span> : null}</li>
            </ul>
        </div>

        <div className="border border-base-300 rounded-box p-2 mb-2">

            <div>Over:</div>
            <div className='overflow-x-auto'>
                <ul className={'steps'}>
                    {over.balls.map((ball, ballIndex) => (
                        <li key={ballIndex} className='step'>{ball.symbol}</li>
                    ))}
                </ul>
            </div>
        </div>
        {error !== '' && <div className="alert alert-error shadow-lg m-2" onClick={() => setError('')}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Error! {error}</span>
            </div>
        </div>}

        <button className="btn btn-primary btn-sm" onClick={() => swapBatsman()}>Swap Batsman</button>

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
        </footer>
    </div>;
}

export default ScoringTabComponent;