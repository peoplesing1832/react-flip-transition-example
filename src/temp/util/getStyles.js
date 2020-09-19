const getStyles = (el) => {
  const styls = window.getComputedStyle(el);
  return {
    backgroundColor: styls.backgroundColor,
  };
};

export default getStyles;
