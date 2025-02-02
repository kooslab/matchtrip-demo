<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import MenuIcon from 'lucide-svelte/icons/menu';
	import LogOutIcon from 'lucide-svelte/icons/log-out';
	import ChevronDownIcon from 'lucide-svelte/icons/chevron-down';

	import { ThemeToggle } from '@/components/theme-controller';
	import { buttonVariants } from '@/components/ui/button';
	import { Button } from '@/components/ui/button';
	import * as Sheet from '@/components/ui/sheet';
	import { Menu } from 'lucide-svelte';

	let { session } = $derived($page.data);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};
</script>

<Sheet.Root>
	<Sheet.Trigger asChild>
		<Button variant="ghost" size="icon" class="md:hidden">
			<Menu class="h-5 w-5" />
			<span class="sr-only">Toggle menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="w-[300px]">
		<Sheet.Header>
			<Sheet.Title class="text-left">Menu</Sheet.Title>
		</Sheet.Header>
		<nav class="flex flex-col gap-6 px-4 py-6">
			<button
				class="text-left text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
				onclick={() => {
					scrollToSection('services');
				}}
			>
				Services
			</button>
			<button
				class="text-left text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
				onclick={() => {
					scrollToSection('pricing');
				}}
			>
				Pricing
			</button>
			<a
				href="/blog"
				class="text-left text-lg font-medium text-foreground transition-colors hover:text-primary"
			>
				Blog
			</a>
		</nav>
	</Sheet.Content>
</Sheet.Root>
