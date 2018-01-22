import { shallow, mount } from '@vue/test-utils'
import createWrapperHelpers from './createWrapperHelpers'

export default function (options = { registerGlobals: true }) {
  if (options.registerGlobals) {
    global.shallow = shallow
    global.mount = mount
  }

  createWrapperHelpers()
}
