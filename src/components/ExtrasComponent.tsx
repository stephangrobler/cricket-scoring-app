import * as React from 'react';

// @ts-ignore
const ExtrasComponent = ({ extra, setExtra, handleBall }) => {
  // @ts-ignore
  const getClass = (extraType) => {
    let classes = 'btn btn-primary m-1';
    return extraType === extra ? `${classes} btn-accent` : classes;    
  };

  return (
    <div className="mb-2">
      <h2>Extras</h2>
      <div className="mb-2">
        <button
          className={getClass('WIDE')}
          onClick={() => {
            setExtra('WIDE');
          }}
        >
          WIDE
        </button>
        <button
          className={getClass('NOBALL')}
          onClick={() => {
            setExtra('NOBALL');
          }}
        >
          NO BALL
        </button>
        <button
          className={getClass('BYE')}
          onClick={() => {
            setExtra('BYE');
          }}
        >
          BYE
        </button>
        <button
          className={getClass('LEGBYE')}
          onClick={() => {
            setExtra('LEGBYE');
          }}
        >
          LEG BYE
        </button>
      </div>
      <div className={extra !== '' ? 'select-runs' : undefined}>
        <button
          className="btn btn-secondary m-1"
          onClick={() => {
            handleBall(extra, 0);
          }}
        >
          0
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => {
            handleBall(extra, 1);
          }}
        >
          1
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => {
            handleBall(extra, 2);
          }}
        >
          2
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => {
            handleBall(extra, 3);
          }}
        >
          3
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => {
            handleBall(extra, 4);
          }}
        >
          4
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => {
            handleBall(extra, 5);
          }}
        >
          5
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => {
            handleBall(extra, 6);
          }}
        >
          6
        </button>
      </div>
    </div>
  );
};

export default ExtrasComponent;
