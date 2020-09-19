const getRect = (ele: HTMLElement): DOMRect => {
  return ele.getBoundingClientRect();
};

export default getRect;
