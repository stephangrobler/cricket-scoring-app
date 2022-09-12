
// @ts-ignore
const FairDelivery = ({ multiplier, setMultiplier, handleBall }) => {
  // @ts-ignore
  const getClass = (currentMultiplier) => {
    const classes = "btn btn-secondary m-1";
    return multiplier === currentMultiplier ? `${classes} btn-accent` : classes;
  }

  return <div className="mb-2">
    <h4>Fair</h4>
    <div>
      <button
        className={getClass(1)}
        onClick={() => setMultiplier(1)}
      >
        x1
      </button>
      <button
        className={getClass(2)}
        onClick={() => setMultiplier(2)}
      >
        x2
      </button>
    </div>
    <div>
      <button
        className="btn btn-primary btn-sm m-1"
        onClick={() => {
          handleBall(0);
        }}
      >
        DOT
      </button>
      <button
        className="btn btn-primary btn-sm m-1"
        onClick={() => {
          handleBall(1);
        }}
      >
        1
      </button>
      <button
        className="btn btn-primary btn-sm m-1"
        onClick={() => {
          handleBall(2);
        }}
      >
        2
      </button>
      <button
        className="btn btn-primary btn-sm m-1"
        onClick={() => {
          handleBall(3);
        }}
      >
        3
      </button>
      <button
        className="btn btn-primary btn-sm m-1"
        onClick={() => {
          handleBall(4);
        }}
      >
        4
      </button>
      <button
        className="btn btn-primary btn-sm m-1"
        onClick={() => {
          handleBall(5);
        }}
      >
        5
      </button>
      <button
        className="btn btn-primary btn-sm m-1"
        onClick={() => {
          handleBall(6);
        }}
      >
        6
      </button>
    </div>
  </div>
}

export default FairDelivery;