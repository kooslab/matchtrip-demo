<script lang="ts">
	import { enhance } from '$app/forms';
	import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';
	import DocumentIcon from 'lucide-svelte/icons/file-text';
	import ProcessIcon from 'lucide-svelte/icons/git-branch';
	import TeamIcon from 'lucide-svelte/icons/users';

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
</script>

<div class="container space-y-16 py-12">
	<div class="space-y-6">
		<h1 class="text-4xl font-bold tracking-tighter text-foreground md:text-5xl lg:text-6xl">
			Transform Your Software Requirements into Success
		</h1>
		<p class="text-xl text-muted-foreground md:w-[70%]">
			Expert software requirements consulting and documentation services that bridge the gap between
			business vision and technical execution.
		</p>
		<div class="flex flex-col gap-4 pt-4 sm:flex-row">
			<Button size="lg" class="rounded-full">
				Schedule Consultation
				<ArrowRightIcon size={18} class="ml-2" />
			</Button>
			<Button size="lg" variant="outline" class="rounded-full">View Services</Button>
		</div>
	</div>

	<div class="space-y-8">
		<h2 class="text-3xl font-semibold tracking-tighter text-foreground">Our Expertise</h2>
		<div class="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<Card.Root class="bg-gradient-to-t from-muted to-muted/60">
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

	<div class="space-y-8">
		<h2 class="text-3xl font-semibold tracking-tighter text-foreground">Comprehensive Services</h2>
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
