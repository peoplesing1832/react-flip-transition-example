import React, {
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import {
  TransitionFLIP,
  TransitionFLIPS,
} from 'react-flip-transition'
import './index.css';
import {
  shuffle
} from 'lodash';

const TodoList = () => {

  const [list, setList] = useState([
    {
      id: uuid(),
      name: '1. 西尔莎罗南'
    },
    {
      id: uuid(),
      name: '2. 艾玛沃森'
    },
    {
      id: uuid(),
      name: '3. 娜塔丽波特曼'
    },
    {
      id: uuid(),
      name: '4. 艾伦佩吉'
    },
    {
      id: uuid(),
      name: '5. 詹妮弗康纳利'
    },
    {
      id: uuid(),
      name: '6. 朱迪福斯特'
    }
  ]);


  return (
    <div className="list-container">
      <button
        className="list-button"
        onClick={() => {
          const str = window.prompt('添加一个你喜欢的明星')
          if (str) {
            setList(prev => [...prev, {
              name: str,
              id: uuid(),
            }])
          }
        }}
      >添加</button>
      <button
        className="list-button"
        onClick={() => {
          setList((prev) => [...shuffle(prev)]);
        }}
      >乱序</button>
      <TransitionFLIPS
        wrapClassName="list"
        duration={600}
        transitionStyles={{
          leave: {
            opacity: 0
          },
          leaveing: {
            opacity: 0,
            transform: `translateX(50px)`,
          },
          enter: {
            opacity: 1,
          },
          entering: {
            opacity: 1,
          }
        }}
      >
        {
          list && list.map((li) => {
            return (
              <TransitionFLIP
                flipId={li.id}
                key={li.id}>
                <div className="list-item">
                  <span>{ li.name }</span>
                  <span onClick={() => {
                    setList((prev) => {
                      return [...prev.filter(item => item.id !== li.id)]
                    })
                  }}>删除</span>
                </div>
              </TransitionFLIP>
            )
          })
        }
      </TransitionFLIPS>
    </div>
  )
}

export default TodoList;
