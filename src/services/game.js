import store from '@/store';
import { MAX_BENDING } from '@/constants';
import Shape from './shape';

const getFullWeightRight = () => store.getters.fellRightShapes.reduce((acc, shape) => {
  const position = shape.left - 45;
  return acc + shape.weight * (position / 15);
}, 0);

const checkMaxBending = () => Math.abs(store.state.angle) >= MAX_BENDING;

const getFullWeightLeft = () => store.getters.fellLeftShapes.reduce((acc, shape) => {
  const position = 45 - shape.left;
  return acc + shape.weight * (position / 15);
}, 0);

const setAngleCoefficient = () => {
  const fullWeightRight = getFullWeightRight();
  const fullWeightLeft = getFullWeightLeft();
  const difference = fullWeightRight - fullWeightLeft;
  const angleCoefficient = difference / 500;

  if (Math.abs(difference) >= 20) {
    store.commit('setGameOver');
  }

  store.commit('setNewAngleCoefficient', angleCoefficient);
};

const checkTouch = (id) => {
  const shapeElement = document.getElementById(`shape-${id}`);
  if (!shapeElement) {
    return false;
  }
  const lineBounds = document.getElementById('play-zone__line').getBoundingClientRect();
  const shapeBounds = shapeElement.getBoundingClientRect();
  const shape = store.state.shapes[id];

  const totterCathet = lineBounds.bottom - lineBounds.top;
  const similarCathet = (shape.left * totterCathet) / 100;

  const shapeBottomLimit = store.state.angle >= 0
    ? lineBounds.top + similarCathet
    : lineBounds.bottom - similarCathet;

  if (shapeBounds.bottom >= shapeBottomLimit) {
    return true;
  }
  return false;
};

const shapeFall = (shape) => {
  if (!store.state.isPaused && shape) {
    store.commit('shapeFall', shape.id);
  }
};

const tick = () => {
  if (store.state.gameOver) {
    restartGame();
  }
  const { currentLeftShape, currentRightShape } = store.getters;

  shapeFall(currentLeftShape);
  shapeFall(currentRightShape);

  if (checkTouch(currentLeftShape?.id)) {
    store.commit('setShapeFall', currentLeftShape.id);
    setAngleCoefficient();
  }
  if (checkTouch(currentRightShape?.id)) {
    store.commit('setShapeFall', currentRightShape.id);
    setAngleCoefficient();
  }
  if (!store.state.isPaused) {
    store.commit('calculateNewAngle');
  }
  if (checkMaxBending()) {
    store.commit('setGameOver');
  }
  if (store.state.isRunning) {
    if (store.getters.roundEnded) {
      startRound();
    } else {
      setTimeout(tick, store.state.speed);
    }
  }
};

const startRound = () => {
  const leftShape = new Shape('left');
  const rightShape = new Shape('right');
  store.commit('addShape', leftShape);
  store.commit('addShape', rightShape);
  store.commit('updateSpeed');
  tick();
};

export const startGame = () => {
  store.commit('playGame');
  startRound();
};

export const restartGame = () => {
  store.commit('resetState');
};

const moveLeft = () => {
  if (!store.getters.isGameInProgress) {
    return;
  }
  const activeShape = store.getters.currentLeftShape;
  if (activeShape?.left > 0) {
    store.commit('moveLeft', activeShape.id);
  }
};

const moveRight = () => {
  if (!store.getters.isGameInProgress) {
    return;
  }
  const activeShape = store.getters.currentLeftShape;
  if (activeShape?.left < 40) {
    store.commit('moveRight', activeShape.id);
  }
};

export const handleKeyDown = (e) => {
  switch (e.keyCode) {
    case 37:
      moveLeft();
      break;
    case 39:
      moveRight();
      break;
    default:
      break;
  }
};
