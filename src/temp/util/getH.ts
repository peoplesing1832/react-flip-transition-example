const getH = (prevRect: DOMRect, nextRect: DOMRect) => {
  const nextHeight = nextRect.height === 0 ? 0.001 : nextRect.height;
  return prevRect.height / nextHeight;
};

export default getH;
