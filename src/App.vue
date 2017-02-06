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
