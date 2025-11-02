<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	const projects = [
		{
			slug: 'rag-system',
			caseStudy: true,
			title: 'Document Intelligence System',
			description: 'AI augmented data retrival system',
			brief:
				'A production RAG system for financial document processing. Focus on efficient and repeatable outcomes for essential data ',
			tech: ['Azure-Foundry', 'React', 'Java', 'Apache-Lucene']
		},
		{
			slug: 'qa-system',
			caseStudy: true,
			title: 'Quailty Assurance System',
			description:
				'A centralized quality control platform that aggregates loan data from multiple sources to streamline the QA phase of loan origination.',
			brief:
				'Software designed to centralize data points from differant sources to assit in the quality control phase of loan origination.',
			tech: ['React', 'Java', 'SOAP']
		},
		{
			slug: 'card-search',
			caseStudy: true,
			title: 'Terminal Card Search Program',
			description: 'Termianl based program to search for deatailed information on trading cards',
			brief:
				'A simple to use TUI for the treminal enthusiist to search for hobby cards and games like Magic: The Gathering.',
			tech: ['Golang', 'Bubble-Tea', 'REST-Api']
		}
	];
</script>

<div class="grid place-items-center">
	<div class="grid w-[90%] grid-cols-3 gap-4">
		{#each projects as project}
			<ProjectCard
				slug={project.slug}
				title={project.title}
				description={project.description}
				tech={project.tech}
				brief={project.brief}
				caseStudy={project.caseStudy}
			/>
		{/each}
	</div>
</div>
