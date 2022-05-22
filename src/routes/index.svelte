<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import AnimatedCounter from '$lib/AnimatedCounter.svelte';

	const intValues = Array.from({ length: 10 }, (_, i) => new String(i).padStart(2, '0'));
	const skillsValues = ['Creative', 'FullStack', 'Frontend', 'Backend'];
	// prettier-ignore
	const shortMonthsValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	// prettier-ignore
	const longMonthValues = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const yearsValues = Array.from({ length: 122 }, (_, i) => (1900 + i).toString());
	// prettier-ignore
	let easeFunctions = [ 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(1, 0, 0, 1)', 'cubic-bezier(0.25, 0.1, 0.25, 1)', 'cubic-bezier(0.42, 0, 1, 1)'];
	let selectedEaseFunction = easeFunctions[0];
</script>

<svelte:head>
	<title>Svelte Animated Counter</title>
	<meta name="description" content="Tiny animated counter library for svelte" />
</svelte:head>

<section>
	<h1>@benzara/svelte-animated-counter</h1>

	<p>A tiny ( {'<'} 2Kb ) animated counter component for svelte</p>

	<h1>demo</h1>
	<h2>Numeric Values</h2>
	<AnimatedCounter values={intValues} />
	<br />
	<AnimatedCounter initialValue={'2002'} direction="up" values={yearsValues} />

	<h2>String Values</h2>
	<div class="skills">
		Hi! Iam a [
		<AnimatedCounter values={skillsValues} direction="up" class="custom-skill" />
		] developer
	</div>
	<br />

	<AnimatedCounter direction="up" values={shortMonthsValues} />
	<br />
	<AnimatedCounter values={longMonthValues} />

	<h2>Custom Style</h2>
	<AnimatedCounter
		class="custom-counter"
		direction="up"
		initialValue={'2002'}
		values={yearsValues}
		interval={1000}
		startImmediately={true}
	/>

	<h2>Custom easing</h2>
	<AnimatedCounter
		direction="up"
		initialValue={'2002'}
		values={yearsValues}
		ease={selectedEaseFunction}
		interval={1000}
		startImmediately={true}
	/>
	<br />
	<div>
		{#each easeFunctions as easeFunction, index}
			<label>
				<input type="radio" bind:group={selectedEaseFunction} value={easeFunction} />
				{easeFunction}
			</label>
			<br />
		{/each}
	</div>
	<br />

	<h2>Custom interval</h2>
	<AnimatedCounter direction="up" initialValue={'2002'} values={yearsValues} interval={500} />

	<br />

	<h1>contrubite 🚧</h1>

	<p>Feel free to fork. If you find a bug or got something great to add make a pull request!</p>

	<h1>Authors ✒️</h1>
	<p>
		<strong> Benzara Tahar Benlahcene </strong> [benzara-tahar]
		<br />
		<br />

		You can also look at the list of all the contributors who have participated in this project.
	</p>

	<a href="https://github.com/benzara-tahar/@benzara-svelte-animated-counter">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="white"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="hover:stroke-slate-100"
			><path
				class="text-red"
				d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
			/></svg
		>
	</a>
</section>

<style>
	section {
		display: flex;
		justify-items: start;
		flex-direction: column;
		align-items: flex-start;
		font-size: 1.2em;
		padding: 1em 2em;
		color: rgb(161, 161, 161);
	}
	h1 {
		font-size: 2em;
		font-weight: bold;
		color: orange;
		margin: 0;
	}

	h2 {
		font-size: 1em;
		font-weight: 400;
		margin-top: 1em;
		margin-bottom: 0.5em;
		color: rgb(255, 255, 255);
	}

	.skills {
		display: flex;
		justify-items: start;
		align-items: center;
		flex-wrap: wrap;
	}
	:global(.custom-counter) {
		display: inline-block;
		border: 2px solid rgb(12, 12, 12);
		background-color: rgb(54, 54, 54);
		color: white;
		border-radius: 10px;
		padding: 0.5rem 2rem;
		text-align: center;
	}

	:global(.custom-skill) {
		display: inline-block;
		/* border-bottom: 2px solid red; */
		color: orange;
		padding: 0.5rem;
		text-align: center;
	}
</style>
