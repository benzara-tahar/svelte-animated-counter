<script lang="ts">
	// const intValues = Array.from({ length: 10 }, (_, i) => new String(i).padStart(2, '0'));
	// const skillsValues = ['Creative', 'FullStack', 'Frontend', 'Backend'];
	// const listValues = [
	// 	'First',
	// 	'Second',
	// 	'Third',
	// 	'Fourth',
	// 	'Fifth',
	// 	'Sixth',
	// 	'Seventh',
	// 	'Eighth',
	// 	'Ninth',
	// 	'Tenth'
	// ];
	// // prettier-ignore
	// const shortMonthsValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	// // prettier-ignore
	// const longMonthValues = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	// const yearsValues = Array.from({ length: 122 }, (_, i) => (1900 + i).toString());
	// // prettier-ignore
	// let selectedEaseFunction = easeFunctions[0];

	import { writable, type Writable } from 'svelte/store';
	// Docs
	// Components
	// import CodeBlock from '@skeleton/CodeBlock.svelte';
	import { CodeBlock, RadioGroup, RadioItem, RangeSlider } from '@skeletonlabs/skeleton';
	import AnimatedCounter from '$lib/AnimatedCounter.svelte';
	import { loop } from 'svelte/internal';

	// Stores
	const storeValues: Writable<(string | number)[]> = writable(
		Array.from({ length: 16 }, (_, i) => new String(i).padStart(2, '0'))
	);
	const storeDirection: Writable<'down' | 'up' | undefined> = writable('down');
	const storeLoop: Writable<boolean> = writable(true);
	const storeEase: Writable<string> = writable('cubic-bezier(1, 0, 0, 1)');
	const storeRandom: Writable<boolean> = writable(false);
	const storeStartImmediately: Writable<boolean> = writable(false);
	const storeInterval: Writable<number> = writable(1000);
	const storeInitialValue: Writable<string | undefined> = writable(undefined);
	let customClass = 'text-3xl font-bold';
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
		ring: undefined,
		color: undefined
	};
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
				<!-- prettier-ignore -->
				<AnimatedCounter
					class={customClass}
					values={$storeValues}
					direction={$storeDirection}
					loop={$storeLoop}
					ease={$storeEase}
					random={$storeRandom}
					interval={$storeInterval}
					startImmediately={$storeStartImmediately}
					initialValue={$storeInitialValue}
					>

					</AnimatedCounter>
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
						`	random={${$storeRandom}}\n` +
						`	startImmediately={${$storeStartImmediately}}\n` +
						($storeInitialValue ? `	initialValue="${$storeInitialValue}"\n` : '') +
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
				</RadioGroup>
			</label>

			<!-- Random -->
			<label for="">
				<span>Random</span>
				<RadioGroup selected={storeRandom} display="flex">
					<RadioItem value={true}>True</RadioItem>
					<RadioItem value={false}>False</RadioItem>
				</RadioGroup>
			</label>

			<!-- Start immediately -->
			<label for="">
				<span>Start immediately</span>
				<RadioGroup selected={storeStartImmediately} display="flex">
					<RadioItem value={true}>True</RadioItem>
					<RadioItem value={false}>False</RadioItem>
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
			<!-- Interval -->
			<label for="">
				<span>Interval</span>
				<RangeSlider bind:value={$storeInterval} max={10000} step={500} ticked
					>Interval ({$storeInterval} ms)</RangeSlider
				>
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
