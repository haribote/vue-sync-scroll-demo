<template>
  <div id="app">
    <section-item
      v-for="(item, index) in itemsList"
      :name="item.name"
      :title="item.title"
      :description="item.description"
      :isCurrent="index === current"
      :isFirst="index === 0"
      ref="sectionItem"
    ></section-item>
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import scrolltop from 'scrolltop';
import offset from 'document-offset';
import SectionItem from './components/SectionItem';

// キャッシュ
const REFRESH_RATE = 1000 / 30;
let scrollHandler;
let resizeHandler;

export default {
  name: 'app',
  components: {
    SectionItem,
  },

  // データ集合
  data() {
    return {
      scrollY: 0,
      offsetList: [],
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

  // 算出プロパティ集
  computed: {
    /**
     * スクロール位置がオフセット位置を越えているか否かを示す一覧
     * @return {Array<boolean>}
     */
    isReachedItemsList() {
      return this.offsetList.map(val => this.scrollY >= val);
    },

    /**
     * 現在地を示す
     * @return {number}
     */
    current() {
      return this.isReachedItemsList.lastIndexOf(true);
    },
  },

  // メソッド集
  methods: {
    /**
     * @listens window.scroll
     */
    handleScroll() {
      // スクロール位置をキャッシュする
      this.scrollY = scrolltop();
    },

    /**
     * @listens window.resize
     */
    handleResize() {
      // オフセット位置の一覧を書き換える
      this.offsetList.splice(
        0,
        this.offsetList.length,
        ...this.$refs.sectionItem.map(item => offset(item.$el).top),
      );
    },
  },

  /**
   * ライフサイクル: マウント直後
   */
  mounted() {
    // キャッシュ
    const { dispatchEvent, addEventListener, removeEventListener } = global;

    // すでにイベントハンドラーが設定されていたら取り除く
    if (scrollHandler) {
      removeEventListener('scroll', scrollHandler);
    }
    if (resizeHandler) {
      removeEventListener('resize', resizeHandler);
    }

    // 多発するイベントハンドラーの実行頻度を間引く
    scrollHandler = throttle(() => {
      this.handleScroll();
    }, REFRESH_RATE);
    resizeHandler = debounce(() => {
      this.handleResize();
    }, REFRESH_RATE);

    // イベントハンドラーを引き当てる
    addEventListener('scroll', scrollHandler, false);
    addEventListener('resize', resizeHandler, false);

    // イベントを発火させる
    dispatchEvent(new Event('scroll'));
    dispatchEvent(new Event('resize'));
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
