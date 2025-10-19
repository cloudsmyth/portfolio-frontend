<script lang="ts">
	import '../app.css';
	import DATA from '../data/data';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="layout grid min-h-screen grid-rows-[auto_1fr_auto]">
	<div class="header">
		<Header headerItems={DATA.NAVLIST} />
	</div>
	<main class="grid">
		<slot />
	</main>
	<div class="footer">
		<Footer job={DATA.PERSONAL} />
	</div>
</div>

<style>
	.layout {
		width: 70%;
		margin: 0 auto;
	}
	@media (max-width: 768px) {
		.layout {
			width: 90%;
		}
	}
</style>
