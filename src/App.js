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
  const [state2, setState2] = useState(true);
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
        <p>We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty, and the pursuit of Happiness. That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed.That whenever any form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness. Prudence, indeed, will dictate that Governments long established should not be changed for light and transient causes; and accordingly all experience has shown, that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed. But when a long train of abuses and usurpations, pursuing invariably the same Object, evinces a design to reduce them under absolute Despotism, it is their right, it is their duty, to throw off such Government, and to provide new Guards for their future security.</p>
      </Transition>
      <h3 className="doc-title">多个元素过渡</h3>
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
                <li className="flip1-list-item">{ item }</li>
              </Flip>
            );
          })
        }
      </Flips>
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
                <div className="observer-list-item">{ item }</div>
              </Flip>
            )
          })
        }
      </Flips>
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
                <div className="matrix-item">{ item }</div>
              </Flip>
            )
          })
        }
      </Flips>
    </div>
  );
}

export default App;
