import * as React from 'react';

// @ts-ignore
const ExtrasComponent = ({ extra, setExtra, handleBall }) => {
  // @ts-ignore
  const getClass = (extraType) => {
    let classes = 'btn btn-primary btn-sm m-1';
    return extraType === extra ? `${classes} btn-accent` : classes;    
  };

  return (
    <div className="mb-2">
      <h2>Extras</h2>
      <div className="mb-2">
        <button
          className={getClass('FAIR')}
          onClick={() => {
            setExtra('FAIR');
          }}
        >
          FAIR
        </button>
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
    </div>
  );
};

export default ExtrasComponent;
