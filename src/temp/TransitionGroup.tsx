import * as React from 'react';
import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  TransitionProps,
} from './Transition';
import {
  isUnd,
} from './util/checkType';

// TODO: 需要完善类型
interface TransitionGroup {
  animation?: boolean; // 是否开启动画
  interval?: number; // group间隔的时间
}

export type TransitionPropsAndID = TransitionProps & {
  ID: string;
}
type TransitionContextPropsKey = Exclude<keyof TransitionPropsAndID, 'delay' | 'animation'>;
type TransitionContextProps = Omit<TransitionPropsAndID, TransitionContextPropsKey>;

export const TransitionContext = React.createContext({
  animations: {} as {
    [key: string]: TransitionContextProps;
  },
  register: (props: TransitionPropsAndID): void => {},
});

const TransitionGroup: React.FC<TransitionGroup> = (props) => {

  const {
    animation = false,
    interval = 100,
    children,
  } = props;

  const [animations, setAnimations] = useState({});
  const animationsRef = useRef<Map<string, TransitionPropsAndID>>(new Map());
  const register = useCallback((props: TransitionPropsAndID) => {
    const { ID } = props;
    if (!isUnd(ID)) {
      animationsRef.current.set(ID, props)
    }
  }, []);

  useEffect(() => {
    let counter = 0;
    const transition = [...animationsRef.current.values()] || [];
    const animationsTemp: {
      [key: string]: TransitionContextProps;
    } = {};
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
