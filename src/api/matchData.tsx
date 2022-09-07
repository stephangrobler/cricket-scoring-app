import { nanoid } from 'nanoid';
import { Over, Ball, Match, Innings } from '../interfaces/Match';
// @ts-ignore
const createInnings = (matchId) => {
  const inningData: Innings = {
    id: nanoid(),
    score: 0,
    wickets: 0,
    overs: [],
    runs: 0,
    extras: {
      noballs: 0,
      wides: 0,
      byes: 0,
      legbyes: 0,
    }
  };
  persistInnings(inningData);
  return inningData;
};

const createOver = () => {
  let over: Over = {
    bowler: '',
    balls: []
  };
  return over;
}


const persistOver = (over: Over) => {
  localStorage.setItem(`currentOver`, JSON.stringify(over));
}

const getCurrentOver = (): Over => {
  const storedOver = localStorage.getItem('currentOver');
  let over: Over;
  if (!storedOver) {
    over = createOver();
  } else {
    over = JSON.parse(storedOver);
  }
  return over;
}

// @ts-ignore
const getCurrentInnings = (matchId): Innings => {
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
  const matchData: Match = {
    id: nanoid(),
    vs: '',
    overs: 20,
    innings: {}    
  };
  persistMatch(matchData);
  return matchData;
};

// @ts-ignore
const persistMatch = (match) => {
  localStorage.setItem(`currentMatch`, match.id);
  localStorage.setItem(match.id, JSON.stringify(match));
};

const getCurrentMatch = ():Match => {
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
