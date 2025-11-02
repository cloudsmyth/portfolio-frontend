<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.ts';
	import Button from './ui/button/button.svelte';
	import { ChevronRight } from 'lucide-svelte';

	export let slug: String;
	export let title: String;
	export let description: String;
	export let brief: String;
	export let tech: String[];
	export let caseStudy: Boolean;

	const HREF = '/project/' + slug;

	function techHash(array: String[]) {
		let footer = '';
		array.forEach((hash) => {
			footer += `#${hash} `;
		});
		return footer;
	}
</script>

<Card.Root class="grid grid-rows-3">
	<Card.Header>
		<Card.Title>{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>{brief}</p>
		{#if caseStudy}
			<Button href={HREF} class="mt-4">Read Case Study <ChevronRight /></Button>
		{/if}
	</Card.Content>
	<Card.Footer class="self-end">
		<p>{techHash(tech)}</p>
	</Card.Footer>
</Card.Root>
