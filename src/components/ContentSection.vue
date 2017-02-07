<template>
  <div class="section" :style="style">
  </div>
</template>

<script>
  // キャッシュ
  const IMAGE_PATH = '/static/img/';
  const TEMP_IMAGE_SUFFIX = '_s';
  const IMAGE_EXT = '.jpg';

  export default {
    name: 'content-section',

    // プロパティ一覧
    props: [
      'name',
      'title',
      'description',
      'isApproached',
      'isCurrent',
    ],

    // 内部プロパティ一覧
    data() {
      return {
        inLoading: false,
        isLoaded: false,
      };
    },

    // 算出プロパティ一覧
    computed: {
      tempImageUrl() {
        return `${IMAGE_PATH}${this.name}${TEMP_IMAGE_SUFFIX}${IMAGE_EXT}`;
      },
      regularImageUrl() {
        return `${IMAGE_PATH}${this.name}${IMAGE_EXT}`;
      },
      tempImageStyle() {
        return {
          backgroundImage: `url(${this.tempImageUrl})`,
        };
      },
      regularImageStyle() {
        return {
          backgroundImage: `url(${this.regularImageUrl})`,
        };
      },
    },

    // ウォッチャー一覧
    watch: {
      isApproached(val) {
        if (val) {
          this.loadRegularImage();
        }
      },
    },

    // メソッド一覧
    methods: {
      loadRegularImage() {
        if (this.inLoading || this.isLoaded) {
          return;
        }

        this.inLoading = true;

        const load = () => (
          new Promise((resolve) => {
            const image = new Image();

            image.onload = () => {
              Object.assign(this, {
                inLoading: false,
                isLoaded: true,
              });
              resolve(image);
            };

            image.crossOrigin = 'Anonymous';
            image.src = this.regularImageUrl;
          })
        );

        load();
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

  .section:nth-of-type(2) {
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
