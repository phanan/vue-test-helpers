# vue-test-helpers [![Build Status](https://travis-ci.org/phanan/vue-test-helpers.svg?branch=master)](https://travis-ci.org/phanan/vue-test-helpers)

Helpers and syntactic sugars on top of [vue-test-utils](https://github.com/vuejs/vue-test-utils).

## Install

First install the package with yarn or npm:

```bash
$ yarn add vue-test-helpers --dev
```

Then, before your tests (for example in a setup script), import and call the function:

```js
import setupHelpers from 'vue-test-helpers'

setupHelpers()
```

This will do two things:

1. Make `mount` and `shallow` available globally, so you don't need to manually `import { mount, shallow } from 'vue-test-utils'` at the beginning of every test file
2. Add some helpers and syntactic sugars on top of `Wrapper` to create your test a better experience. See the next section for details.

## Available helpers

> These helpers are available on `Wrapper` instances only, since I'm not a fan of `WrapperArray` which is just a very thin wrapper around an array of `Wrapper`'s. If you are dealing with a `WrapperArray`, just iterate through its `.wrappers` collection and run the helpers on each item.

* `.has(selector)`: alias for `.contains(selector)`
* `.hasAll|containsAll(...selectors)`: asserts that the wrapper has all provided selectors
* `.hasAny|containsAny(...selectors)`: asserts that the wrapper has any of the provided selectors
* `.hasNone|containsNone(...selectors)`: asserts that the wrapper has none of the provided selectors
* `.hasClass|hasClasses(...classes)`: asserts that the wrapper has the CSS class(es).
* `.hasAttribute(name, value)`: asserts that the wrapper has an attribute `name` with the value `value`
* `.hasProp(name, value)`: asserts that the wrapper has a prop `name` with the value `value`
> Note: `hasClass`, `hasAttribute`, and `hasProp` are still available in `vue-test-utils`, but marked as deprecated and will be removed in 1.0.
* `.hasEmitted(name[, value])`: assert that an event `name` has been emitted, optionally with a value `value`
* `.id()`: gets the id of the contained element
* `.click|dblclick|input|submit([options])`: triggers the click/dblclick/input/submit event on the contained element, optionally with an [`options`](https://vue-test-utils.vuejs.org/en/guides/dom-events.html#options) object
* `.setValue(value)`: sets the value of the contained (input) element. This method returns the `Wrapper`, which is useful for chaining e.g. `Wrapper.setValue('foo').input()`.
* `.getValue()`: gets the value of the contained (input) element
* `.value`: a proxy for the value of the contained (input) element. This means you can do something like `Wrapper.value = 'foo'` and `expect(Wrapper.value).toEqual('foo')`.

## License

MIT © [Phan An](https://phanan.net)
