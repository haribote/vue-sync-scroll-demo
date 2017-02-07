<template>
  <div id="app">
    <component
      v-for="(item, index) in itemsList"
      :name="item.name"
      :title="item.title"
      :description="item.description"
      :isApproached="isApproachedItemsList[index]"
      :isCurrent="index === current"
      :is="index === 0 ? 'section-lead' : 'section-item'"
      key="item.name"
      ref="contentSection"
    ></component>
    <indicator
      :length="itemsList.length"
      :current="current"
      v-on:jump="handleJump"
    ></indicator>
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import scrolltop from 'scrolltop';
import offset from 'document-offset';
import SectionLead from './components/SectionLead';
import SectionItem from './components/SectionItem';
import Indicator from './components/Indicator';

// キャッシュ
const REFRESH_RATE = 1000 / 30;
let scrollHandler;
let resizeHandler;

export default {
  name: 'app',
  components: {
    SectionLead,
    SectionItem,
    Indicator,
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
     * 要素が画面下端より上にいるか否かを示す一覧
     * @return {Array<boolean>}
     */
    isApproachedItemsList() {
      const { innerHeight } = global;

      return this.offsetList.map(val => this.scrollY + innerHeight > val);
    },

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
        ...this.$refs.contentSection.map(item => offset(item.$el).top),
      );
    },

    /**
     * @listens Indicator.jump
     * @param to {number}
     */
    handleJump(to) {
      console.log(to);
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
  font-feature-settings: "palt" 1;
}

.section {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-position: 50% 50%;
  background-size: cover;
  color: #fff;
}

.section:first-of-type {
  position: fixed;
  top: 0;
  left: 0;
}

.section:first-of-type + .section {
  margin-top: 100vh;
}

.section .overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-position: 50% 50%;
  background-size: cover;
}

.effect-overlay-enter-active,
.effect-overlay-leave-active {
  transition-property: opacity;
  transition-delay: 400ms;
  transition-duration: 600ms;
  transition-timing-function: ease;
}

.effect-overlay-enter,
.effect-overlay-leave-to {
  opacity: 0;
}

.effect-overlay-leave,
.effect-overlay-enter-to {
  opacity: 1;
}

.effect-caption-enter-active,
.effect-caption-leave-active {
  transition-property: opacity, transform;
  transition-delay: 100ms;
  transition-duration: 400ms;
  transition-timing-function: ease;
}

.effect-caption-enter,
.effect-caption-leave-to {
  opacity: 0;
  transform: translate3d(0, 33%, 0);
}

.effect-caption-leave,
.effect-caption-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.section img {
  width: 100%;
  height: auto;
}
</style>
