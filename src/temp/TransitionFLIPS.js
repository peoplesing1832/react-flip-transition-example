/* eslint-disable */
import * as React from 'react';
import {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  isFunc,
} from './util/checkType';

export const FLIPSContext = React.createContext({
  catchStyles: new Map(),
  catchAnimations: new Map(),
  animationOption: {},
});


const TransitionFLIPS = (props) => {

  const {
    delay = 0,
    duration = 200,
    inOutDuration = 200,
    easing = 'linear',
    fill = 'auto',
    wrap = 'div',
    wrapClassName = '',
    transitionStyles = {
      entering: { opacity: 1 },
      enter: { opacity: 1 },
      leaveing: { opacity: 0 },
      leave: { opacity: 0 },
    },
    children: _children,
    staggerReverse = true,
    interval = 150,
  } = props;

  const handleLeave = (key) => {
    setChildren((prevChildren) => {
      if (key in prevChildren) {
        delete prevChildren[key];
      }
      return { ...prevChildren };
    });
  };

  const mergeMap = (prev, next) => {
    prev = prev || {};
    next = next || {};
    function getValueForKey(key) {
      return key in next ? next[key] : prev[key];
    }
    let nextKeysPending = Object.create(null);
    let pendingKeys = [];
    for (let prevKey in prev) {
      if (prevKey in next) {
        if (pendingKeys.length) {
          nextKeysPending[prevKey] = pendingKeys;
          pendingKeys = [];
        }
      } else {
        pendingKeys.push(prevKey);
      }
    }
    let i;
    let childMapping = {};
    for (let nextKey in next) {
      if (nextKeysPending[nextKey]) {
        for (i = 0; i < nextKeysPending[nextKey].length; i++) {
          let pendingNextKey = nextKeysPending[nextKey][i];
          childMapping[pendingNextKey] = getValueForKey(
            pendingNextKey
          );
        }
      }
      childMapping[nextKey] = getValueForKey(nextKey);
    }
    for (i = 0; i < pendingKeys.length; i++) {
      childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
    }
    return childMapping;
  };

  const getMap = (
    children,
    callback
  ) => {
    const map = Object.create(null);
    if (children) {
      const childs = React.Children.map(children, c => c);
      const total = childs?.length;
      // 如果没有手动添加key, React.Children.map会自动添加key
      childs?.forEach((child, index) => {
        const key = (child).key || '';
        if (key) {
          if (React.isValidElement(child) && isFunc(callback)) {
            map[key] = callback(child, index, total);
          } else {
            map[key] = child;
          }
        }
      });
    }
    return map;
  };

  const initChildren = (
    children,
  ) => {
    return getMap(children, (child, index, total) => {
      return React.cloneElement(child, {
        _index: index,
        _total: total,
        _duration: inOutDuration,
        _transitionStyles: transitionStyles,
        _animation: true,
        _interval: interval,
        _reverse: staggerReverse,
        _onLeave: () => {
          const key = (child).key || '';
          handleLeave(key);
        },
      });
    });
  };

  const nextChildren = (
    nextChildren,
    prevChildrenMap,
  ) => {
    const nextChildrenMap = getMap(nextChildren);
    const children = mergeMap(prevChildrenMap, nextChildrenMap);
    const keys = Object.keys(children);
    const total = keys.length;
    keys.forEach((key, index) => {
      const child = children[key];
      if (!React.isValidElement(child)) {
        return;
      }
      const hasKeyByNew = nextChildrenMap[key] !== undefined;
      const hasKeyByPrev = prevChildrenMap[key] !== undefined;
      const isNew = hasKeyByNew && !hasKeyByPrev;
      const isDelete = !hasKeyByNew && hasKeyByPrev;
      const isNeverChange = hasKeyByNew && hasKeyByPrev;
      const prevProps = ((prevChildrenMap[key])?.props);
      if (isNew) {
        children[key] = React.cloneElement(child, {
          _transitionStyles: transitionStyles,
          _duration: inOutDuration,
          _animation: true,
          _index: index,
          _total: total,
          _interval: interval,
          _reverse: staggerReverse,
          _onLeave: () => {
            const key = (child).key || '';
            handleLeave(key);
          },
        });
      } else if (isDelete) {
        children[key] = React.cloneElement(child, {
          _index: index,
          _total: total,
          _interval: interval,
          _reverse: staggerReverse,
          _animation: false,
        });
      } else if (isNeverChange) {
        children[key] = React.cloneElement(child, {
          _animation: prevProps._animation,
          _duration: prevProps._duration,
          _index: index,
          _total: total,
          _interval: interval,
          _reverse: staggerReverse,
          _transitionStyles: prevProps._transitionStyles,
          _onLeave: () => {
            const key = (child).key || '';
            handleLeave(key);
          },
        });
      }
    });
    return children;
  };

  const firstMount = useRef(true);
  const [children, setChildren] = useState(() => {
    return initChildren(_children);
  });
  const catchStyles = useRef(new Map()).current;
  const catchAnimations = useRef(new Map()).current;
  const animationOption = {
    delay,
    duration,
    easing,
    fill,
  };

  useEffect(() => {
    if (!firstMount.current) {
      setChildren(nextChildren(_children, children));
    } else {
      firstMount.current = false;
    }
  }, [_children]);

  const childNode = Object.values(children);

  const wrapChildNode = React.createElement(wrap, {
    className: wrapClassName,
  }, childNode);

  return (
    <FLIPSContext.Provider value={{
      catchStyles,
      catchAnimations,
      animationOption,
    }}>
      { wrapChildNode }
    </FLIPSContext.Provider>
  );
}

export default TransitionFLIPS;
