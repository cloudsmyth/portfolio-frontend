<script lang="ts">
	import DATA from '../../data/data.ts';
	import Project from '$lib/components/Projects.svelte';
</script>

<div class="grid place-items-center">
	<div class="grid w-[90%] grid-cols-3 gap-4">
		<Project projects={DATA.PROJECTS} />
	</div>
</div>
