<template>
  <div class="indicator">
    <ul>
      <li v-for="item in list">
        <button type="button" :value="item" @click.prevent="handleClickButton(item)">
          <svg viewBox="0 0 8 8" width="8" height="8">
            <circle cx="4" cy="4" r="4" fill="#fff" :fill-opacity="current === item ? 1 : .4" stroke="none"></circle>
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import range from 'lodash.range';

  export default {
    name: 'indicator',

    // プロパティ一覧
    props: [
      'length',
      'current',
    ],

    // 算出プロパティ一覧
    computed: {
      /**
       * ドットの元となる配列
       * @returns {Array<number>}
       */
      list() {
        return range(this.length);
      },
    },

    // メソッド一覧
    methods: {
      /**
       * ボタンのクリックイベントハンドラー
       * @param index {number}
       */
      handleClickButton(index) {
        this.$emit('jump', index);
      },
    },
  };
</script>

<style scoped>
  .indicator {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  ul {
    margin: 0;
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, .6);
    -webkit-border-radius: 21px;
    -moz-border-radius: 21px;
    border-radius: 21px;
    background: rgba(0, 0, 0, .4);
    list-style: none;
  }

  li {
    margin: 0;
    padding: 0;
  }

  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: block;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    width: 8px;
    height: 8px;
    margin: 8px 0;
    padding: 8px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
  }

  svg {
    vertical-align: top;
  }
</style>
