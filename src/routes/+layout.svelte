<script lang="ts">
	import '../app.css';
	import DATA from '../data/data';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
</script>

<Toaster />
<div class="layout grid min-h-screen grid-rows-[auto_1fr_auto]">
	<div class=" grid w-[70%] place-self-center">
		<Header headerItems={DATA.NAVLIST} />
	</div>
	<main class="grid">
		<slot />
	</main>
	<div class="grid w-full place-self-center">
		<Footer job={DATA.PERSONAL} />
	</div>
</div>

<style>
	.layout {
		margin: 0 auto;
	}
</style>
