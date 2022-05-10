# svelte-animated-counter

A tiny css-agnostic animated counter for Svelte

## Installation 🔧

npm

```sh
npm install @benzara/svelte-animated-counter
```

or yarn

```sh
yarn install @benzara/svelte-animated-counter
```

## Features ✨

- No dependencies
- CSS agnostic (custom styling)
- less than 1Kb minified
- works for svelte and svelte-kit
- Customisable (see options below)

## How to use 🚀

1. First import the component on your svelte page's script section.

```js
import AnimatedCounter from '@benzara/svelte-animated-counter';
```

2. Call the component where you want it to be placed e.g.:

```jsx
<AnimatedCounter
	values={Array.from({ length: 122 }, (_, i) => (1900 + i).toString())}
	className="custom-counter"
	interval={1000}
	startImmediately={false}
	direction="down"
	loop={true}
	ease="cubic-bezier(0.25, 0.1, 0.25, 1)"
	initialValue="2008"
/>
```

### Configuration Options

| Name             | Default                    | Description                                                                                         |
| ---------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| values           | `['000',..., '100']`       | list of values to animate                                                                           |
| className        | `''`                       | optional class name to customize the counter                                                        |
| interval         | `1000`                     | counter interval between each step in milliseconds, defaults to `1000`                              |
| startImmediately | `false`                    | whether to start the counter immediately or wait for the `interval` to pass, defaults to `false`    |
| direction        | 'down'                     | counter direction, can be `up` or `down` defaults to `down`                                         |
| loop             | `true`                     | whether to loop the counter animation after reaching the end of `values` array , defaults to `true` |
| ease             | `cubic-bezier(1, 0, 0, 1)` | easing function to use, defaults to `cubic-bezier(1, 0, 0, 1)`                                      |
| initialValue     | `undefined`                | optional initial value to start the counter from                                                    |

## Contribution 🖇️

Feel free to fork. If you find a bug or got something great to add make a pull request!

## Authors ✒️

**Benzara Tahar Benlahcene** - _ Initial Work _ - [benzara-tahar](https://github.com/benzara-tahar)

You can also look at the list of all the [contributors](https://github.com/benzara-tahar/svelte-animated-counter/contributors) who have participated in this project.

## License 📄

This project is free to use, edit & distribute under the MIT License.

---

⌨️ with ❤️ by [benzara-tahar](https://github.com/benzara-tahar) 😊
