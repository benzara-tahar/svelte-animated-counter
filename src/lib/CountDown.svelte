<script lang="ts">
	import { onMount } from 'svelte';

	export let values: Array<string | number> = Array.from({ length: 100 }, (_, i) =>
		new String(i).padStart(3, '0')
	);
	export let className = '';
	export let interval = 1000;
	export let startImmediately = false;
	export let direction: 'up' | 'down' = 'down';
	export let loop = true;
	export let ease = 'cubic-bezier(1, 0, 0, 1)';
	export let initialValue: string | number | undefined = undefined;

	$: contentValues = values.join('\n');
	$: intervalInMs = `${interval}ms`;

	let index = 0;
	let lastValue = initialValue ?? values[index];

	onMount(() => {
		// timer function
		const start = () => {
			index = values.indexOf(lastValue) + (direction === 'up' ? 1 : -1);

			// terminate if we looped through all values && loop is false
			if (!loop && (index === values.length || index === -1)) {
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

<span class="sliding-text {className}">
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
