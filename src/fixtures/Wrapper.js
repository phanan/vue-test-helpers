import { shallowMount } from '@vue/test-utils'
import Component from './Component.vue'

// A workaround because at the time being vue-test-util doesn't export `Wrapper`.
export default shallowMount(Component).find('.foo').constructor
