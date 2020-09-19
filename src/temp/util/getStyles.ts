const getStyles = (el: HTMLElement): CSSStyleDeclaration => {
  const styls = window.getComputedStyle(el);
  return {
    backgroundColor: styls.backgroundColor,
  } as CSSStyleDeclaration;
};

export default getStyles;
