import Vue from 'vue';
import SectionItem from 'src/components/SectionItem';

describe('SectionItem.vue', () => {
  it('should render correct contents', () => {
    const Ctor = Vue.extend(SectionItem);
    const vm = new Ctor({
      propsData: {
        name: 'foo',
      },
    }).$mount();
    expect(vm.$el.style.backgroundImage)
      .to.equal(`url(http://localhost:${location.port}/static/img/foo.jpg)`);
  });
});
