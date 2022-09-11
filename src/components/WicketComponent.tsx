import * as React from 'react';

// @ts-ignore
const WicketComponent = ({ handleBall }) => {
  return <div>
    <h4>Wicket</h4>
    <button
      className="btn btn-primary btn-sm m-1"
      onClick={() => {
        handleBall(0, 'CAUGHT');
      }}
    >
      Caught
    </button>
    <button
      className="btn btn-primary btn-sm m-1"
      onClick={() => {
        handleBall(0, 'BOWLED');
      }}
    >
      Bowled
    </button>
    <button
      className="btn btn-primary btn-sm m-1"
      onClick={() => {
        handleBall(0, 'RUNOUT');
      }}
    >
      Run out
    </button>
    <button
      className="btn btn-primary btn-sm m-1"
      onClick={() => {
        handleBall(0, 'STUMPED');
      }}
    >
      Stumped
    </button>
  </div>
}

export default WicketComponent;