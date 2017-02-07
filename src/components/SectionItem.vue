<template>
  <content-section
    :name="name"
    :isApproached="isApproached"
  >
    <transition name="effect-caption">
      <div class="caption" v-if="isCurrent">
        <h2>{{title}}</h2>
        <p>{{description}}</p>
      </div>
    </transition>
  </content-section>

</template>

<script>
  import ContentSection from './ContentSection';

  export default {
    name: 'section-item',

    // プロパティ一覧
    props: [
      'name',
      'title',
      'description',
      'isApproached',
      'isCurrent',
    ],

    components: {
      ContentSection,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
