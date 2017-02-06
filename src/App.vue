<template>
  <div id="app">
    <section-item v-for="item in itemsList" :name="item.name"></section-item>
  </div>
</template>

<script>
import SectionItem from './components/SectionItem';

export default {
  name: 'app',
  components: {
    SectionItem,
  },
  data() {
    return {
      itemsList: [
        {
          name: 'raw0027',
        },
        {
          name: 'IMG_0515',
        },
        {
          name: 'raw0005',
        },
        {
          name: 'fly-to-istanbul-5_27324746535_o',
        },
        {
          name: 'IMG_1118',
        },
        {
          name: 'IMG_1132',
        },
      ],
    };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: sans-serif;
}
</style>
