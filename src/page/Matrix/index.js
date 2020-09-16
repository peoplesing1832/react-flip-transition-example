import React, {
  useState,
  useEffect,
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
    for (let i = 0; i < 99; i++) {
      arr.push(i);
    }
    return arr;
  });

  useEffect(() => {
    setInterval(() => {
      setMatrix((prev) => [...shuffle(prev)]);
    }, 2000);
  }, []);

  return (
    <>
      <div className="matrix-container">
        <TransitionFLIPS
          wrapClassName="matrix"
          duration={800}
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
