import { shallow, mount } from '@vue/test-utils'
import createWrapperHelpers from './createWrapperHelpers'

export default function () {
  global.shallow = shallow
  global.mount = mount

  createWrapperHelpers()
}
