<script lang="ts">
	import * as Item from '$lib/components/ui/item/index.ts';
	import { SquareTerminal } from '@lucide/svelte';

	export let personal;
</script>

<div class="grid text-center">
	<h1>Hi, I'm Spencer Smith</h1>
	<span>{personal.role} from {personal.location}</span>
	<p>{personal.intro}</p>
	<Item.Root class="w-80 justify-self-center text-justify" variant="outline">
		{#snippet child({ props })}
			<a href="/terminal" {...props}>
				<Item.Content>
					<Item.Title>Terminal</Item.Title>
					<Item.Description>Some fun terminal apps await!</Item.Description>
				</Item.Content>
				<Item.Actions><SquareTerminal class="size-6" /></Item.Actions>
			</a>
		{/snippet}
	</Item.Root>
</div>

<style>
	:root {
		--white: #f8f9fa;
		--black: #020617;
		--slate-black: #1e293b;
		--gray: #64748b;
		--light-gray: rgb(203 213 225);
		--dark-grayish-blue: #334155;
		--accent-color: #007bff;
	}
	h1 {
		margin: 0;
		font-size: 2.5em;
		color: var(--black);
		font-family: 'Work Sans', sans-serif;
	}
	span {
		font-size: 1.5em;
		color: var(--gray);
		display: block;
		margin-top: 10px;
	}
	p {
		font-family: 'Work Sans', sans-serif;
		margin-bottom: 2rem;
	}
</style>
