import React, {
  useState,
  useRef,
} from 'react';
import './App.css';
import {
  Transition,
  Observer,
  Transitions,
} from 'react-flip-transition';

function App() {
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const nextNum = useRef(10);

  const randomIndex = () => {
    return Math.floor(Math.random() * list.length);
  };

  return (
    <div className="App">
      <h3 className="doc-title">最简单的过渡</h3>
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
      <button
        onClick={() => setState2(!state2)}
        className="doc-button"
      >
        toggle
      </button>
      <Transition
        name="bounce"
        animation={state2}
        duration={500}
        unmount
      >
        <div>At this point I have a request for our fans. If any of you in any way hate homosexuals, people of a different color, or women, please do this one favor for us─leave us the fuck alone! Don't come to our shows, and don't buy our records.</div>
      </Transition>
      <h3 className="doc-title">多个元素过渡</h3>
      <button
        onClick={() => setState3(!state3)}
        className="doc-button"
      >
        toggle
      </button>
      <Transitions
        animation={true}
        prefix="fade"
      >
        <Transition>
          <div>1</div>
        </Transition>
        <Transition>
          <div>2</div>
        </Transition>
        <Transition>
          <div>3</div>
        </Transition>
        <Transition>
          <div>4</div>
        </Transition>
        <Transition>
          <div>5</div>
        </Transition>
        <Transition>
          <div>6</div>
        </Transition>
      </Transitions>
      <h3 className="doc-title">列表过渡</h3>
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
    </div>
  );
}

export default App;
