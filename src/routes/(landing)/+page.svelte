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

	const features = [
		{
			icon: DocumentIcon,
			title: 'Requirements Engineering',
			description:
				'Comprehensive requirements gathering, analysis, and documentation. We transform business needs into clear, actionable technical specifications.'
		},
		{
			icon: ProcessIcon,
			title: 'Process Optimization',
			description:
				'Streamline your software development lifecycle with our requirements management expertise and industry best practices.'
		},
		{
			icon: TeamIcon,
			title: 'Requirements Consulting',
			description:
				'Expert guidance in Agile methodologies, user story creation, and backlog management for optimal project outcomes.'
		}
	];

	const services = [
		{
			title: 'Requirements Documentation',
			points: [
				'Detailed functional & non-functional requirements',
				'User story mapping and refinement',
				'Technical specification documents',
				'System architecture documentation'
			]
		},
		{
			title: 'Requirements Management',
			points: [
				'Backlog organization and prioritization',
				'Requirements traceability matrices',
				'Change management processes',
				'Stakeholder communication plans'
			]
		}
	];

	const testimonials = [
		{
			quote:
				'The requirements document we got was worth every penny. We saved weeks of back-and-forth with developers and probably thousands in development costs.',
			author: 'Sarah Chen',
			role: 'COO, TechStart Solutions',
			company: 'Series A Startup'
		},
		{
			quote:
				'Finally, someone who could speak both business and tech! They helped us avoid costly misunderstandings before they happened.',
			author: 'Michael Rodriguez',
			role: 'Operations Director',
			company: 'Healthcare Innovation Inc.'
		}
	];

	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'ko', name: '한국어' }
	];

	function switchLanguage(langCode: string) {
		locale.set(langCode);
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="space-y-6 text-center">
		<h1 class="text-4xl font-bold tracking-tighter text-foreground md:text-5xl lg:text-6xl">
			{$_('hero.title')}
		</h1>
		<p class="mx-auto text-xl text-muted-foreground md:w-[80%]">
			{$_('hero.description')}
		</p>
		<div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
			<Button size="lg" class="hover:bg-primary-dark rounded-full bg-primary">
				{$_('buttons.scheduleConsultation')}
				<ArrowRightIcon size={18} class="ml-2" />
			</Button>
			<Button
				variant="outline"
				class="hover:bg-primary-light rounded-full border-primary text-primary"
			>
				{$_('buttons.viewServices')}
			</Button>
		</div>
	</div>

	<div class="mt-12 space-y-8 rounded-lg bg-muted/30 p-8 text-3xl">
		<h2 class="text-center text-4xl font-semibold">{$_('challenge.title')}</h2>
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

	<div class="mt-12 space-y-8">
		<h2 class="text-center text-4xl font-semibold">
			{$_('solution.title')}
		</h2>
		<p class="text-center text-2xl text-muted-foreground">
			{$_('solution.description')}
		</p>

		<div class="space-y-8">
			<h2 class="text-center text-3xl font-semibold">Our Expertise</h2>
			<div class="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature}
					<Card.Root class="bg-gradient-to-t from-muted to-muted/60 shadow-lg">
						<Card.Header>
							<div class="mb-4 inline-block rounded-full bg-primary/10 p-3 text-primary">
								<svelte:component this={feature.icon} size={24} />
							</div>
							<Card.Title class="text-xl text-foreground">
								{feature.title}
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-muted-foreground">
								{feature.description}
							</p>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		</div>

		<div class="mt-12 space-y-8">
			<h2 class="text-center text-3xl font-semibold">Comprehensive Services</h2>
			<div class="grid gap-8 md:grid-cols-2">
				{#each services as service}
					<div class="space-y-4">
						<h3 class="text-xl font-semibold">{service.title}</h3>
						<ul class="space-y-2">
							{#each service.points as point}
								<li class="flex items-center gap-2">
									<div class="h-1.5 w-1.5 rounded-full bg-primary" />
									<span class="text-muted-foreground">{point}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-12 space-y-8">
		<h2 class="text-center text-3xl font-semibold">{$_('testimonials.title')}</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each [1, 2] as i}
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

	<div class="mt-12 space-y-8">
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
