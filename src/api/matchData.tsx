import { nanoid } from 'nanoid';
import { Over, Ball } from '../interfaces/Match';
// @ts-ignore
const createInnings = (matchId) => {
  const inningData = {
    id: nanoid(),
    fielding: '',
    batting: '',
    currentBatsman1: '',
    currentBatsman2: '',
    score: 0,
    wickets: 0,
    overs: [],
    runs: 0,
    extras: {
      noballs: 0,
      wides: 0,
      byes: 0,
      legbyes: 0,
    },
    bowlers: [
      {
        id: nanoid(),
        playerId: '',
        name: '',
        overs: 0,
        wickets: 0,
        runs: 0,
        extras: {
          noballs: 0,
          wides: 0,
        },
      },
    ],
    batsmen: [
      {
        playerId: '',
        name: '',
        runs: 0,
        fours: 0,
        sixes: 0,
        out: '',
      },
    ],
  };
  persistInnings(inningData);
  return inningData;
};

// @ts-ignore
const createOver = (inningsId) => {
  let over = {
    bowler: '',
    balls: []
  }

  return over;
}

// @ts-ignore
const persistOver = (over) => {
  localStorage.setItem(`currentOver`, JSON.stringify(over));
}

const getCurrentOver = () => {
  const storedOver = localStorage.getItem('currentOver');
  let over: Over;
  if (!storedOver) {
    over = createOver('tent');
  } else {
    over = JSON.parse(storedOver);
  }
  return over;
}

// @ts-ignore
const getCurrentInnings = (matchId) => {
  const storedInnings = localStorage.getItem('currentInnings');
  let innings;
  if (!storedInnings) {
    innings = createInnings(matchId);
  } else {
    innings = JSON.parse(storedInnings);
  }
  return innings;
}

// @ts-ignore
const persistInnings = (innings) => {
  localStorage.setItem('currentInnings', JSON.stringify(innings));
}


const createMatch = () => {
  const matchData = {
    id: nanoid(),
    vs: '',
    overs: 20,
    innings: [],
    teams: {
      red: {
        name: '',
        players: [
          {
            id: nanoid(),
            name: '',
            stats: {
              bowling: 0,
              batting: 0,
            },
          },
        ],
      },
      blue: {
        name: '',
        players: [
          {
            id: nanoid(),
            name: '',
            stats: {
              bowling: 0,
              batting: 0,
            },
          },
        ],
      },
    },
  };
  persistMatch(matchData);
  return matchData;
};

// @ts-ignore
const persistMatch = (match) => {
  localStorage.setItem(`currentMatch`, match.id);
  localStorage.setItem(match.id, JSON.stringify(match));
};

const getCurrentMatch = () => {
  let match;
  const currentMatchId = localStorage.getItem('currentMatch');
  if (!currentMatchId) {
    match = createMatch();
  } else {
    // @ts-ignore
    match = JSON.parse(localStorage.getItem(currentMatchId));
  }
  return match;
};

export { getCurrentMatch, createInnings, persistMatch, persistOver, getCurrentOver, persistInnings, getCurrentInnings };
