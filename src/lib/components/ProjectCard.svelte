<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.ts';

	export let title: String;
	export let description: String;
	export let content: String;
	export let tech: String[];

	function techHash(array: String[]) {
		let footer = '';
		array.forEach((hash) => {
			footer += `#${hash} `;
		});
		return footer;
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>{content}</p>
	</Card.Content>
	<Card.Footer>
		<p>{techHash(tech)}</p>
	</Card.Footer>
</Card.Root>
