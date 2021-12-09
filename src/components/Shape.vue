<template>
  <div
    v-if="shape"
    :id="`shape-${shape.id}`"
    class="shape"
    :class="`shape--${shape.type} ${shape.isFell ? 'shape--fell' : ''}`"
    :style="style"
  >
    <span class="shape-text">
      {{ shape.weight }}
    </span>
  </div>
</template>

<script>
import { BASE_SHAPE_SIZE } from '@/constants';

export default {
  name: 'Shape',
  props: {
    shape: Object || undefined,
  },
  computed: {
    style() {
      return {
        top: `${this.shape.isFell ? 'unset' : `${this.shape.top}px`}`,
        bottom: `${this.shape.isFell ? '0' : 'unset'}`,
        left: `${this.shape.left}%`,
        background: this.shape.color,
        width: `${BASE_SHAPE_SIZE * this.scale}px`,
        height: `${BASE_SHAPE_SIZE * this.scale}px`,
      };
    },
    scale() {
      return 0.05 * this.shape.weight + 0.5;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
.shape {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  &-text {
    color: $white;
    font-size: 24px;
  }

  &--triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    align-items: flex-end;
    padding-bottom: 10px;
  }

  &--circle {
    border-radius: 100%;
  }
}
</style>
