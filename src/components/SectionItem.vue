<template>
  <div class="section-item" :style="style">
    <!-- 表紙となるアイテム -->
    <div class="cover" v-if="isFirst">
      <h1>World Heritage</h1>
      <p>Explore the world.</p>
    </div>

    <!-- 通常のアイテム -->
    <div class="caption" v-else>
      <h2>{{title}}</h2>
      <p>{{description}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'section-item',
    props: [
      'name',
      'title',
      'description',
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
    color: #fff;
  }

  .cover {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 50px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .4) 10%, rgba(0, 0, 0, 1));
    text-align: center;
  }

  .cover h1,
  .cover p {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .cover h1 {
    font-size: 8rem;
  }

  .cover p {
    font-size: 3rem;
  }

  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 30px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .4) 15%, rgba(0, 0, 0, 1));
  }

  .caption h2,
  .caption p {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .caption h2 {
    font-size: 2rem;
  }

  .caption p {
    font-size: 1.5rem;
  }

  img {
    width: 100%;
    height: auto;
  }
</style>
