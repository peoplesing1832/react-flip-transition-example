const getY = (prevRect: DOMRect, nextRect: DOMRect) => {
  return prevRect.y - nextRect.y;
};

export default getY;
