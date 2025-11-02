<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article class="mx-auto grid w-[90%]">
	<header>
		<h1 id="title">{data.metadata.title}</h1>
		<p id="description">{data.metadata.description}</p>
		<div id="tech-stack">
			{#each data.metadata.tech as tech}
				<span class="mr-0.5 block rounded-md bg-gray-300 p-0.5">{tech}</span>
			{/each}
		</div>
	</header>

	<div class="markdown grid">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	.markdown :global(h2) {
		font-size: 1.875rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		margin-top: 1rem;
		color: #111827;
	}

	.markdown :global(h3) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		color: #1f2937;
	}

	.markdown :global(p) {
		line-height: 1.75;
		margin-bottom: 1.2rem;
		color: #374151;
		font-size: 1.0625rem;
	}

	.markdown :global(ul),
	.markdown :global(ol) {
		margin-bottom: 1.2rem;
		padding-left: 1.75rem;
	}

	.markdown :global(li) {
		margin-bottom: 0.5rem;
		line-height: 1.75;
		color: #374151;
	}

	.markdown :global(ul) {
		list-style-type: disc;
	}

	.markdown :global(strong) {
		font-weight: 600;
		color: #111827;
	}

	.markdown :global(code) {
		background: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
		font-family: ui-monospace, monospace;
	}
</style>
