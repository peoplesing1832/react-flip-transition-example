import * as React from 'react';
import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  isUnd,
} from './util/checkType';

export const TransitionContext = React.createContext({
  animations: {},
  register: (props) => {},
});

const TransitionGroup = (props) => {

  const {
    animation = false,
    interval = 100,
    children,
  } = props;

  const [animations, setAnimations] = useState({});
  const animationsRef = useRef(new Map());
  const register = useCallback((props) => {
    const { ID } = props;
    if (!isUnd(ID)) {
      animationsRef.current.set(ID, props)
    }
  }, []);

  useEffect(() => {
    let counter = 0;
    const transition = [...animationsRef.current.values()] || [];
    const animationsTemp = {};
    (animation ? transition : [...transition.reverse()]).forEach((t) => {
      const { ID } = t;
      if (!isUnd(ID)) {
        animationsTemp[ID] = {
          delay: counter * interval,
          animation,
        };
        counter += 1;
      }
    });
    setAnimations(animationsTemp);
  }, [animation]);

  return (
    <TransitionContext.Provider value={{
      animations,
      register,
    }}>
      { children }
    </TransitionContext.Provider>
  )
}

export default TransitionGroup;
