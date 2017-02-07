<template>
  <div class="section" :style="style">
    <div class="cover">
      <h1>World Heritage</h1>
      <p>Explore the world.</p>
    </div>
  </div>
</template>

<script>
  import ContentSection from './ContentSection';

  export default {
    name: 'section-lead',
    extends: ContentSection,
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
