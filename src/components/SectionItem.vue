<template>
  <div class="section-item" :style="style">
    <div class="cover" v-if="isFirst">
      <h1>World Heritage</h1>
      <p>Explore the world.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'section-item',
    props: [
      'name',
      'isFirst',
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
    position: relative;
    width: 100vw;
    height: 100vh;
    background-position: 50% 50%;
    background-size: cover;
  }

  .cover {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 50px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .4) 10%, rgba(0, 0, 0, 1));
    color: #fff;
    text-align: center;
  }

  .cover h1 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 8rem;
  }

  .cover p {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 3rem;
  }

  img {
    width: 100%;
    height: auto;
  }
</style>
