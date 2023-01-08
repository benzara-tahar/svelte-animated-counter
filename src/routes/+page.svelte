<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	// import CodeBlock from '@skeleton/CodeBlock.svelte';
	import { CodeBlock, RadioGroup, RadioItem, RangeSlider } from '@skeletonlabs/skeleton';
	import AnimatedCounter from '$lib/AnimatedCounter.svelte';
	import type { CounterDirection, CountValueResolver } from '$lib';

	// Stores
	const storeValues: Writable<(string | number)[]> = writable(
		Array.from({ length: 16 }, (_, i) => new String(i).padStart(2, '0'))
	);
	const storeDirection: Writable<CounterDirection | undefined> = writable('up');
	const storeLoop: Writable<boolean> = writable(true);
	const storeEase: Writable<string> = writable('cubic-bezier(1, 0, 0, 1)');
	const storeClass: Writable<string> = writable('text-3xl font-bold');
	const storeDuration: Writable<number> = writable(1000);
	const storeDelay: Writable<number> = writable(2000);
	const storeInitialValue: Writable<string | undefined> = writable(undefined);
	const valueResolver: Writable<CountValueResolver | undefined> = writable((v) => `✨ ${v} ✨`);

	const easeFunctions = [
		'linear',
		'ease',
		'ease-in',
		'ease-out',
		'ease-in-out',
		'cubic-bezier(1, 0, 0, 1)',
		'cubic-bezier(0.25, 0.1, 0.25, 1)',
		'cubic-bezier(0.42, 0, 1, 1)'
	];

	// Reactive
	$: counterValues = {
		direction: $storeDirection,
		ease: $storeEase,
		class: $storeClass,
		ring: undefined,
		color: undefined
	};
	let key = false;
	$: counterClasses = Object.values(counterValues)
		.filter((x) => x !== undefined)
		.join(' ');
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center p-4">
	<!-- sandbox -->
	<div class="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-2">
		<!-- Example -->
		<div class="card grid grid-rows-[1fr_auto]">
			<div class="p-4 flex justify-center items-center">
				{#key key}
					<!-- prettier-ignore -->
					<AnimatedCounter
					class={$storeClass}
					values={$storeValues}
					direction={$storeDirection}
					loop={$storeLoop}
					ease={$storeEase}
					duration={$storeDuration}
					delay={$storeDelay}
					initialValue={$storeInitialValue}
					valueResolver={$valueResolver}
					on:change={e=>console.log(e.detail)}
					>
				</AnimatedCounter>
				{/key}
			</div>

			<div class="mx-auto">
				<button on:click={() => (key = !key)} class="btn-icon btn-filled-primary p-1">
					<!-- prettier-ignore -->
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
					</svg>
				</button>
			</div>

			<div class="p-4">
				<CodeBlock
					language="html"
					code={`<AnimatedCounter ` +
						`values={[${$storeValues
							.slice(0, 3)
							.map((e) => `"${e}"`)
							.join(',')}, ... , "${$storeValues[$storeValues.length - 1]}"]}\n` +
						`	direction="${$storeDirection}"\n` +
						`	ease="${$storeEase}"\n` +
						`	loop={${$storeLoop}}\n` +
						($storeClass ? `	class="${$storeClass}"\n` : '') +
						($storeInitialValue ? `	initialValue="${$storeInitialValue}"\n` : '') +
						`	on:change={e=>console.log(e.detail)}\n` +
						($valueResolver ? `	valueResolver={(v)=> \`$✨ \{v\} ✨\`}\n` : '') +
						`></AnimatedCounter>`}
				/>
			</div>
		</div>
		<!-- Options -->
		<div class="card p-4 space-y-4">
			<!-- Direction -->
			<label for="">
				<span>Direction</span>
				<RadioGroup selected={storeDirection} display="flex">
					<RadioItem value="up">Up</RadioItem>
					<RadioItem value="down">Down</RadioItem>
					<RadioItem value="random">Random</RadioItem>
				</RadioGroup>
			</label>

			<!-- Start immediately -->
			<label for="">
				<span>Initial Value</span>
				<input type="text" name="initialValue" bind:value={$storeInitialValue} />
			</label>
			<label for="">
				<span>Loop</span>
				<RadioGroup selected={storeLoop} display="flex">
					<RadioItem value={true}>True</RadioItem>
					<RadioItem value={false}>False</RadioItem>
				</RadioGroup>
			</label>
			<!-- Duration -->
			<label for="">
				<span>Duration <strong>({$storeDuration} ms)</strong></span>
				<RangeSlider bind:value={$storeDuration} max={10000} step={500} ticked />
			</label>
			<!-- Delay -->
			<label for="">
				<span>Delay <strong>({$storeDelay} ms)</strong></span>
				<RangeSlider bind:value={$storeDelay} max={10000} step={500} ticked />
			</label>

			<!-- Ease-->
			<label>
				<span>Ease</span>
				<select name="ease" id="ease" bind:value={$storeEase}>
					{#each easeFunctions as ease}
						<option value={ease}>{ease}</option>
					{/each}
				</select>
			</label>
		</div>
	</div>
</div>
