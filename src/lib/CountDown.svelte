<script lang="ts">
	import { onMount } from 'svelte';

	export let values: Array<string | number> = Array.from({ length: 100 }, (_, i) =>
		new String(i).padStart(3, '0')
	);
	export let className = '';
	export let interval = 1000;
	export let direction: 'up' | 'down' = 'down';
	export let loop = true;
	export let initialValue: string | number | undefined = undefined;

	$: contentValues = values.join('\n');
	$: intervalInMs = `${interval}ms`;

	let index = 0;
	let lastValue = initialValue ?? values[index];

	onMount(() => {
		let timer = setInterval(() => {
			console.log(lastValue);
			// clearInterval(timer);
			// return;
			index = values.indexOf(lastValue) + (direction === 'up' ? 1 : -1);
			if (index === values.length) {
				if (loop) {
					index = 0;
				} else {
					clearInterval(timer);
					return;
				}
			}
			if (index === -1) {
				if (loop) {
					index = values.length - 1;
				} else {
					clearInterval(timer);
					return;
				}
			}

			lastValue = values[index];
		}, interval);

		return () => clearInterval(timer);
	});
</script>

<span class="sliding-text {className}">
	<span style="--index: {index}; --interval: {intervalInMs}">
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
		transition: all var(--interval) cubic-bezier(1, 0, 0, 1);
		position: relative;
		height: 100%;
		white-space: pre;
		top: calc(var(--index) * -1em);
	}
</style>
