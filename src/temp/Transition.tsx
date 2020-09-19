import * as React from 'react';
import {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import noop from '../util/noop';
import {
  isObj,
  isNum,
  isUnd,
  isFunc,
} from '../util/checkType';
import { TransitionContext } from './TransitionGroup';
import { TransitionQueueContext } from './TransitionQueue';
import { v4 as uuid } from 'uuid';

const defaultDuration = 200;
const defaultDelay = 0;

interface TransitionDuration {
  enter: number;
  leave: number;
}

interface TransitionDisplay {
  enter: React.CSSProperties;
  leave: React.CSSProperties;
}

export interface TransitionStyles {
  enter?: React.CSSProperties;
  entering?: React.CSSProperties;
  leave?: React.CSSProperties;
  leaveing?: React.CSSProperties;
}

export interface TransitionProps {
  display?: boolean | TransitionDisplay;
  duration?: number | TransitionDuration; // 动画持续时间
  delay?: number; // 动画开启前的延迟时间
  animation?: boolean; // 动画的开关
  children: React.ReactElement;
  unmount?: boolean; // 是否在离开后销毁DOM
  enter?: boolean; // 开启 LEAVE -> ENTERING -> ENTER 关闭 LEAVE -> ENTER
  leave?: boolean; // 开启 ENTER -> LEAVEING -> LEAVE 关闭 ENTER -> LEAVE
  appear?: boolean; // 首次加载时 开启 LEAVE -> ENTERING -> ENTER 关闭 LEAVE -> ENTER
  timingFunction?: (string & {}) | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "ease" | "ease-in" | "ease-in-out" | "ease-out" | "step-end" | "step-start" | "linear"; // 动画函数
  transitionStyles?: TransitionStyles; // 过渡的样式
  onLeave?: () => void;
  onEnter?: () => void;
}

export enum STATUS {
  UNMOUNTED = 'unmounted', // 卸载
  ENTER = 'enter', // 已经进入
  ENTERING = 'entering', // 进入时
  LEAVE = 'leave', // 已经离开
  LEAVEING = 'leaveing', // 离开时
}

// TODO: 需要完善类型
const Transition: React.FC<TransitionProps> = (props) => {
  const {
    display = false,
    timingFunction = 'ease-in-out',
    duration: _duration = defaultDuration,
    delay: _delay = defaultDelay,
    unmount = false,
    animation: _animation = false,
    enter = true,
    leave = true,
    appear = true,
    children,
    transitionStyles = {
      entering: { opacity: 1 },
      enter: { opacity: 1 },
      leaveing: { opacity: 0 },
      leave: { opacity: 0 },
    },
    onLeave = noop,
    onEnter = noop,
  } = props;

  const { register, animations } = useContext(TransitionContext);
  const { _initStatus } = useContext(TransitionQueueContext);
  const [animation, setAnimation] = useState(_animation);
  const firstMount = useRef(true);
  const nextStatus = useRef<null | STATUS>(null);
  const prevStatus = useRef<null | STATUS>(null);
  const timer = useRef(0);
  const ID = useRef(uuid());
  const [status, setStatus] = useState<STATUS>(() => {
    let initStatus!: STATUS;
    if (_initStatus) {
      return _initStatus;
    }
    if (animation) {
      if (appear) {
        initStatus = STATUS['LEAVE'];
        nextStatus.current = STATUS['ENTERING'];
      } else {
        initStatus = STATUS['ENTER'];
      }
    } else {
      if (unmount) {
        initStatus = STATUS['UNMOUNTED'];
      } else {
        initStatus = STATUS['LEAVE'];
      }
    }
    return initStatus;
  });
  const [duration] = useState<TransitionDuration>(() => {
    let enter: number = defaultDuration;
    let leave: number = defaultDuration;
    if (isObj(_duration)) {
      enter = isNum(_duration.enter) ? _duration.enter : defaultDuration;
      leave = isNum(_duration.leave) ? _duration.leave : defaultDuration;
    }
    if (isNum(_duration)) {
      enter = leave = _duration;
    }
    return {
      enter,
      leave,
    };
  });
  const [delay, setDelay] = useState<number>(_delay);
  const [displayStyles, setDisplayStyles] = useState<React.CSSProperties>({});

  const handleTransitionTime = (
    time: number,
    callback: Function,
  ) => {
    let timer = 0;
    callback = isFunc(callback) ? callback : noop;
    if (isNum(time)) {
      timer = setTimeout(callback, time);
    } else {
      timer = setTimeout(callback, 0);
    }
    return timer;
  }

  const handleEnter = () => {
    // 不需要执行入场动画
    if (!enter) {
      setStatus(STATUS['ENTER']);
    } else {
      // 入场动画开始时，需要先将其设置为display: block
      if (isObj(display) && display.enter) {
        setDisplayStyles({
          ...display.enter,
        });
      }
      if (
        prevStatus.current === STATUS['UNMOUNTED']
      ) {
        // 如果之前的状态为UNMOUNTED，或者之前的style为display：none 需要等待dom渲染完毕
        handleTransitionTime(16, () => {
          setStatus(STATUS['ENTERING']);
          prevStatus.current = null;
        });
      } else {
        if (isObj(display) && display.enter) {
          handleTransitionTime(16, () => {
            setStatus(STATUS['ENTERING']);
          });
        } else {
          setStatus(STATUS['ENTERING']);
        }
      }
    }
  };

  const handleLeave = () => {
    // 不需要执行出场动画
    if (!leave) {
      setStatus(STATUS['LEAVE']);
    } else {
      setStatus(STATUS['LEAVEING']);
    }
  };

  const updateStatus = (
    nextStatus: STATUS | null,
  ): void => {
    if (nextStatus) {
      if (nextStatus === STATUS['ENTERING']) {
        handleEnter();
      } else {
        handleLeave();
      }
    } else {
      // 如果已经是LEAVE状态了，并且unmount设置为true，更新状态为UNMOUNTED
      if (unmount && status === STATUS['LEAVE']) {
        setStatus(STATUS['UNMOUNTED']);
      }
    }
  };

  useEffect(() => {
    register({ ...props, ID: ID.current });
    updateStatus(nextStatus.current);
  }, []);

  useEffect(() => {
    switch (status) {
      case STATUS['ENTERING']:
        let milliseconds = 0;
        if (!unmount) {
          milliseconds = duration.enter + delay;
        } else {
          milliseconds = duration.enter;
        }
        milliseconds = duration.enter + delay;
        timer.current = handleTransitionTime(milliseconds, () => {
          setStatus(STATUS['ENTER']);
        });
        break;
      case STATUS['LEAVEING']:
        timer.current = handleTransitionTime(duration.leave + delay, () => {
          setStatus(STATUS['LEAVE']);
        });
        break;
      case STATUS['LEAVE']:
        if (!animation && !firstMount.current) {
          // 第一次不触发onLeave的钩子
          onLeave();
        }
        if (isObj(display) && display.leave) {
          setDisplayStyles({
            ...display.leave,
          });
        }
        break;
      case STATUS['ENTER']:
        if (animation) {
          onEnter();
        }
        break;
    }
    return () => {
      clearTimeout(timer.current);
    }
  }, [status]);

  useEffect(() => {
    if (animation) {
      // 为了在UNMOUNTED时开启动画效果，需要先将状态设置为LEAVE
      if (status === STATUS['UNMOUNTED']) {
        handleTransitionTime(delay, () => {
          prevStatus.current = STATUS['UNMOUNTED'];
          setStatus(STATUS['LEAVE']);
        });
      }
    }
  }, [animation, status]);

  useEffect(() => {
    if (!firstMount.current) {
      let nextStatus = null;
      if (animation) {
        if (
          status !== STATUS['ENTERING'] &&
          status !== STATUS['ENTER'] &&
          (
            status === STATUS['LEAVE'] ||
            status === STATUS['LEAVEING']
          )
        ) {
          nextStatus = STATUS['ENTERING'];
        }
      } else {
        if (
          status === STATUS['ENTERING'] ||
          status === STATUS['ENTER']
        ) {
          nextStatus = STATUS['LEAVEING'];
        }
      }
      updateStatus(nextStatus);
    } else {
      firstMount.current = false;
    }
  }, [animation, status]);

  useEffect(() => {
    setAnimation(_animation);
  }, [_animation]);

  useEffect(() => {
    if (!isUnd(ID.current) && !isUnd(animations[ID.current])) {
      const {
        animation = false,
        delay = defaultDelay,
      } = animations[ID.current];
      setAnimation(animation);
      setDelay(delay);
    }
  }, [animations]);

  if (status === STATUS['UNMOUNTED']) {
    return null;
  }

  let statusStyles = transitionStyles[status] || {};
  const transitionStyle = {
    transition: `all ${animation ? duration.enter : duration.leave}ms ${timingFunction} ${delay}ms`,
  };
  const prevStyles = children?.props?.style || {};
  statusStyles = {
    ...prevStyles,
    ...statusStyles,
    ...transitionStyle,
  };
  if (status === STATUS['ENTER']) {
    if (statusStyles['transition']) {
      delete statusStyles['transition'];
    }
  }

  return React.cloneElement(React.Children.only(children), {
    style: {
      ...statusStyles,
      ...displayStyles,
    },
  })
};

export default Transition;
