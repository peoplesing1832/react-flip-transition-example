const createAnimation = (
  ele: HTMLElement,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
): Animation => {
  const effect = new KeyframeEffect(ele, keyframes, options);
  return new Animation(effect, document.timeline);
};

export default createAnimation;
