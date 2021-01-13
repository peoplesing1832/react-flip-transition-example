import React, { useState } from 'react';
import './App.css';
import {
  Transition
} from 'react-flip-transition';

function App() {
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);

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
          leave: 400,
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
    </div>
  );
}

export default App;
