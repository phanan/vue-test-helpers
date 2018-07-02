import { shallowMount, mount } from '@vue/test-utils'
import createWrapperHelpers from './createWrapperHelpers'

export default function (options = { registerGlobals: true }) {
  if (options.registerGlobals) {
    global.shallow = global.shallowMount = shallowMount
    global.mount = mount
  }

  createWrapperHelpers()
}
