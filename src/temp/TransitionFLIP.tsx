import * as React from 'react';
import {
  useRef,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import Transition, {
  TransitionStyles
} from './Transition';
import { FLIPSContext } from './TransitionFLIPS';
import getRect from './util/getReact';
import getX from './util/getX';
import getY from './util/getY';
import getW from './util/getW';
import getH from './util/getH';
import getParent from './util/getParent';
import getStyles from './util/getStyles';
import createAnimation from './util/createAnimation';

export interface TransitionFLIP {
  children: React.ReactElement;
  flipId: string | number;
  _onLeave?: () => void;
  _animation?: boolean;
  _transitionStyles?: TransitionStyles;
  _duration?: number;
  _index?: number;
  _total?: number;
  _reverse?: boolean;
  _interval?: number;
}

const TransitionFLIP: React.FC<TransitionFLIP> = (props) => {

  const {
    _onLeave: onLeave,
    _animation: animation,
    _transitionStyles: transitionStyles,
    _duration: duration,
    _index: index,
    _total: total,
    _reverse: reverse,
    _interval: interval,
    flipId,
    children,
  } = props;

  const {
    catchStyles,
    catchAnimations,
    animationOption,
  } = useContext(FLIPSContext);

  const selfRef = useRef<HTMLElement>(null);
  const firstMount = useRef<boolean>(true);
  const FLIPID = useRef(flipId);

  const force = () => {
    const flipEle = selfRef.current;
    const catchAnimation = catchAnimations.get(FLIPID.current);
    if (
      flipEle &&
      catchAnimation
    ) {
      if (
        catchAnimation.playState === 'running' &&
        (catchAnimation as any)._isPlayed
      ) {
        const parent = getParent(flipEle);
        const parentRect = getRect(parent);
        // 基于父级进行计算
        const rect = getRect(flipEle);
        const styles = getStyles(flipEle);
        rect.x = parentRect.x - rect.x;
        rect.y = parentRect.y - rect.y;
        catchStyles.set(FLIPID.current, {
          rect,
          styles,
        });
        (catchAnimation as any)._isPlayed = false;
        catchAnimation.finish();
      }
    }
  }

  force();

  useEffect(() => {
    const flipEle = selfRef.current;
    if (flipEle) {
      const parent = getParent(flipEle);
      const parentRect = getRect(parent);
      const rect = getRect(flipEle);
      const styles = getStyles(flipEle);
      // 基于父级元素的
      rect.x = parentRect.x - rect.x;
      rect.y = parentRect.y - rect.y;
      catchStyles.set(FLIPID.current, {
        rect,
        styles,
      });
    }
  }, [catchStyles]);

  useLayoutEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else {
      const flipEle = selfRef.current;
      if (flipEle) {
        const catchRect = catchStyles.get(FLIPID.current);
        const pbc = catchRect?.styles.backgroundColor;
        const parent = getParent(flipEle);
        const parentRect = getRect(parent);
        const nextRect = getRect(flipEle);
        const styles = getStyles(flipEle);
        const cbc = styles.backgroundColor;
        // 基于父级元素的
        nextRect.x = parentRect.x - nextRect.x;
        nextRect.y = parentRect.y - nextRect.y;
        const x = getX(nextRect, catchRect?.rect as DOMRect);
        const y = getY(nextRect, catchRect?.rect as DOMRect);
        const w = getW(catchRect?.rect as DOMRect, nextRect);
        const h = getH(catchRect?.rect as DOMRect, nextRect);
        // 更新缓存
        catchStyles.set(FLIPID.current, {
          rect: nextRect,
          styles,
        });
        if (x === 0 && y === 0 && w === 1 && h === 1 && pbc === cbc) {
          return;
        }
        let staggerDelay = 0;
        // 正序，倒序计算不一样
        if (reverse) {
          staggerDelay = ((total as number) - (index as number + 1)) * (interval as number);
        } else {
          staggerDelay = (index as number) * (interval as number);
        }
        const animationKeyframes: Keyframe[] = [
          {
            transform: `translate(${x}px, ${y}px) scale(${w}, ${h})`,
            backgroundColor: pbc,
          },
          {
            transform: `translate(0, 0) scale(1, 1)`,
            backgroundColor: cbc,
          },
        ];
        let prevTransformStyle = window.getComputedStyle(flipEle).transform;
        flipEle.style.transform = animationKeyframes[0].transform as string;
        const animationOptions: KeyframeAnimationOptions = animationOption;
        animationOptions.delay = staggerDelay;
        const animation = createAnimation(flipEle, animationKeyframes, animationOptions);
        catchAnimations.set(FLIPID.current, animation);
        animation.onfinish = () => {
          flipEle.style.transform = prevTransformStyle;
        };
        animation.play();
        // _isPlayed 标示符，解决多次force的问题
        (animation as any)._isPlayed = true;
      }
    }
  });

  const child =  React.cloneElement(React.Children.only(children), {
    ref: selfRef
  });

  return (
    <Transition
      animation={animation}
      onLeave={onLeave}
      onEnter={() => {
        // 入场完成后强制更新一次缓存
        const flipEle = selfRef.current;
        if (flipEle) {
          const parent = getParent(flipEle);
          const parentRect = getRect(parent);
          const rect = getRect(flipEle);
          const styles = getStyles(flipEle);
          rect.x = parentRect.x - rect.x;
          rect.y = parentRect.y - rect.y;
          catchStyles.set(FLIPID.current, {
            rect,
            styles,
          });
        }
      }}
      duration={duration}
      transitionStyles={transitionStyles}
    >
      { child }
    </Transition>
  );
};

export default TransitionFLIP;
