import * as React from 'react';
import { useState } from 'react';

// @ts-ignore
const BattersAndBowler = ({ bowler, setBowler, batsman1, setBatsman1, setBatsman, facing, handleFacing, batsman2, setBatsman2, }) => {
  const FIRST_BATSMAN = 1;
  const SECOND_BATSMAN = 2;

  const handleBatsmanChange = (batsman: string, number: number) => {
    let store = { batsman1, batsman2, facing };
    if (number === FIRST_BATSMAN) {
      setBatsman1(batsman);
      store = { ...store, batsman1: batsman };
      if (facing === FIRST_BATSMAN) {
        setBatsman(batsman);
      }
    } else {
      setBatsman2(batsman);
      store = { ...store, batsman2: batsman };
      if (facing === SECOND_BATSMAN) {
        setBatsman(batsman);
      }
    }
    persistBatsmen(store);
  };

  const handleBowlerChange = (bowler: string) => {
    setBowler(bowler);
    localStorage.setItem('currentBowler', JSON.stringify(bowler));
  }

  const persistBatsmen = (store: { batsman1: string, batsman2: string, facing: number }) => {
    localStorage.setItem('currentBatsmen', JSON.stringify(store));
  }
  // @ts-ignore
  const getClass = (facingBatsman) => {
    let classes = 'btn btn-primary';
    return facing === facingBatsman ? `${classes} btn-accent` : classes;
  };

  return (
    <div>
      <div className="collapse collapse-arrow border border-base-300 rounded-box mb-2">
        <input type="checkbox" />
        <div className="collapse-title">
          Set Bowler and Batsman
        </div>
        <div className="collapse-content">
          <div className="form-control">
            <label className="label" htmlFor="">
              Bowler
            </label>
            <input
              type="text"
              placeholder="bowler"
              className="input input-bordered w-full max-w-xs"
              value={bowler}
              onChange={(e) => handleBowlerChange(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="">
              Batsman 1
            </label>
            <div className="input-group">
              <input
                type="text"
                placeholder="batsman1"
                value={batsman1}
                className="input input-bordered  w-full max-w-xs"
                onChange={(e) => handleBatsmanChange(e.target.value, FIRST_BATSMAN)}
              />
              <button
                className={getClass(FIRST_BATSMAN)}
                onClick={() => handleFacing(FIRST_BATSMAN)}
              >
                Facing
              </button>
            </div>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="">
              Batsman 2
            </label>
            <div className="input-group">
              <input
                type="text"
                placeholder="batsman2"
                value={batsman2}
                className="input input-bordered w-full max-w-xs mb-2"
                onChange={(e) =>
                  handleBatsmanChange(e.target.value, SECOND_BATSMAN)
                }
              />
              <button
                className={getClass(SECOND_BATSMAN)}
                onClick={() => handleFacing(SECOND_BATSMAN)}
              >
                Facing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattersAndBowler;
