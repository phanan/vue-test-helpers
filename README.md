# vue-test-helpers [![Build Status](https://travis-ci.org/phanan/vue-test-helpers.svg?branch=master)](https://travis-ci.org/phanan/vue-test-helpers)

Helpers and syntactic sugars on top of [vue-test-utils](https://github.com/vuejs/vue-test-utils).

## Install

First install the package with yarn or npm:

```bash
$ yarn add vue-test-helpers --dev
```

Also you'll need a peer dependency of `vue-test-utils`. Install it with:

```bash
$ yarn add @vue/test-utils --dev
```

Then, before your tests (for example in a setup script), import and call the function:

```js
import setupHelpers from 'vue-test-helpers'

setupHelpers()
```

This will do two things:

1. By default, make [`mount`](https://vue-test-utils.vuejs.org/api/#mount) and [`shallowMount`](https://vue-test-utils.vuejs.org/api/#shallowmount) (also aliased as `shallow`) available globally, so you don't need to manually `import { mount, shallowMount } from '@vue/test-utils'` at the beginning of every test file. If this behavior is not what you want, just call `setupHelpers({ registerGlobals: false })` instead.
2. Add some helpers and syntactic sugars on top of `Wrapper` to create your test a better experience. See the next section for details.

## Available helpers

> These helpers are available on `Wrapper` instances only, since I'm not a fan of `WrapperArray` which is just a very thin wrapper around an array of `Wrapper`'s. If you are dealing with a `WrapperArray`, just iterate through its `.wrappers` collection and run the helpers on each item.

* **`.has(selector)`**: alias for [`.contains(selector)`](https://vue-test-utils.vuejs.org/api/wrapper-array/contains.html)
```js
expect(wrapper.has('p')).toBe(true)
expect(wrapper.has('#foo')).toBe(true)
expect(wrapper.has(childComponent)).toBe(false)
```
* **`.hasAll|containsAll(...selectors)`**: asserts that the wrapper has all provided selectors
```js
expect(wrapper.hasAll('p', '#foo', childComponent)).toBe(false)
```
* **`.hasAny|containsAny(...selectors)`**: asserts that the wrapper has any of the provided selectors
```js
expect(wrapper.hasAny('p', '#foo', childComponent)).toBe(true)
```
* **`.hasNone|containsNone(...selectors)`**: asserts that the wrapper has none of the provided selectors
```js
expect(wrapper.hasNone('p', '#foo', childComponent)).toBe(false)
```
* **`.hasClass|hasClasses(...classes)`**: asserts that the wrapper has the CSS class(es).
```js
expect(wrapper.find('.foo').hasClass('foo')).toBe(true)
expect(wrapper.find('.foo.bar').hasClasses('foo', 'bar')).toBe(true)
```
* **`.hasAttribute(name, value)`**: asserts that the wrapper has an attribute `name` with the value `value`
```js
expect(wrapper.find('[foo="bar"]').hasAttribute('foo', 'bar')).toBe(true)
```
* **`.hasProp(name, value)`**: asserts that the wrapper has a prop `name` with the value `value`
```js
expect(wrapper.hasProp('foo', 'bar')).toBe(true)
```
> Note: `hasClass`, `hasAttribute`, and `hasProp` are actually available in `vue-test-utils`, but marked as deprecated and will be removed in 1.0.
* **`.hasEmitted(name[, value])`**: asserts that an event `name` has been emitted, optionally with a value `value`
```js
wrapper.vm.$emit('foo', 'bar')
expect(wrapper.hasEmitted('foo')).toBe(true)
expect(wrapper.hasEmitted('foo', 'bar')).toBe(true)
```
* **`.id()`**: gets the id of the contained element
```js
expect(wrapper.find('#foo').id()).toBe('foo')
```
* **`.click|dblclick|input|submit|focus|blur|change([options])`**: triggers the click/dblclick/input/submit/focus/blur/change event on the contained element, optionally with an [`options`](https://vue-test-utils.vuejs.org/guides/#testing-key-mouse-and-other-dom-events) object. These methods return the wrapper instance, useful for chaining.
```js
expect(wrapper.click().hasEmitted('clicked')).toBe(true)
expect(wrapper.click({ button: 1 }).hasEmitted('rightClicked')).toBe(true)
```
* **`.click|dblclick|input|submit|focus|blur|change(selector[, options])`**: finds the contained element by `selector` and triggers the click/dblclick/input/submit/focus/blur/change event on it, optionally with an [`options`](https://vue-test-utils.vuejs.org/guides/#testing-key-mouse-and-other-dom-events) object. These methods return the wrapper instance, useful for chaining.
```js
expect(wrapper.click('button').hasEmitted('buttonClicked')).toBe(true)
expect(wrapper.click('button', { ctrlKey: true }).hasEmitted('buttonCtrlClicked')).toBe(true)
```
* **`.setValue(value)`**: sets the value of the contained (input) element. This method returns the called instance, useful for chaining.
```js
wrapper.find('input').setValue('foo').change()
```
* **`.getValue()`**: gets the value of the contained (input) element
```js
expect(wrapper.find('input').setValue('foo').getValue()).toBe('foo')
```
* **`.value`**: a proxy for the value of the contained (input) element
```js
wrapper.find('input').value = 'foo'
expect(wrapper.find('input').value).toBe('foo')
```

## License

MIT © [Phan An](https://phanan.net)
