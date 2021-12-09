import Vue from 'vue';
import Vuex from 'vuex';
import { MAX_SPEED, MIN_SPEED } from '@/constants';

Vue.use(Vuex);

const getDefaultState = () => ({
  droppedLeft: [],
  droppedRight: [],
  angle: 0,
  angleCoefficient: 0,
  shapes: [],
  gameOver: false,

  isRunning: false,
  isPaused: false,
  speed: MAX_SPEED,
  generationId: 0,
});

export default new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    playGame(state) {
      state.isRunning = true;
    },
    togglePause(state) {
      state.isPaused = !state.isPaused;
    },
    updateSpeed(state) {
      if (state.speed > MIN_SPEED) {
        state.speed -= 0.25;
      }
    },
    addShape(state, shape) {
      state.shapes.push(shape);
    },
    shapeFall(state, id) {
      state.shapes = state.shapes.map((shape) => ({
        ...shape,
        top: shape.id === id ? shape.top + 1 : shape.top,
      }));
    },
    setShapeFall(state, id) {
      state.shapes = state.shapes.map((shape) => ({
        ...shape,
        isFell: shape.id === id ? true : shape.isFell,
      }));
    },
    incrementGenerationId(state) {
      state.generationId += 1;
    },
    moveLeft(state, id) {
      state.shapes = state.shapes.map((shape) => ({
        ...shape,
        left: shape.id === id ? shape.left - 1 : shape.left,
      }));
    },
    moveRight(state, id) {
      state.shapes = state.shapes.map((shape) => ({
        ...shape,
        left: shape.id === id ? shape.left + 1 : shape.left,
      }));
    },
    setNewAngleCoefficient(state, value) {
      state.angleCoefficient = value;
    },
    calculateNewAngle(state) {
      state.angle += state.angleCoefficient;
    },
    setGameOver(state) {
      state.gameOver = true;
    },
  },
  getters: {
    currentLeftShape(state) {
      return state.shapes.find((shape) => shape.side === 'left' && !shape.isFell);
    },
    currentRightShape(state) {
      return state.shapes.find((shape) => shape.side === 'right' && !shape.isFell);
    },
    fellShapes(state) {
      return state.shapes.filter((shape) => shape.isFell);
    },
    fellLeftShapes(state, getters) {
      return getters.fellShapes.filter((shape) => shape.side === 'left');
    },
    fellRightShapes(state, getters) {
      return getters.fellShapes.filter((shape) => shape.side === 'right');
    },
    roundEnded(state, getters) {
      return !getters.currentLeftShape && !getters.currentRightShape;
    },
    isGameInProgress(state) {
      return state.isRunning && !state.isPaused;
    },
  },
});
