export interface Match {
  id: string;
  vs: string;
  overs: number;
  innings: {
    [id: string]: Innings
  };
}

export interface Innings {
  id: string;
  overs: Over[];
  score: number;
  wickets: number;
  runs: number;
  extras: {
    noballs: number;
    wides: number;
    byes: number;
    legbyes: number;
  };
}

export interface Over {
  bowler: string;
  balls: Ball[];
}

export interface Ball {
  ball: string;
  wicket: string;
  score: number;
  extras: number;
  bowler: string;
  batsman: string;
  batsmanScore: number;
  bowlerScore: number;
  symbol: string;
}

export interface Team { }

export interface Player { }
