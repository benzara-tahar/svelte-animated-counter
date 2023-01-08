<script>
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	// codeblack highlighting
	import hljs from 'highlight.js';
	import 'highlight.js/styles/lioshi.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import AnimatedCounter from '$lib/AnimatedCounter.svelte';
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<AnimatedCounter
					values={['svelte', 'animated', 'counter']}
					direction="up"
					interval={2000}
					class="text-xl font-bold"
				/>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm btn-ghost-surface"
					href="https://github.com/benzara-tahar/svelte-animated-counter"
					target="_blank"
					rel="noreferrer">GitHub</a
				>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="footer">
		<div class="flex items-center justify-center p-4">
			<p>
				Demo made with <a target="_blank" rel="noreferrer" href="https://skeleton.dev">
					skeleton.dev 💀</a
				>
			</p>
		</div>
	</svelte:fragment>
</AppShell>
