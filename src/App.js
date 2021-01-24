import React, {
  useState,
  useRef,
} from 'react';
import './App.css';
import {
  Transition,
  Observer,
  Transitions,
  Flip,
  Flips,
} from 'react-flip-transition';
import { shuffle } from 'lodash'

function App() {
  const [state, setState] = useState(true);
  const [state3, setState3] = useState(true);
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [list2, setList2] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [list3, setList3] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [list4, setList4] = useState(() => {
    const result = [];
    for (let i = 1; i <= 81; i++) {
      result.push(i);
    }
    return result;
  });
  const nextNum = useRef(10);

  const randomIndex = () => {
    return Math.floor(Math.random() * list.length);
  };

  const str1css =
`
.fade-leaveed {
  opacity: 0;
  transform: translateX(10px);
}
.fade-leaveing {
  opacity: 0;
  transform: translateX(50px);
  transition: all 600ms ease-in;
}
.fade-entering {
  opacity: 1;
  transition: all 200ms;
}
`;

  const str1js =
`
import { Transition } from 'react-flip-transition';

const [state, setState] = useState(true);

<button
  onClick={() => setState(!state)}
  className="doc-button"
>
  toggle
</button>

<Transition
  name="fade"
  animation={state}
  duration={{enter: 200, leave: 600, }}
>
  <div>hello world</div>
</Transition>
`
  const str2css =
`
.fade-leaveed {
  opacity: 0;
  transform: translateX(10px);
}
.fade-leaveing {
  opacity: 0;
  transform: translateX(50px);
  transition: all 600ms ease-in;
}
.fade-entering {
  opacity: 1;
  transition: all 200ms;
}
`;
  const str2js =
`
import { Transition, Transitions } from 'react-flip-transition'

const [state3, setState3] = useState(true);

<button
  onClick={() => setState3(!state3)}
  className="doc-button"
>
  toggle
</button>

<Transitions
  masterSwitch={state3}
  prefix="fade"
  interval={300}
>
  <ul>
    <Transition unmount>
      <li className="flip1-list-item">1</li>
    </Transition>
    <Transition unmount>
      <li className="flip1-list-item">2</li>
    </Transition>
    <Transition unmount>
      <li className="flip1-list-item">3</li>
    </Transition>
    <Transition unmount>
      <li className="flip1-list-item">4</li>
    </Transition>
    <Transition unmount>
      <li className="flip1-list-item">5</li>
    </Transition>
    <Transition unmount>
      <li className="flip1-list-item">6</li>
    </Transition>
  </ul>
</Transitions>
`;

  const str3css =
`
.observer-list {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.observer-list-item {
  margin-right: 10px;
}
.observer-leaveed {
  opacity: 0;
  transform: translateY(50px);
}
.observer-leaveing {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s;
}
.observer-entering {
  opacity: 1;
  transition: all 1s;
}
`;

  const str3js =
`
import { Transition, Observer } from 'react-flip-transition';

const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

<Observer
  wrapClass="observer-list"
  wrap="div"
>
  {
    list && list.map((item) => {
      return (
        <Transition
          key={item}
          name="observer"
          duration={1000}
        >
          <div className="observer-list-item">{ item }</div>
        </Transition>
      )
    })
  }
</Observer>
`;

  const str4css =
`
.flip1-list-item {
  padding: 6px 0;
}
.flip1-move {
  transition: all 1s;
}
`;

  const str4js =
`
import { Flip, Flips, } from 'react-flip-transition';

const [list2, setList2] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

<Flips
  name="flip1"
  wrap="ul"
>
  {
    list2 && list2.map((item) => {
      return (
        <Flip key={item}>
          <li className="flip1-list-item">{ item }</li>
        </Flip>
      );
    })
  }
</Flips>
`;

  const str5css =
`
.flip2-leaveed {
  opacity: 0;
  transform: translateY(50px);
}
.flip2-leaveing {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s;
}
.flip2-entering {
  opacity: 1;
  transition: all 1s;
}
.flip2-move {
  transition: all 1s;
}
`;

  const str5js =
`
import { Flip, Flips, } from 'react-flip-transition';

const [list3, setList3] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

<Flips
  wrapClass="observer-list"
  wrap="div"
  name="flip2"
  inOutDuration={1000}
>
  {
    list3 && list3.map((item) => {
      return (
        <Flip
          key={item}
        >
          <div className="observer-list-item">{ item }</div>
        </Flip>
      )
    })
  }
</Flips>
`;

  const str6css =
`
.matrix {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 234px;
  height: 234px;
}
.matrix-item {
  width: 26px;
  height: 26px;
  box-sizing: border-box;
  line-height: 24px;
  border: 1px solid #eee;
  text-align: center;
}
.matrix-move {
  transition: all 1s;
}
`;

  const str6js =
`
import { Flip, Flips, } from 'react-flip-transition';

const [list4, setList4] = useState(() => {
  const result = [];
  for (let i = 1; i <= 81; i++) {
    result.push(i);
  }
  return result;
});

<Flips
  wrapClass="matrix"
  wrap="div"
  name="matrix"
>
  {
    list4 && list4.map((item) => {
      return (
        <Flip
          key={item}
        >
          <div className="matrix-item">{ item }</div>
        </Flip>
      )
    })
  }
</Flips>
`;

  return (
    <div className="App">
      <h3 className="doc-title">最简单的过渡</h3>
      <code>{ str1css }</code>
      <code>{ str1js }</code>
      <button
        onClick={() => setState(!state)}
        className="doc-button"
      >
        toggle
      </button>
      <Transition
        name="fade"
        animation={state}
        duration={{
          enter: 200,
          leave: 600,
        }}
      >
        <div>hello world</div>
      </Transition>
      <h3 className="doc-title">多个元素过渡</h3>
      <code>{ str2css }</code>
      <code>{ str2js }</code>
      <button
        onClick={() => setState3(!state3)}
        className="doc-button"
      >
        toggle
      </button>
      <Transitions
        masterSwitch={state3}
        prefix="fade"
        interval={300}
      >
        <ul>
          <Transition unmount>
            <li className="flip1-list-item">1</li>
          </Transition>
          <Transition unmount>
            <li className="flip1-list-item">2</li>
          </Transition>
          <Transition unmount>
            <li className="flip1-list-item">3</li>
          </Transition>
          <Transition unmount>
            <li className="flip1-list-item">4</li>
          </Transition>
          <Transition unmount>
            <li className="flip1-list-item">5</li>
          </Transition>
          <Transition unmount>
            <li className="flip1-list-item">6</li>
          </Transition>
        </ul>
      </Transitions>
      <h3 className="doc-title">列表过渡</h3>
      <code>{ str3css }</code>
      <code>{ str3js }</code>
      <button
        className="doc-button"
        onClick={() => {
          list.splice(randomIndex(), 0, nextNum.current++)
          setList([...list]);
        }}
      >
        Add
      </button>
      <button
        className="doc-button"
        onClick={() => {
          list.splice(randomIndex(), 1);
          setList([...list]);
        }}
      >
        Remove
      </button>
      <Observer
        wrapClass="observer-list"
        wrap="div"
      >
        {
          list && list.map((item) => {
            return (
              <Transition
                key={item}
                name="observer"
                duration={1000}
              >
                <div className="observer-list-item">{ item }</div>
              </Transition>
            )
          })
        }
      </Observer>
      <h3 className="doc-title">排序过渡</h3>
      <code>{ str4css }</code>
      <code>{ str4js }</code>
      <button
        className="doc-button"
        onClick={() => {
          setList2(shuffle(list2));
        }}
      >
        Shuffle
      </button>
      <Flips
        name="flip1"
        wrap="ul"
      >
        {
          list2 && list2.map((item) => {
            return (
              <Flip key={item}>
                <li data-flip-id={item} className="flip1-list-item">{ item }</li>
              </Flip>
            );
          })
        }
      </Flips>
      <h3 className="doc-title">排序过渡和新增与删除</h3>
      <code>{ str5css }</code>
      <code>{ str5js }</code>
      <button
        className="doc-button"
        onClick={() => {
          setList3(shuffle(list3));
        }}
      >
        Shuffle
      </button>
      <button
        className="doc-button"
        onClick={() => {
          list3.splice(randomIndex(), 0, nextNum.current++)
          setList3([...list3]);
        }}
      >
        Add
      </button>
      <button
        className="doc-button"
        onClick={() => {
          list3.splice(randomIndex(), 1);
          setList3([...list3]);
        }}
      >
        Remove
      </button>
      <Flips
        wrapClass="observer-list"
        wrap="div"
        name="flip2"
        inOutDuration={1000}
      >
        {
          list3 && list3.map((item) => {
            return (
              <Flip
                key={item}
              >
                <div data-flip-id={item} className="observer-list-item">{ item }</div>
              </Flip>
            )
          })
        }
      </Flips>
      <h3 className="doc-title">排序过渡和多维表格</h3>
      <code>{ str6css }</code>
      <code>{ str6js }</code>
      <button
        className="doc-button"
        onClick={() => {
          setList4(shuffle(list4));
        }}
      >
        Shuffle
      </button>
      <Flips
        wrapClass="matrix"
        wrap="div"
        name="matrix"
      >
        {
          list4 && list4.map((item) => {
            return (
              <Flip
                key={item}
              >
                <div data-flip-id={item} className="matrix-item">{ item }</div>
              </Flip>
            )
          })
        }
      </Flips>
    </div>
  );
}

export default App;
