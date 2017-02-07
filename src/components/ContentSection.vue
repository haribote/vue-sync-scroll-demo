<template>
  <div class="section" :style="style">
  </div>
</template>

<script>
  export default {
    name: 'content-section',
    props: [
      'name',
      'title',
      'description',
      'isCurrent',
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
<style>
  .section {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background-position: 50% 50%;
    background-size: cover;
    color: #fff;
  }

  .section:first-of-type {
    position: fixed;
    top: 0;
    left: 0;
  }

  .section:nth-of-type(2) {
    margin-top: 100vh;
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

  .effect-fade-enter-active,
  .effect-fade-leave-active {
    transition-property: opacity, transform;
    transition-delay: 100ms;
    transition-duration: 400ms;
    transition-timing-function: ease;
  }

  .effect-fade-enter,
  .effect-fade-leave-to {
    opacity: 0;
    transform: translate3d(0, 33%, 0);
  }

  .effect-fade-leave,
  .effect-fade-enter-to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .section img {
    width: 100%;
    height: auto;
  }
</style>
