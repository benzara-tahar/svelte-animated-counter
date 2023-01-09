<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { CountValueResolver, CounterValue, CounterDirection } from './types';
	const dispatch = createEventDispatcher();

	/**
	 * list of values to animate
	 */
	export let values: Array<CounterValue> = Array.from({ length: 60 }, (_, i) =>
		new String(i).padStart(2, '0')
	);

	/**
	 * counter interval between each step in milliseconds, defaults to `1000`
	 */
	export let duration = 1000;

	/**
	 * counter delay for each transition in milliseconds, defaults to `700`
	 */
	export let delay = 700;

	/**
	 * counter direction, can be `up`, `down` or `random`, defaults to `down`
	 */
	export let direction: CounterDirection = 'down';

	/**
	 * an optional value used to resolve the value, usefull when `values` is an array of objects and you want
	 * to apply count transition on a scalar field.
	 *
	 */
	export let valueResolver: CountValueResolver | undefined = undefined;

	/**
	 * whether to loop the counter animation after reaching the end of  `values` array , defaults to `true`
	 */
	export let loop = true;

	/**
	 * easing function to use, defaults to `cubic-bezier(1, 0, 0, 1)`
	 */
	export let ease: string = 'cubic-bezier(1, 0, 0, 1)';

	/**
	 * optional initial value to start the counter from
	 */
	export let initialValue: CounterValue | undefined = undefined;

	let timer: NodeJS.Timer;

	/**
	 * index initialized based on the direction
	 */
	let index =
		direction === 'up'
			? 0
			: direction === 'down'
			? values.length - 1
			: Math.floor(Math.random() * values.length);

	/**
	 * last tracked index
	 */
	let lastIndex = index;

	// reactive
	$: stringValues = values.map(resolveValue).join('\n\n');

	const resolveValue = (value: CounterValue): string => {
		if (typeof valueResolver === 'function') {
			return valueResolver(value);
		}

		return String(value);
	};

	onMount(() => {
		// timer function
		const initialValueIndex = values.indexOf(<CounterValue>initialValue);
		if (initialValueIndex !== -1) {
			index = lastIndex = initialValueIndex;
			dispatch('change', { previous: undefined, current: values[index] });
		}
		const start = () => {
			index =
				direction === 'random'
					? Math.floor(Math.random() * values.length)
					: lastIndex + (direction === 'up' ? 1 : -1);

			dispatch('change', { previous: values[lastIndex], current: values[index] });

			lastIndex = index;
			// terminate if we looped through all values && loop is false
			// prettier-ignore
			if (!loop && 
			    ((direction === 'up' && index === values.length - 1) || (direction === 'down' && index === 0))) {
				clearInterval(timer);
				return;
			}
			// ensure index is in range
			if (loop && index === values.length) {
				index = 0;
			}
			if (loop && index === -1) {
				index = values.length - 1;
			}
		};

		timer = setInterval(start, duration + delay);

		return () => clearInterval(timer);
	});
</script>

<span class="sliding-text {$$props.class}">
	<span style="--index: {index}; --delay: {delay}ms; --duration: {duration}ms; --ease:{ease}">
		<span>{stringValues}</span>
	</span>
</span>

<style>
	.sliding-text {
		display: inline-block;
		position: relative;
		line-height: 1em;
		height: 1em;
	}
	.sliding-text > span {
		height: 1em;
		display: inline-block;
		overflow-y: hidden;
	}
	.sliding-text > span > span {
		text-align: center;
		transition-property: all;
		transition-timing-function: var(--ease);
		transition-delay: var(--delay);
		transition-duration: var(--duration);
		position: relative;
		height: 100%;
		white-space: pre;
		top: calc(var(--index) * -2em);
	}
</style>
