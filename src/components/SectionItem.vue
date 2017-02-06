<template>
  <div class="section-item" :style="style">
  </div>
</template>

<script>
  export default {
    name: 'section-item',
    props: [
      'name',
    ],
    computed: {
      backgroundImageUrl() {
        return `/static/img/${this.name}.jpg`;
      },
      style() {
        return {
          backgroundImage: `url(${this.backgroundImageUrl})`,
        };
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .section-item {
    width: 100vw;
    height: 100vh;
    background-position: 50% 50%;
    background-size: cover;
  }

  img {
    width: 100%;
    height: auto;
  }
</style>
