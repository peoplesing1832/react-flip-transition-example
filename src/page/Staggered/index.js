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
      <h1 style={{
        marginBottom: 10,
      }}>随意点击一个元素，实现交错效果（目前开发之中，存在很多问题，暂不可用）</h1>
      <TransitionFLIPS
        interval={150}
        duration={500}
        staggerReverse={focus ? true : false}
      >
        {
          list && list.map((item) => {
            return (
              <TransitionFLIP flipId={item} key={item}>
                <div className={focus === item ? 'staggered-item-active staggered-item' : 'staggered-item'} onClick={() => {
                  setFocus(focus === item ? '' : item);
                }}></div>
              </TransitionFLIP>
            )
          })
        }
      </TransitionFLIPS>
    </div>
  )
}

export default Staggered;
