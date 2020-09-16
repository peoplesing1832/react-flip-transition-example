import React, {
  useState,
} from 'react';
import {
  shuffle
} from 'lodash';
import {
  TransitionFLIP,
  TransitionFLIPS
} from 'react-flip-transition';
import './index.css';

const Matrix = () => {

  const [matrix, setMatrix] = useState(() => {
    let arr = [];
    for (let i = 0; i < 49; i++) {
      arr.push(i);
    }
    return arr;
  });

  return (
    <>
      <div className="matrix-container">
        <button onClick={() => {
          setMatrix((prev) => [...shuffle(prev)]);
        }}>乱序</button>
        <TransitionFLIPS
          wrapClassName="matrix"
          duration={600}
        >
          {
            matrix && matrix.map((m) => (
              <TransitionFLIP flipId={m} key={m}>
                <div className="matrix-item">{ m }</div>
              </TransitionFLIP>
            ))
          }
        </TransitionFLIPS>
      </div>
    </>

  )
}

export default Matrix;
