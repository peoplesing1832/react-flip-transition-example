const createAnimation = (
  ele,
  keyframes,
  options
) => {
  const effect = new KeyframeEffect(ele, keyframes, options);
  return new Animation(effect, document.timeline);
};

export default createAnimation;
