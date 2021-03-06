<template>
  <div id="app">
    <aside class="aside">
      <a href="https://github.com/haribote/vue-sync-scroll-demo" target="_blank">
        <img
          src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
          alt="Fork me on GitHub"
          width="74.5"
          height="74.5"
          data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
        >
      </a>
    </aside>
    <component
      v-for="(item, index) in itemsList"
      :name="item.name"
      :title="item.title"
      :description="item.description"
      :isApproached="isApproachedList[index]"
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
    <footer class="footer">
      <p>Photo credits: © KIMURA Tetsuro <a rel="license" href="http://creativecommons.org/licenses/by-nc/2.0/" target="_blank"><img src="https://i.creativecommons.org/l/by-nc/2.0/80x15.png" alt="クリエイティブ・コモンズ・ライセンス" width="80" height="15" /></a></p>
    </footer>
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import scrolltop from 'scrolltop';
import offset from 'document-offset';
import TWEEN from 'tween.js';
import raf from 'raf';
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
      inAutoScrolling: false,
    };
  },

  // 算出プロパティ集
  computed: {
    /**
     * 要素が画面下端より上にいるか否かを示す一覧
     * @return {Array<boolean>}
     */
    isApproachedList() {
      const { innerHeight } = global;

      return this.offsetList.map(val => this.scrollY + innerHeight > val);
    },

    /**
     * スクロール位置がオフセット位置を越えているか否かを示す一覧
     * @return {Array<boolean>}
     */
    isReachedList() {
      return this.offsetList.map(val => this.scrollY >= val);
    },

    /**
     * 現在地を示す
     * @return {number}
     */
    current() {
      return this.isReachedList.lastIndexOf(true);
    },
  },

  // メソッド集
  methods: {
    /**
     * @listens window:scroll
     */
    handleScroll() {
      // スムーススクロール中ならば何もしない
      if (this.inAutoScrolling) {
        return;
      }

      // スクロール位置をキャッシュする
      this.scrollY = scrolltop();
    },

    /**
     * @listens window:resize
     */
    handleResize() {
      // オフセット位置の一覧を書き換える
      this.offsetList.splice(
        0,
        this.offsetList.length,
        ...this.$refs.contentSection.map((item, index) => (
          index === 0 ?
            0 :
            offset(item.$el).top
        )),
      );
    },

    /**
     * @listens Indicator:jump
     * @param index {number}
     */
    handleJump(index) {
      // スムーススクロール中ならば何もしない
      if (this.inAutoScrolling) {
        return;
      }

      // キャッシュ
      let isCompleted = false;

      this.inAutoScrolling = true;

      // スムーススクロールのモーションを設定する
      const tween = new TWEEN.Tween({
        y: scrolltop(),
      })
        .to({
          y: this.offsetList[index],
        }, 800)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(function onTweenUpdate() {
          global.scrollTo(0, this.y);
        })
        .onComplete(() => {
          tween.stop();
          isCompleted = true;
          this.inAutoScrolling = false;
          this.$nextTick(() => {
            this.dispatchGlobalEvent('scroll');
          });
        })
        .start();

      // アニメーションを動かす関数を定義する
      const animate = (time) => {
        if (isCompleted) {
          return;
        }
        raf(animate);
        TWEEN.update(time);
      };

      // アニメーションを開始する
      raf(animate);
    },

    /**
     * グローバルイベントを発火させる
     * @param name {string}
     */
    dispatchGlobalEvent(name) {
      global.dispatchEvent(new Event(name));
    },
  },

  /**
   * ライフサイクル: マウント直後
   */
  mounted() {
    // キャッシュ
    const { addEventListener, removeEventListener } = global;

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
    this.dispatchGlobalEvent('scroll');
    this.dispatchGlobalEvent('resize');
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

img {
  vertical-align: top;
}

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "palt" 1;
}

.aside {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
}

.aside a {
  display: block;
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

.section .figure {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-position: 50% 50%;
  background-size: cover;
}

.section .figure img {
  display: none;
  width: 100%;
  height: auto;
}

.footer {
  position: relative;
  padding: 10px;
  background: #000;
  color: #fff;
  text-align: center;
}

.footer p {
  margin-top: 0;
  margin-bottom: 0;
  font-size: .8rem;
  line-height: 15px;
}

.footer p a,
.footer p img {
  display: inline-block;
}

.effect-figure-enter-active,
.effect-figure-leave-active {
  transition-property: opacity;
  transition-delay: 400ms;
  transition-duration: 600ms;
  transition-timing-function: ease;
}

.effect-figure-enter,
.effect-figure-leave-to {
  opacity: 0;
}

.effect-figure-leave,
.effect-figure-enter-to {
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
</style>
