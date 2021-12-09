<template>
  <div class="toolbar">
    <button
      class="toolbar__btn toolbar__btn--play"
      @click="playBtnClick"
    >
      {{ playBtnText }}
    </button>
    <button
      class="toolbar__btn toolbar__btn--pause"
      @click="pauseBtnClick"
    >
      {{ pauseBtnText }}
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { startGame, restartGame, handleKeyDown } from '@/services/game';

export default {
  name: 'Toolbar',
  computed: {
    ...mapState(['isRunning', 'isPaused']),
    playBtnText() {
      return this.isRunning ? 'Restart' : 'Play';
    },
    pauseBtnText() {
      return this.isPaused ? 'Continue' : 'Pause';
    },
  },
  methods: {
    ...mapMutations(['playGame', 'togglePause']),
    playBtnClick() {
      if (this.isRunning) {
        restartGame();
      } else {
        startGame();
      }
    },
    pauseBtnClick() {
      if (this.isRunning) {
        this.togglePause();
      }
    },
  },
  created() {
    window.addEventListener('keydown', handleKeyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', handleKeyDown);
  },
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.toolbar {
  display: flex;
  justify-content: center;

  &__btn {
    padding: 5px 9px;
    border-radius: 8px;
    font-size: 16px;
    color: $white;
    margin-left: 12px;
    transition: all 0.3s;
    border: 2px solid $white;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &--play {
      background: $success;
      border-color: $success;

      &:hover,
      &:active {
        background: none;
        color: $success;
      }
    }

    &--pause {
      background: $primary;
      border-color: $primary;

      &:hover,
      &:active {
        background: none;
        color: $primary;
      }
    }
  }
}
</style>
