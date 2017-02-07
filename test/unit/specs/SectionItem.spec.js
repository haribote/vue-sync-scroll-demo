import Vue from 'vue';
import SectionItem from 'src/components/SectionItem';

describe('SectionItem.vue', () => {
  const Ctor = Vue.extend(SectionItem);

  it('should render correct contents', () => {
    const vm = new Ctor({
      propsData: {
        name: 'foo',
      },
    }).$mount();
    expect(vm.$el.style.backgroundImage)
      .to.equal(`url(http://localhost:${location.port}/static/img/foo.jpg)`);
  });

  it('should render caption', () => {
    const vm = new Ctor({
      propsData: {
        name: 'foo',
        title: 'bar',
        description: 'buz',
        isCurrent: true,
        isFirst: false,
      },
    }).$mount();
    expect(vm.$el.querySelectorAll('.caption').length).to.equal(1);
    expect(vm.$el.querySelector('.caption h2').textContent).to.equal('bar');
    expect(vm.$el.querySelector('.caption p').textContent).to.equal('buz');
  });
});
