import { mount as originalMount, shallowMount as originalShallow } from '@vue/test-utils'
import Basic from './components/Basic.vue'
import Contains from './components/Contains.vue'
import Events from './components/Events.vue'
import Inputs from './components/Inputs.vue'
import Props from './components/Props.vue'
import setupHelpers from '../src'

describe('vue-test-helpers', () => {
  setupHelpers()

  it('registers mount and shallow globally', () => {
    mount.should.equal(originalMount)
    shallowMount.should.equal(originalShallow)
  })

  it('has', () => {
    const wrapper = mount(Basic)
    wrapper.has.should.equal(wrapper.contains)
  })

  it('hasAll', () => {
    const wrapper = shallowMount(Contains)
    wrapper.hasAll('.foo', '.bar').should.be.true
    wrapper.containsAll('.foo', '.baz').should.be.false
  })

  it('hasAny', () => {
    const wrapper = shallowMount(Contains)
    wrapper.hasAny('.foo', '.bar').should.be.true
    wrapper.containsAny('.foo', '.baz').should.be.true
    wrapper.hasAny('.baz', '.qux').should.be.false
  })

  it('hasNone', () => {
    const wrapper = shallowMount(Contains)
    wrapper.hasNone('.foo', '.bar').should.be.false
    wrapper.containsNone('.foo', '.baz').should.be.false
    wrapper.doesntHaveAny('.baz', '.qux').should.be.true
  })

  it('hasClass(es)', () => {
    const wrapper = shallowMount(Basic)
    wrapper.find('.foo').hasClass('foo').should.be.true
    wrapper.find('.foo').hasClasses('foo', 'fooo').should.be.true
  })

  it('hasAttribute', () => {
    const wrapper = shallowMount(Basic)
    wrapper.find('.disabled').hasAttribute('disabled', 'disabled').should.be.true
  })

  it('hasProp', () => {
    const wrapper = mount(Props, { propsData: {
      foo: 'bar'
    }})
    wrapper.hasProp('foo', 'bar').should.be.true
  })

  it('id', () => {
    const wrapper = shallowMount(Basic)
    wrapper.find('#bar').id().should.equal('bar')
  })

  it('triggers events without an argument', () => {
    const wrapper = shallowMount(Events)
    const clickStub = sinon.stub(wrapper.vm, 'click')
    const dblclickStub = sinon.stub(wrapper.vm, 'dblclick')
    const submitStub = sinon.stub(wrapper.vm, 'submit')
    wrapper.find('.click').click()
    wrapper.find('.dblclick').dblclick()
    wrapper.find('form').submit()
    clickStub.called.should.be.true
    dblclickStub.called.should.be.true
    submitStub.calledWith('foo').should.be.true

    clickStub.restore()
    dblclickStub.restore()
    submitStub.restore()
  })

  it('triggers events with a selector', () => {
    const wrapper = shallowMount(Events)
    const clickStub = sinon.stub(wrapper.vm, 'click')
    wrapper.click('.click')
    clickStub.called.should.be.true
    clickStub.restore()
  })

  it('triggers events with an options object', () => {
    const wrapper = shallowMount(Events)
    const inputWrapper = wrapper.find('.click')
    const triggerStub = sinon.stub(inputWrapper, 'trigger')
    inputWrapper.click({ shiftKey: true })
    triggerStub.calledWith('click', { shiftKey: true }).should.be.true
    triggerStub.restore()
  })

  it('gets/sets values', () => {
    const wrapper = shallowMount(Inputs)
    wrapper.find('.foo').value = 'Bar'
    wrapper.find('.foo').element.value.should.equal('Bar')
    wrapper.find('.foo').element.value = 'Baz'
    wrapper.find('.foo').value.should.equal('Baz')
  })

  it('setValue', () => {
    const wrapper = shallowMount(Inputs)
    const input = wrapper.find('.foo')
    input.setValue('Foo').should.equal(input)
    wrapper.find('.foo').element.value.should.equal('Foo')
  })

  it('getValue', () => {
    const wrapper = shallowMount(Inputs)
    wrapper.find('.foo').setValue('Foo')
    wrapper.find('.foo').element.value.should.equal('Foo')
  })

  it('hasEmitted', () => {
    const wrapper = shallowMount(Events)
    wrapper.find('.click').click()
    wrapper.find('.dblclick').dblclick()
    wrapper.hasEmitted('clicked').should.be.true
    wrapper.hasEmitted('clicked', 10).should.be.true
    wrapper.hasEmitted('dblclicked', [41, 42]).should.be.true
  })
})
