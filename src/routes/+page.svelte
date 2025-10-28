<script lang="ts">
	import DATA from '../data/data.ts';
	import Home from '$lib/components/Home.svelte';
</script>

<div class="grid w-[70%] place-self-center">
	<Home personal={DATA.PERSONAL} />
</div>
