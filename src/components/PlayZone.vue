<template>
  <div
    id="play-zone"
    class="play-zone"
  >
    <Shape :shape="currentLeftShape" />
    <Shape :shape="currentRightShape" />
    <div
      id="play-zone__line"
      class="play-zone__line"
      :style="rotate"
    >
      <Shape
        :shape="shape"
        v-for="shape in fellShapes"
        :key="shape.id"
      />
    </div>
    <div class="play-zone__base" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Shape from './Shape.vue';

export default {
  name: 'PlayZone',
  components: {
    Shape,
  },
  computed: {
    ...mapState(['angle']),
    ...mapGetters(['currentLeftShape', 'currentRightShape', 'fellShapes']),
    rotate() {
      return {
        transform: `rotate(${this.angle}deg)`,
      };
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.play-zone {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  &__line {
    position: relative;
    width: 100%;
    height: 0;
    border-bottom: 7px solid $danger;
  }

  &__base {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background-color: $secondary;
    width: 120px;
    height: 120px;
  }
}
</style>
