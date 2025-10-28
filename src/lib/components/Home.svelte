<script lang="ts">
	import * as Item from '$lib/components/ui/item/index.ts';
	import { SquareTerminal } from '@lucide/svelte';

	export let personal;
</script>

<div class="grid text-center">
	<h1>Hi, I'm Spencer Smith</h1>
	<span>{personal.role} from {personal.location}</span>
	<p>
		Welcome to my portfolio website! I made this site using Sveltekit for the first time and have
		taken some insipration from some other super talented folks around the internet. Here, you can
		learn a little more <a href="/about">about</a> me, check out some of my
		<a href="/projects">projects</a>
		or send me a <a href="/contact">shout</a> with whatever you are thinking about!
	</p>
	<p>
		Don't forget to click the button below to hack around on a psuedo terminal with some of my
		favorite TUI's I've built!
	</p>
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
	span {
		font-size: 1.5em;
		color: var(--gray);
		display: block;
		margin-top: 10px;
	}
	p {
		margin-bottom: 2rem;
	}
</style>
