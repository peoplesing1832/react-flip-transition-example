import React, {
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import {
  TransitionFLIP,
  TransitionFLIPS,
} from 'react-flip-transition'

const TodoList = () => {

  const [list, setList] = useState([
    {
      id: uuid(),
      name: '西尔莎罗南'
    },
    {
      id: uuid(),
      name: '艾玛沃森'
    },
    {
      id: uuid(),
      name: '娜塔丽波特曼'
    }
  ]);


  return (
    <div>
      <TransitionFLIPS>
        {
          list && list.map((li) => {
            return (
              <TransitionFLIP flipId={li.id} key={li.id}>
                <div>{ li.name }</div>
              </TransitionFLIP>
            )
          })
        }
      </TransitionFLIPS>
    </div>
  )
}

export default TodoList;
