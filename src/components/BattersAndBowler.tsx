import * as React from 'react';

// @ts-ignore
const BattersAndBowler = ({  bowler,  setBowler,  batsman1,  setBatsman1,  facing,  handleFacing,  batsman2,  setBatsman2,}) => {
  const FIRST_BATSMAN = 1;
  const SECOND_BATSMAN = 2;
// @ts-ignore
  const handleBatsmanChange = (batsman, number) => {
    if (number === FIRST_BATSMAN) {
      setBatsman1(batsman);
    } else {
      setBatsman2(batsman);
    }
  };
// @ts-ignore
  const getClass = (facingBatsman) => {
    let classes = 'btn btn-primary';
    return facing === facingBatsman ? `${classes} btn-accent` : classes;
  };

  return (
    <div className="my-2">
      <div className="form-control">
        <label className="label" htmlFor="">
          Bowler
        </label>
        <input
          type="text"
          placeholder="bowler"
          className="input input-bordered w-full max-w-xs"
          value={bowler}
          onChange={(e) => setBowler(e.target.value)}
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
  );
};

export default BattersAndBowler;
