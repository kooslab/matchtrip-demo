<script lang="ts">
	import { enhance } from '$app/forms';
	import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';
	import DocumentIcon from 'lucide-svelte/icons/file-text';
	import ProcessIcon from 'lucide-svelte/icons/git-branch';
	import TeamIcon from 'lucide-svelte/icons/users';
	import { CheckCircle } from 'lucide-svelte';

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
			name: 'Starter',
			price: '100',
			duration: '45 minutes remote video call',
			deliverables: [
				'SW development process overview',
				'User Story based SW requirement template',
				'Outsourcing 101 guide',
				'Checklist for SW requirements'
			],
			extra: 'Will be deducted when choosing Requirements Sprint'
		},
		{
			name: 'Basic',
			price: '1,000',
			duration: '1 week',
			deliverables: [
				'Everything in Problem Define Session',
				'1 day on/offline user story workshop',
				'User Story based SW requirement including 2 revision rounds',
				'System Architecture draft',
				'Development Cost Estimation',
				'Agency evaluation criteria'
			],
			extra: 'Will be deducted when choosing Professional Service'
		},
		{
			name: 'Professional',
			price: '4,000',
			duration: '6 weeks',
			deliverables: [
				'Everything in Basic Service',
				'SW Requirement Management during development',
				'UI wireframe',
				'System Architecture',
				'DevOps Consulting',
				'Development Cost Estimation',
				'Development agency evaluation in partnership'
			],
			extra: 'Duration and price is subject to change based on the project size'
		}
	];
</script>

<div class="container mx-auto px-4 py-8">
	<div class="space-y-6 text-center">
		<h1 class="text-4xl font-bold tracking-tighter text-foreground md:text-5xl lg:text-6xl">
			Bridge the Gap Between Your Vision and Technical Reality
		</h1>
		<p class="mx-auto text-xl text-muted-foreground md:w-[80%]">
			Ready to build your software but struggling to communicate with development teams? We help
			non-technical leaders get their projects right from the start.
		</p>
		<div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
			<Button size="lg" class="hover:bg-primary-dark rounded-full bg-primary">
				Schedule Consultation
				<ArrowRightIcon size={18} class="ml-2" />
			</Button>
			<Button
				size="lg"
				variant="outline"
				class="hover:bg-primary-light rounded-full border-primary text-primary"
			>
				View Services
			</Button>
		</div>
	</div>

	<div class="mt-12 space-y-8 rounded-lg bg-muted/30 p-8 text-3xl">
		<h2 class="text-center text-4xl font-semibold">The Challenge You're Facing</h2>
		<div class="space-y-2 text-muted-foreground">
			<p class="mb-4 sm:px-12">
				You have a clear business vision and budget for your software project. But there's a catch:
			</p>
			<ul class="list-disc space-y-2 pl-4 sm:pl-12">
				<li class="flex items-center">
					<CheckCircle class="mr-2 text-primary" size={20} />
					<span>Multiple development agencies are giving you different quotes</span>
				</li>
				<li class="flex items-center">
					<CheckCircle class="mr-2 text-primary" size={20} />
					<span>You're not sure if their proposals align with your actual needs</span>
				</li>
				<li class="flex items-center">
					<CheckCircle class="mr-2 text-primary" size={20} />
					<span>There's no technical expert on your team to validate their approach</span>
				</li>
				<li class="flex items-center">
					<CheckCircle class="mr-2 text-primary" size={20} />
					<span>Each agency meeting feels like starting from scratch</span>
				</li>
			</ul>
		</div>
	</div>

	<div class="mt-12 space-y-8">
		<h2 class="text-center text-4xl font-semibold">
			Our Solution: Your SW Requirements Expert, Right By Your Side
		</h2>
		<p class="text-center text-2xl text-muted-foreground">
			In just one week, we'll transform your business vision into a clear, comprehensive software
			requirements document that both you and developers can understand.
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
		<h2 class="text-center text-3xl font-semibold">Customer Reviews</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each testimonials as testimonial}
				<Card.Root class="bg-background shadow-md">
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

	<div class="mt-12 space-y-8">
		<h2 class="text-center text-3xl font-semibold">Pricing</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each pricingPlans as plan}
				<Card.Root class="max-w-md shadow-lg">
					<Card.Header>
						<Card.Title class="text-2xl">{plan.name}</Card.Title>
						<div class="text-4xl font-bold">
							{plan.price === 'Contact Us' ? plan.price : `$${plan.price}`}
						</div>
						<p class="text-muted-foreground">Completed in {plan.duration}</p>
					</Card.Header>
					<Card.Content>
						<ul class="space-y-2">
							{#each plan.deliverables as item}
								<li class="flex items-center gap-2">
									<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
									<span>{item}</span>
								</li>
							{/each}
							{#if plan.extra}
								<li class="flex items-center gap-2">
									<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
									<span>{plan.extra}</span>
								</li>
							{/if}
						</ul>
					</Card.Content>
					<Card.Footer>
						<Button class="w-full rounded-full bg-primary">Schedule a Call</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>
