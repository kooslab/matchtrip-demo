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

	const pricingPlans = [
		{
			name: 'Requirements Sprint',
			price: '1,000',
			duration: '1 week',
			deliverables: [
				'Comprehensive requirements document',
				'Technical specification outline',
				'Development cost estimation guide',
				'2 revision rounds',
				'Agency evaluation criteria'
			]
		},
		{
			name: 'Requirements Sprint',
			price: '1,000',
			duration: '1 week',
			deliverables: [
				'Comprehensive requirements document',
				'Technical specification outline',
				'Development cost estimation guide',
				'2 revision rounds',
				'Agency evaluation criteria'
			]
		},
		{
			name: 'Requirements Sprint',
			price: '1,000',
			duration: '1 week',
			deliverables: [
				'Comprehensive requirements document',
				'Technical specification outline',
				'Development cost estimation guide',
				'2 revision rounds',
				'Agency evaluation criteria'
			]
		}
	];
</script>

<div class="container space-y-16 py-12">
	<div class="space-y-6">
		<h1 class="text-4xl font-bold tracking-tighter text-foreground md:text-5xl lg:text-6xl">
			Bridge the Gap Between Your Vision and Technical Reality
		</h1>
		<p class="text-xl text-muted-foreground md:w-[80%]">
			Ready to build your software but struggling to communicate with development teams? We help
			non-technical leaders get their projects right from the start.
		</p>
		<div class="flex flex-col gap-4 pt-4 sm:flex-row">
			<Button size="lg" class="rounded-full">
				Schedule Consultation
				<ArrowRightIcon size={18} class="ml-2" />
			</Button>
			<Button size="lg" variant="outline" class="rounded-full">View Services</Button>
		</div>
	</div>

	<div class="space-y-8 rounded-lg bg-muted/30 p-8">
		<h2 class="text-3xl font-semibold">The Challenge You're Facing</h2>
		<div class="space-y-4 text-lg text-muted-foreground">
			<p>
				You have a clear business vision and budget for your software project. But there's a catch:
			</p>
			<ul class="list-disc space-y-2 pl-6">
				<li>Multiple development agencies are giving you different quotes</li>
				<li>You're not sure if their proposals align with your actual needs</li>
				<li>There's no technical expert on your team to validate their approach</li>
				<li>Each agency meeting feels like starting from scratch</li>
			</ul>
		</div>
	</div>

	<div class="space-y-8">
		<h2 class="text-3xl font-semibold">The Solution: Professional Requirements Engineering</h2>
		<p class="text-xl text-muted-foreground">
			In just one week, we'll transform your business vision into a clear, comprehensive software
			requirements document that both you and developers can understand.
		</p>

		<div class="space-y-8">
			<h2 class="text-3xl font-semibold">Our Expertise</h2>
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
			<h2 class="text-3xl font-semibold">Comprehensive Services</h2>
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

	<div class="space-y-8">
		<h2 class="text-3xl font-semibold">Success Stories</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each testimonials as testimonial}
				<Card.Root class="bg-background">
					<Card.Content class="pt-6">
						<p class="mb-4 text-lg italic text-muted-foreground">"{testimonial.quote}"</p>
						<div class="space-y-1">
							<p class="font-semibold">{testimonial.author}</p>
							<p class="text-sm text-muted-foreground">{testimonial.role}</p>
							<p class="text-sm text-muted-foreground">{testimonial.company}</p>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>

	<div class="space-y-8">
		<h2 class="text-3xl font-semibold">Simple, Transparent Pricing</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each pricingPlans as plan}
				<Card.Root class="max-w-md">
					<Card.Header>
						<Card.Title class="text-2xl">{plan.name}</Card.Title>
						<div class="text-4xl font-bold">${plan.price}</div>
						<p class="text-muted-foreground">Completed in {plan.duration}</p>
					</Card.Header>
					<Card.Content>
						<ul class="space-y-2">
							{#each plan.deliverables as item}
								<li class="flex items-center gap-2">
									<div class="h-1.5 w-1.5 rounded-full bg-primary" />
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</Card.Content>
					<Card.Footer>
						<Button class="w-full rounded-full">Schedule a Call</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>
