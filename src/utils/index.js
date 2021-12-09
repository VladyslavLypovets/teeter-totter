export const getRandomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;

export const getRandomColor = () => {
  const maxValue = 150;
  const r = getRandomNumber(0, maxValue);
  const g = getRandomNumber(0, maxValue);
  const b = getRandomNumber(0, maxValue);
  return `rgb(${r}, ${g}, ${b})`;
};
