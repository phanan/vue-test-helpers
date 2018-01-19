require('jsdom-global')()
require('babel-polyfill')
require('chai').should()
require('vue').productionTip = false

global.expect = require('expect')
global.sinon = require('sinon')
