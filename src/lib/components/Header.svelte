<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.ts';
	import { cn } from '$lib/utils.ts';
	import type { HTMLAttributes } from 'svelte/elements';

	export let headerItems: { id: number; title: string; href: string }[];

	type HeaderListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
	};
</script>

{#snippet HeaderListItem({ title, href, class: className, ...restProps }: HeaderListItemProps)}
	<NavigationMenu.Item>
		<NavigationMenu.Link>
			{#snippet child()}
				<a
					{href}
					class={cn(
						'block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...restProps}
				>
					<div class="text-sm leading-none font-medium">{title}</div>
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</NavigationMenu.Item>
{/snippet}

<NavigationMenu.Root>
	<NavigationMenu.List>
		{#each headerItems as item, i (i)}
			{@render HeaderListItem({ title: item.title, href: item.href })}
		{/each}
	</NavigationMenu.List>
</NavigationMenu.Root>
