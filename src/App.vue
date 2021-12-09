<template>
  <div
    id="app"
    class="container"
  >
    <Toolbar />
    <PlayZone />
  </div>
</template>

<script>
import PlayZone from '@/components/PlayZone.vue';
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'App',
  components: {
    PlayZone,
    Toolbar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap");

body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
* {
  box-sizing: border-box;
}
.container {
  width: 90%;
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  padding: 50px 0 120px;
}
</style>
