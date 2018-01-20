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

1. Make [`mount`](https://vue-test-utils.vuejs.org/en/api/mount.html) and [`shallow`](https://vue-test-utils.vuejs.org/en/api/shallow.html) available globally, so you don't need to manually `import { mount, shallow } from 'vue-test-utils'` at the beginning of every test file
2. Add some helpers and syntactic sugars on top of `Wrapper` to create your test a better experience. See the next section for details.

## Available helpers

> These helpers are available on `Wrapper` instances only, since I'm not a fan of `WrapperArray` which is just a very thin wrapper around an array of `Wrapper`'s. If you are dealing with a `WrapperArray`, just iterate through its `.wrappers` collection and run the helpers on each item.

* **`.has(selector)`**: alias for [`.contains(selector)`](https://vue-test-utils.vuejs.org/en/api/wrapper/contains.html)
```js
wrapper.has('p').should.be.true
wrapper.has('#foo').should.be.true
wrapper.has(childComponent).should.be.false
```
* **`.hasAll|containsAll(...selectors)`**: asserts that the wrapper has all provided selectors
```js
wrapper.hasAll('p', '#foo', childComponent).should.be.false
```
* **`.hasAny|containsAny(...selectors)`**: asserts that the wrapper has any of the provided selectors
```js
wrapper.hasAny('p', '#foo', childComponent).should.be.true
```
* **`.hasNone|containsNone(...selectors)`**: asserts that the wrapper has none of the provided selectors
```js
wrapper.hasNone('p', '#foo', childComponent).should.be.false
```
* **`.hasClass|hasClasses(...classes)`**: asserts that the wrapper has the CSS class(es).
```js
wrapper.find('.foo').hasClass('foo').should.be.true
wrapper.find('.foo.bar').hasClass('foo', 'bar').should.be.true
```
* **`.hasAttribute(name, value)`**: asserts that the wrapper has an attribute `name` with the value `value`
```js
wrapper.find('[foo="bar"]').hasAttribute('foo', 'bar').should.be.true
```
* **`.hasProp(name, value)`**: asserts that the wrapper has a prop `name` with the value `value`
```js
wrapper.hasProp('foo', 'bar').should.be.true
```
> Note: `hasClass`, `hasAttribute`, and `hasProp` are actually available in `vue-test-utils`, but marked as deprecated and will be removed in 1.0.
* **`.hasEmitted(name[, value])`**: assert that an event `name` has been emitted, optionally with a value `value`
```js
wrapper.vm.$emit('foo', 'bar')
wrapper.hasEmitted('foo').should.be.true
wrapper.hasEmitted('foo', 'bar').should.be.true
```
* **`.id()`**: gets the id of the contained element
```js
wrapper.find('#foo').id().should.equal('foo')
```
* **`.click|dblclick|input|submit|focus|blur|change([options])`**: triggers the click/dblclick/input/submit/focus/blur/change event on the contained element, optionally with an [`options`](https://vue-test-utils.vuejs.org/en/guides/dom-events.html#options) object. These methods return the wrapper instance, useful for chaining.
```js
wrapper.click().hasEmitted('clicked').should.be.true
wrapper.click({ button: 1 }).hasEmitted('rightClicked').should.be.true
```
* **`.click|dblclick|input|submit|focus|blur|change(selector[, options])`**: finds the contained element by `selector` and triggers the click/dblclick/input/submit/focus/blur/change event on it, optionally with an [`options`](https://vue-test-utils.vuejs.org/en/guides/dom-events.html#options) object. These methods return the wrapper instance, useful for chaining.
```js
wrapper.click('button').hasEmitted('buttonClicked').should.be.true
wrapper.click('button', { ctrlKey: true }).hasEmitted('buttonCtrlClicked').should.be.true
```
* **`.setValue(value)`**: sets the value of the contained (input) element. This method returns the called instance, useful for chaining.
```js
wrapper.find('input').setValue('foo').change()
```
* **`.getValue()`**: gets the value of the contained (input) element
```js
wrapper.find('input').setValue('foo').getValue().should.equal('foo')
```
* **`.value`**: a proxy for the value of the contained (input) element
```js
wrapper.find('input').value = 'foo'
wrapper.find('input').value.should.equal('foo')
```

## License

MIT © [Phan An](https://phanan.net)
