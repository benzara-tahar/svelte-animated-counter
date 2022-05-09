<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import CountDown from '$lib/CountDown.svelte';

	let intValues = Array.from({ length: 10 }, (_, i) => new String(i).padStart(2, '0'));
	let shortMonthsValues = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	let longMonthValues = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	let yearsValues = Array.from({ length: 122 }, (_, i) => (1900 + i).toString());
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Int Values</h1>
	<CountDown values={intValues} />
	<h1>ShortMonths Values</h1>
	<CountDown direction="up" values={shortMonthsValues} />
	<h1>LongMonth Values</h1>
	<CountDown values={longMonthValues} />
	<h1>Years Values</h1>
	<CountDown initialValue={'2002'} direction="up" values={yearsValues} />
	<h1>Custom Style</h1>
	<CountDown className="custom-counter" initialValue={'2002'} direction="up" values={yearsValues} />
</section>

<style>
	section {
		display: flex;
		justify-items: start;

		flex-direction: column;
		align-items: flex-start;
		font-size: 1.5em;
		padding: 1em;
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
</style>
