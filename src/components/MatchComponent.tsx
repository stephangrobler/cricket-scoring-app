
// @ts-ignore
const MatchComponent = ({team1, setTeam1, team2, setTeam2, handleEndMatch, handleEndInnings}) => {
    return <div className="p-2">
        <header className="my-2">
        <button className="btn btn-primary m-1" onClick={handleEndMatch}>
          New Match
        </button>
        <button className="btn btn-primary m-1" onClick={handleEndInnings}>
          New Innings
        </button>
      </header>

      <div>
        
        <h3>Match Info</h3>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Team 1:</span>              
          </label>
          <input type="text" placeholder="Team 1" className="input input-bordered w-full max-w-xs" value={team1} onChange={(e) => setTeam1(e.target.value)} />            
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Team 2:</span>              
          </label>
          <input type="text" placeholder="Team 2" className="input input-bordered w-full max-w-xs" value={team2}  onChange={(e) => setTeam2(e.target.value)}/>           
        </div>
        
      </div>

      <div className="border rounded-box p-2">
        <div className="form-control">

        <select className="select select-primary w-full max-w-xs">
          <option disabled selected>Which team is fielding?</option>
          <option>{team1}</option>
          <option>{team2}</option>          
        </select>
        </div>
        <div className="form-control">

        <select className="select select-primary w-full max-w-xs">
          <option disabled selected>Which team is batting?</option>
          <option>{team1}</option>
          <option>{team2}</option>  
        </select>
        </div>
      </div>
    </div>
}

export default MatchComponent;