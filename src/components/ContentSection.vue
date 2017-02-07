<template>
  <div class="section" :style="tempImageStyle">
    <transition name="effect-overlay">
      <div class="overlay" :style="regularImageStyle" v-if="isLoaded"></div>
    </transition>
    <slot></slot>
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
      'isApproached',
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
<style scoped></style>
