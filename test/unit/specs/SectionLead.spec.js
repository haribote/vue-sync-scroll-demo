import Vue from 'vue';
import SectionLead from 'src/components/SectionLead';

describe('SectionLead.vue', () => {
  const Ctor = Vue.extend(SectionLead);

  it('should render correct contents', () => {
    const vm = new Ctor({
      propsData: {
        name: 'foo',
      },
    }).$mount();
    expect(vm.$el.style.backgroundImage)
      .to.equal(`url(http://localhost:${location.port}/static/img/foo.jpg)`);
  });

  it('should render cover', () => {
    const vm = new Ctor({
      propsData: {
        name: 'foo',
        isFirst: true,
      },
    }).$mount();
    expect(vm.$el.querySelectorAll('.cover').length).to.equal(1);
  });
});
