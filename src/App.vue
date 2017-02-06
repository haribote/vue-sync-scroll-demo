<template>
  <div id="app">
    <section-item v-for="(item, index) in itemsList" :name="item.name" :title="item.title" :description="item.description" :isFirst="index === 0"></section-item>
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
          title: 'Bayon',
          description: 'Cambodia',
        },
        {
          name: 'IMG_0515',
          title: 'Angkor Wat',
          description: 'Cambodia',
        },
        {
          name: 'raw0005',
          title: 'Ha Long Bay',
          description: 'Vietnam',
        },
        {
          name: 'fly-to-istanbul-5_27324746535_o',
          title: 'Historic Areas of Istanbul',
          description: 'Turkey',
        },
        {
          name: 'IMG_1118',
          title: 'Göreme National Park and the Rock Sites of Cappadocia',
          description: 'Turkey',
        },
        {
          name: 'IMG_1132',
          title: 'Acropolis, Athens',
          description: 'Greece',
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings : "palt" 1;
}
</style>
