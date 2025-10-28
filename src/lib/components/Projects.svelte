<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';

	export let projects;
</script>

{#each projects as project}
	<ProjectCard
		title={project.title}
		description={project.description}
		tech={project.tech}
		content={project.content}
	/>
{/each}
