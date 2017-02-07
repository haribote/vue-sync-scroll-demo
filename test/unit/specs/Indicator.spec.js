import Vue from 'vue';
import Indicator from 'src/components/Indicator';

describe('Indicator.vue', () => {
  const Ctor = Vue.extend(Indicator);

  it('should render correct contents', () => {
    const vm = new Ctor({
      propsData: {
        length: 5,
        current: 0,
      },
    }).$mount();
    expect(vm.$el.querySelectorAll('button').length).to.equal(5);
    expect(parseInt(vm.$el.querySelector('circle').getAttribute('fill-opacity'), 10)).to.equal(1);
  });
});
