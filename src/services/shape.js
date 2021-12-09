import { SHAPES, MAX_WEIGHT } from '@/constants';
import { getRandomNumber, getRandomColor } from '@/utils';
import store from '@/store';

class Shape {
  constructor(side) {
    this.side = side;
    this.type = SHAPES[getRandomNumber(0, SHAPES.length - 1)];
    this.weight = getRandomNumber(1, MAX_WEIGHT);
    this.top = 0;
    this.isFell = false;
    this.id = store.state.generationId;
    this.color = getRandomColor();
    if (side === 'left') {
      this.left = getRandomNumber(0, 40);
    } else {
      this.left = getRandomNumber(50, 90);
    }
    store.commit('incrementGenerationId');
  }
}

export default Shape;
