const getH = (prevRect, nextRect) => {
  const nextHeight = nextRect.height === 0 ? 0.001 : nextRect.height;
  return prevRect.height / nextHeight;
};

export default getH;
