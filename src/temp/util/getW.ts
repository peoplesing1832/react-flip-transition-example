const getW = (prevRect: DOMRect, nextRect: DOMRect) => {
  const nextWidth = nextRect.width === 0 ? 0.001 : nextRect.width;
  return prevRect.width / nextWidth;
};

export default getW;
