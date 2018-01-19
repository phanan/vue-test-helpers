import { shallow } from '@vue/test-utils'
import Component from './Component.vue'

// A workaround because at the time being vue-test-wrapper doesn't export `Wrapper`.
export default shallow(Component).find('div').constructor
