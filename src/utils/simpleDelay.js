const delay = (second) => {
  const millisecond = second * 1000;
  return new Promise((resolve) => setTimeout(resolve, millisecond));
};
export default delay;
