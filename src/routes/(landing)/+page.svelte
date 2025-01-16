<script lang="ts">
	import { enhance } from '$app/forms';
	import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';
	import DocumentIcon from 'lucide-svelte/icons/file-text';
	import ProcessIcon from 'lucide-svelte/icons/git-branch';
	import TeamIcon from 'lucide-svelte/icons/users';
	import { CheckCircle } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';

	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';

	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'ko', name: '한국어' }
	];

	function switchLanguage(langCode: string) {
		locale.set(langCode);
	}

	const icons = [DocumentIcon, ProcessIcon, TeamIcon];
	console.log($_('expertise.features'));
</script>

<div class="container mx-auto px-2 py-8 sm:px-4">
	<div class="text-center">
		<div
			class="mb-4 space-y-2 text-4xl font-bold tracking-tighter text-foreground sm:mb-12 md:text-5xl lg:text-6xl"
		>
			<h1>
				{$_('hero.title_01')}
			</h1>
			<h1>
				{$_('hero.title_02')}
			</h1>
		</div>
		<p class="mx-auto mb-4 text-2xl text-muted-foreground sm:mb-8">
			{$_('hero.description')}
		</p>
		<div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
			<a href="https://tally.so/r/waGeNy" target="_blank" rel="noopener noreferrer">
				<Button size="lg" class="hover:bg-primary-dark rounded-full bg-primary">
					{$_('buttons.scheduleConsultation')}
					<ArrowRightIcon size={18} class="ml-2" />
				</Button>
			</a>
			<a
				href="https://featpaper.com/l/wuT4zv29rKBK"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:bg-primary-light inline-block rounded-full border-primary px-4 py-2 text-center text-primary"
			>
				{$_('buttons.viewServices')}
			</a>
		</div>
	</div>

	<div class="mt-12 space-y-8 rounded-lg bg-muted/30 p-2 sm:p-8">
		<h2 class="text-center text-3xl font-semibold">{$_('challenge.title')}</h2>
		<div class="space-y-2 text-muted-foreground">
			<p class="mb-4 sm:px-12">{$_('challenge.intro')}</p>
			<ul class="list-disc space-y-2 pl-4 sm:pl-12">
				{#each [1, 2, 3, 4] as i}
					<li class="flex items-center">
						<CheckCircle class="mr-2 text-primary" size={20} />
						<span>{$_(`challenge.points.${i}`)}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div id="services" class="mt-12 space-y-8">
		<h2 class="text-center text-3xl font-semibold">
			{$_('solution.title')}
		</h2>
		<p class="text-center text-xl text-muted-foreground">
			{$_('solution.description')}
		</p>
		<img
			src="/img/sample_requirement.png"
			alt="requirement"
			class="mx-auto max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[800px]"
		/>

		<div class="mt-12 space-y-8">
			<h2 class="text-center text-3xl font-semibold">{$_('services.title')}</h2>
			<div class="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each $_('services.features') as feature: { title: string, description: string }, index}
					<Card.Root class="bg-gradient-to-t from-muted to-muted/60 shadow-lg">
						<Card.Header>
							<div class="mb-4 inline-block flex rounded-full bg-primary/10 p-3 text-primary">
								<svelte:component this={icons[index]} size={24} class="mr-2" />
								<Card.Title class="text-xl text-foreground">{feature.title}</Card.Title>
							</div>
						</Card.Header>
						<Card.Content>
							<ul class="space-y-2">
								{#each feature.points as point}
									<li class="flex items-center gap-2">
										<div class="h-1.5 w-1.5 rounded-full bg-primary" />
										<span class="text-muted-foreground">{point}</span>
									</li>
								{/each}
							</ul>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-12 space-y-8">
		<h2 class="text-center text-3xl font-semibold">{$_('testimonials.title')}</h2>
		<div class="grid gap-6 md:grid-cols-4">
			{#each [1, 2, 3, 4] as i}
				<Card.Root class="bg-background shadow-md">
					<Card.Content class="pt-6">
						<p class="mb-4 text-lg italic text-muted-foreground">
							"{$_(`testimonials.reviews.${i}.quote`)}"
						</p>
						<div class="space-y-1">
							<p class="font-semibold">{$_(`testimonials.reviews.${i}.author`)}</p>
							<p class="text-sm text-muted-foreground">{$_(`testimonials.reviews.${i}.role`)}</p>
							<p class="text-sm text-muted-foreground">{$_(`testimonials.reviews.${i}.company`)}</p>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>

	<div id="pricing" class="mt-12 space-y-8">
		<h2 class="text-center text-3xl font-semibold">{$_('pricing.title')}</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each ['starter', 'basic', 'professional'] as plan}
				<Card.Root class="max-w-md shadow-lg">
					<Card.Header>
						<Card.Title class="text-2xl">{$_(`pricing.plans.${plan}.name`)}</Card.Title>
						<div class="text-4xl font-bold">{$_(`pricing.plans.${plan}.price`)}</div>
						<p class="text-muted-foreground">{$_(`pricing.plans.${plan}.duration`)}</p>
					</Card.Header>
					<Card.Content>
						<ul class="space-y-2">
							{#each $_(`pricing.plans.${plan}.features`) as feature}
								<li class="flex items-center gap-2">
									<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					</Card.Content>
					<Card.Footer>
						<Button class="w-full rounded-full bg-primary">{$_('pricing.cta')}</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>

<div class="fixed bottom-4 right-4 flex gap-2 rounded-lg bg-background/80 p-2 backdrop-blur">
	{#each languages as lang}
		<Button
			variant="ghost"
			size="sm"
			class={$locale === lang.code ? 'bg-primary/20' : ''}
			onclick={() => switchLanguage(lang.code)}
		>
			{lang.name}
		</Button>
	{/each}
</div>
