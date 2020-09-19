import React, {
  useState,
} from 'react';
import TransitionFLIP from '../../temp/TransitionFLIP'
import TransitionFLIPS from '../../temp/TransitionFLIPS'
import { v4 as uuid } from 'uuid';
import './index.css'

const Staggered = () => {

  const [focus, setFocus] = useState('');
  const [list] = useState([uuid(), uuid(), uuid(), uuid(), uuid(), uuid()])

  return (
    <div className="staggered-container">
      <TransitionFLIPS>
        {
          list && list.map((item) => {
            return (
              <TransitionFLIP flipId={item} key={item}>
                <div className={focus === item ? 'staggered-item-active staggered-item' : 'staggered-item'} onClick={() => {
                  setFocus(focus === item ? '' : item);
                }}>点击我</div>
              </TransitionFLIP>
            )
          })
        }
      </TransitionFLIPS>
    </div>
  )
}

export default Staggered;
