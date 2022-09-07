import * as React from 'react';

// @ts-ignore
const WicketComponent = ({ handleBall }) => {
 return<div>
 <h4>Wicket</h4>
 <button
   className="btn btn-primary m-1"
   onClick={() => {
     handleBall('CAUGHT', 0);
   }}
 >
   Caught
 </button>
 <button
   className="btn btn-primary m-1"
   onClick={() => {
     handleBall('BOWLED', 0);
   }}
 >
   Bowled
 </button>
 <button
   className="btn btn-primary m-1"
   onClick={() => {
     handleBall('RUNOUT', 0);
   }}
 >
   Run out
 </button>
 <button
   className="btn btn-primary m-1"
   onClick={() => {
     handleBall('STUMPED', 0);
   }}
 >
   Stumped
 </button>
</div> 
}

export default WicketComponent;