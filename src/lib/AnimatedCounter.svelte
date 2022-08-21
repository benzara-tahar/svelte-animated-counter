<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * list of values to animate
	 */
	export let values: Array<string | number> = Array.from({ length: 100 }, (_, i) =>
		new String(i).padStart(3, '0')
	);
	/**
	 * counter interval between each step in milliseconds, defaults to `1000`
	 */
	export let interval = 1000;
	/**
	 * whether to start the counter immediately or wait for the `interval` to pass, defaults to `false`
	 */
	export let startImmediately = false;

	/**
	 * counter direction, can be `up` or `down` defaults to `down`
	 */
	export let direction: 'up' | 'down' = 'down';
	/**
	 * whether to loop the counter animation after reaching the end of  `values` array , defaults to `true`
	 */
	export let loop = true;
	/**
	 * easing function to use, defaults to `cubic-bezier(1, 0, 0, 1)`
	 */
	export let ease = 'cubic-bezier(1, 0, 0, 1)';
	/**
	 * optional initial value to start the counter from
	 */
	export let initialValue: string | number | undefined = undefined;

	$: contentValues = values.join('\n');
	$: intervalInMs = `${interval}ms`;

	let index = direction === 'up' ? 0 : values.length - 1;
	let lastValue = initialValue ?? values[index];

	onMount(() => {
		// timer function
		const start = () => {
			index = values.indexOf(lastValue) + (direction === 'up' ? 1 : -1);

			// terminate if we looped through all values && loop is false
			if (!loop && (index === values.length - 1 || index === 0)) {
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

			lastValue = values[index];
		};

		if (startImmediately) {
			start();
		}
		let timer = setInterval(start, interval);

		return () => clearInterval(timer);
	});
</script>

<span class="sliding-text {$$props.class}">
	<span style="--index: {index}; --interval: {intervalInMs}; --ease:{ease}">
		<span>{contentValues}</span>
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
		transition: all var(--interval) var(--ease);
		position: relative;
		height: 100%;
		white-space: pre;
		top: calc(var(--index) * -1em);
	}
</style>
