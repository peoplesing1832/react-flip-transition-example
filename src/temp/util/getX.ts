const getX = (prevRect: DOMRect, nextRect: DOMRect) => {
  return prevRect.x - nextRect.x;
};

export default getX;
