<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription,
		CardFooter
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { CheckIcon } from 'lucide-svelte';
	import ThemeToggle from '$lib/components/theme-controller/theme-toggle.svelte';
	import { createClient } from '@supabase/supabase-js';
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

	const testimonials = [
		{
			quote:
				'We used their user stories and acceptance criteria in our RFP. The quotes we got back were so much easier to compare—and we ended up saving thousands!',
			name: 'Maria L.',
			title: 'Startup Founder',
			avatar: 'https://github.com/shadcn.png'
		},
		{
			quote:
				'Their Premium Package was a lifesaver. The lo-fi wireframes helped our team visualize user flow, and we knew exactly which outsourcing vendor to pick.',
			name: 'Thomas K.',
			title: 'IT Director',
			avatar: 'https://github.com/shadcn.png'
		}
	];

	let formData = {
		name: '',
		email: '',
		phone: '',
		projectOutline: '',
		privacyConsent: false,
		marketingConsent: false,
		website: ''
	};

	let isSubmitting = false;
	let submitError = '';
	let submitSuccess = false;

	async function handleSubmit() {
		isSubmitting = true;
		submitError = '';
		submitSuccess = false;

		if (formData.website) {
			submitSuccess = true;
			isSubmitting = false;
			return;
		}

		try {
			const { error } = await supabase.from('tickets').insert([
				{
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					content: formData.projectOutline,
					privacy_consent: formData.privacyConsent,
					marketing_consent: formData.marketingConsent
				}
			]);

			if (error) throw error;

			submitSuccess = true;
			formData = {
				name: '',
				email: '',
				phone: '',
				projectOutline: '',
				privacyConsent: false,
				marketingConsent: false,
				website: ''
			};
		} catch (error) {
			submitError = 'Failed to submit form. Please try again.';
			console.error('Form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="fixed right-4 top-4 z-50 hidden md:block">
	<ThemeToggle />
</div>

<div class="block md:hidden">
	<ThemeToggle />
</div>

<div class="bg-background">
	<!-- Hero Section -->
	<section class="bg-background py-24">
		<div class="container mx-auto px-4">
			<div class="space-y-4 text-center">
				<h1 class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
					Build the Right Software the First Time
					<span class="text-primary">—Starting at Just €499!</span>
				</h1>
				<p class="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
					Put an end to guesswork and misaligned budgets. Our expert-crafted requirements, user
					stories, and acceptance criteria empower you to launch successfully—or confidently compare
					multiple vendor quotes.
				</p>
				<div
					class="mx-auto mt-6 flex max-w-[58rem] flex-col gap-4 px-4 sm:flex-row sm:justify-center"
				>
					<Button
						size="lg"
						class="w-full sm:w-auto"
						onclick={() =>
							document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
					>
						Get Started at €499
					</Button>
					<Button
						size="lg"
						variant="outline"
						class="w-full sm:w-auto"
						onclick={() =>
							document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
					>
						Schedule Free Call
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Problem Statement Section -->
	<section class="bg-muted py-24">
		<div class="container mx-auto px-4">
			<Card class="mx-auto max-w-4xl">
				<CardHeader>
					<div class="border-b border-muted-foreground/20 pb-4">
						<p class="text-sm text-muted-foreground">INDUSTRY INSIGHTS</p>
						<CardTitle class="mt-2 font-serif text-4xl italic">
							Why Many Software Projects Stall or Fail
						</CardTitle>
						<p class="mt-2 text-sm text-muted-foreground">By Our Expert Team | Published Today</p>
					</div>
				</CardHeader>
				<CardContent class="grid gap-8 pt-6 md:grid-cols-2">
					<!-- Left Column: Main Content -->
					<div class="space-y-6">
						<p class="text-xl font-medium leading-relaxed">
							Every winning software product starts with a clear vision and well-defined
							requirements. Yet countless promising projects get stuck in limbo—or balloon in
							cost—because they begin without an actionable roadmap.
						</p>
						<p class="text-muted-foreground">
							Worse, even if you want to outsource development, how do you ensure each vendor is
							quoting the same scope?
						</p>
						<ul class="space-y-4">
							<li class="flex items-start gap-3">
								<Badge variant="outline" class="mt-1 shrink-0">1</Badge>
								<span class="text-sm"
									>Undefined Goals: Without documented needs, developers guess at functionality,
									wasting time and money.</span
								>
							</li>
							<li class="flex items-start gap-3">
								<Badge variant="outline" class="mt-1 shrink-0">2</Badge>
								<span class="text-sm"
									>Inconsistent or Incomplete RFQs: If you lack standardized requirements, vendor
									quotes may be all over the map—making it impossible to compare them fairly.</span
								>
							</li>
							<li class="flex items-start gap-3">
								<Badge variant="outline" class="mt-1 shrink-0">3</Badge>
								<span class="text-sm"
									>Frequent Scope Creep: Vague or shifting requirements result in never-ending
									additions, overshadowing timelines and budgets.</span
								>
							</li>
						</ul>
					</div>
					<!-- Right Column: Image -->
					<div class="order-first space-y-4 md:order-last">
						<div class="aspect-video w-full overflow-hidden rounded-lg bg-muted">
							<!-- Image placeholder -->
							<div class="flex h-full items-center justify-center text-muted-foreground">
								<p class="text-sm">Image Coming Soon</p>
							</div>
						</div>
						<p class="text-center text-sm text-muted-foreground">
							The frustration of lacking clarity in software projects often leads to confusion and
							costly mistakes.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	</section>

	<!-- True Cost Section -->
	<section class="bg-background py-24">
		<div class="container mx-auto px-4">
			<Card class="mx-auto max-w-4xl">
				<CardHeader class="border-b border-muted-foreground/20 pb-6">
					<div class="space-y-2">
						<p class="text-sm font-semibold text-destructive">CRITICAL BUSINESS RISKS</p>
						<CardTitle class="font-serif text-4xl">The Hidden Costs of Poor Requirements</CardTitle>
						<CardDescription class="max-w-[90%] text-xl text-muted-foreground">
							When requirements are fuzzy, your project doesn't just slow down—it bleeds money and
							erodes trust.
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent class="pt-8">
					<div class="grid gap-8 md:grid-cols-2">
						<!-- Left Column: Main Issues -->
						<div class="space-y-6">
							<div class="space-y-6">
								<div class="space-y-4">
									<div class="flex items-start gap-4">
										<div class="rounded-full bg-destructive/10 p-3">
											<Badge variant="destructive" class="h-8 w-8">!</Badge>
										</div>
										<div class="space-y-2">
											<h3 class="text-xl font-semibold">Rework & Endless Delays</h3>
											<p class="text-muted-foreground">
												Developers waste weeks building the wrong features, forcing costly rebuilds
												that could have been avoided with clear requirements.
											</p>
											<p class="text-sm font-semibold text-destructive">
												Typical Cost: €10,000-30,000 per major revision
											</p>
										</div>
									</div>

									<div class="flex items-start gap-4">
										<div class="rounded-full bg-destructive/10 p-3">
											<Badge variant="destructive" class="h-8 w-8">!</Badge>
										</div>
										<div class="space-y-2">
											<h3 class="text-xl font-semibold">Inflated Vendor Quotes</h3>
											<p class="text-muted-foreground">
												Agencies add 40-100% padding to protect against scope uncertainty, making
												your project significantly more expensive than necessary.
											</p>
											<p class="text-sm font-semibold text-destructive">
												Average Overpayment: 50-75% of project cost
											</p>
										</div>
									</div>

									<div class="flex items-start gap-4">
										<div class="rounded-full bg-destructive/10 p-3">
											<Badge variant="destructive" class="h-8 w-8">!</Badge>
										</div>
										<div class="space-y-2">
											<h3 class="text-xl font-semibold">Stakeholder Trust Crisis</h3>
											<p class="text-muted-foreground">
												As delays mount and costs spiral, stakeholder confidence
												plummets—potentially killing promising projects before completion.
											</p>
											<p class="text-sm font-semibold text-destructive">
												Project Failure Rate: 70% without proper requirements
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Right Column: Impact Summary -->
						<div class="space-y-6 rounded-xl bg-muted p-6">
							<h3 class="text-lg font-semibold">The Compounding Impact</h3>
							<div class="space-y-4">
								<div class="rounded-lg bg-background p-4">
									<p class="text-2xl font-bold text-destructive">€50,000+</p>
									<p class="text-sm text-muted-foreground">
										Average cost overrun for mid-sized projects with poor requirements
									</p>
								</div>
								<div class="rounded-lg bg-background p-4">
									<p class="text-2xl font-bold text-destructive">6-12 Months</p>
									<p class="text-sm text-muted-foreground">
										Typical project delay due to requirement-related issues
									</p>
								</div>
								<div class="rounded-lg bg-background p-4">
									<p class="text-2xl font-bold text-destructive">3x</p>
									<p class="text-sm text-muted-foreground">
										Higher maintenance costs due to poorly specified features
									</p>
								</div>
							</div>
							<div class="mt-6 rounded-lg bg-destructive/10 p-4">
								<p class="text-sm font-medium text-destructive">
									"The true cost of poor requirements isn't just money—it's lost market
									opportunities, damaged relationships, and exhausted teams."
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</section>

	<!-- Power of Requirements Section -->
	<section class="container space-y-6 bg-background py-8 dark:bg-transparent md:py-12 lg:py-24">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
			<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
				Give Your Project—and Your RFQs—a Critical Edge
			</h2>
			<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
				Clear, comprehensive requirements—bolstered by user stories and acceptance criteria—guide
				your team and enable accurate RFQs.
			</p>
		</div>

		<div class="mx-auto grid justify-center gap-8 sm:grid-cols-3 md:max-w-[64rem]">
			<!-- Apples-to-Apples Card -->
			<Card class="relative overflow-hidden">
				<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
				<CardHeader class="space-y-2">
					<div class="flex items-center gap-2">
						<Badge variant="secondary" class="bg-primary/10">Strategic Advantage</Badge>
					</div>
					<CardTitle>Apples-to-Apples RFQ Comparison</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="space-y-2">
						<p class="text-muted-foreground">
							Stop getting wildly different quotes. When every vendor sees identical user stories:
						</p>
						<ul class="space-y-2 text-sm">
							<li class="flex items-start gap-2">
								<CheckIcon class="mt-1 h-4 w-4 text-primary" />
								<span>Save 40-60% on development costs</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckIcon class="mt-1 h-4 w-4 text-primary" />
								<span>Compare vendor capabilities accurately</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckIcon class="mt-1 h-4 w-4 text-primary" />
								<span>Eliminate quote padding due to uncertainty</span>
							</li>
						</ul>
					</div>
					<div class="rounded-lg bg-muted p-3">
						<p class="text-sm font-medium">
							"We saved €15,000 by getting comparable quotes from different vendors."
						</p>
					</div>
				</CardContent>
			</Card>

			<!-- Transparent Scope Card -->
			<Card class="relative overflow-hidden">
				<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
				<CardHeader class="space-y-2">
					<div class="flex items-center gap-2">
						<Badge variant="secondary" class="bg-primary/10">Risk Mitigation</Badge>
					</div>
					<CardTitle>Crystal Clear Scope & Budget</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="space-y-2">
						<p class="text-muted-foreground">
							Detailed requirements eliminate costly surprises and protect your budget:
						</p>
						<ul class="space-y-2 text-sm">
							<li class="flex items-start gap-2">
								<CheckIcon class="mt-1 h-4 w-4 text-primary" />
								<span>Prevent 90% of scope creep issues</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckIcon class="mt-1 h-4 w-4 text-primary" />
								<span>Lock in precise feature costs</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckIcon class="mt-1 h-4 w-4 text-primary" />
								<span>Maintain control over project direction</span>
							</li>
						</ul>
					</div>
					<div class="rounded-lg bg-muted p-3">
						<p class="text-sm font-medium">
							"Requirements doc helped us stay within 5% of initial budget estimates."
						</p>
					</div>
				</CardContent>
			</Card>

			<!-- Confidence Card -->
			<Card class="relative overflow-hidden">
				<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
				<CardHeader class="space-y-2">
					<div class="flex items-center gap-2">
						<Badge variant="secondary" class="bg-primary/10">Quality Assurance</Badge>
					</div>
					<CardTitle>Guaranteed Deliverables</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="space-y-2">
						<p class="text-muted-foreground">
							Precise acceptance criteria ensure you get exactly what you need:
						</p>
						<ul class="space-y-2 text-sm">
							<li class="flex items-start gap-2">
								<CheckIcon class="mt-1 h-4 w-4 text-primary" />
								<span>Reduce revision cycles by 75%</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckIcon class="mt-1 h-4 w-4 text-primary" />
								<span>Verify feature quality objectively</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckIcon class="mt-1 h-4 w-4 text-primary" />
								<span>Hold vendors accountable to standards</span>
							</li>
						</ul>
					</div>
					<div class="rounded-lg bg-muted p-3">
						<p class="text-sm font-medium">
							"First time we got exactly what we wanted from developers."
						</p>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Bottom Stats -->
		<div class="mx-auto mt-12 grid max-w-[64rem] gap-8 sm:grid-cols-3">
			<div class="rounded-xl bg-primary/5 p-6 text-center">
				<p class="text-3xl font-bold text-primary">93%</p>
				<p class="mt-2 text-sm text-muted-foreground">
					of successful projects start with documented requirements
				</p>
			</div>
			<div class="rounded-xl bg-primary/5 p-6 text-center">
				<p class="text-3xl font-bold text-primary">4x</p>
				<p class="mt-2 text-sm text-muted-foreground">
					faster development with clear acceptance criteria
				</p>
			</div>
			<div class="rounded-xl bg-primary/5 p-6 text-center">
				<p class="text-3xl font-bold text-primary">€25k+</p>
				<p class="mt-2 text-sm text-muted-foreground">average savings on mid-sized projects</p>
			</div>
		</div>
	</section>

	<!-- Packages Section -->
	<section class="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
			<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
				Simple, Transparent Pricing
			</h2>
			<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
				Investment in requirements now saves 10x in development costs later
			</p>
		</div>

		<div class="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem]">
			<Card class="flex flex-col">
				<CardHeader>
					<CardTitle class="flex items-center justify-between">
						Essential Package
						<span class="text-3xl font-bold">€1,499</span>
					</CardTitle>
					<CardDescription>For Startups & MVPs</CardDescription>
				</CardHeader>
				<CardContent class="flex-1">
					<ul class="space-y-2">
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Detailed User Stories (up to 15)</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Core Features Documentation</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>User Flow Analysis</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>RFQ-Ready Requirements Doc</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>2 Revision Rounds</span>
						</li>
					</ul>
					<div class="mt-6 rounded-lg bg-muted p-4">
						<p class="text-sm text-muted-foreground">
							Perfect for projects with estimated development budgets of €20k-50k
						</p>
					</div>
				</CardContent>
				<CardFooter class="mt-auto pt-8">
					<Button
						class="w-full"
						onclick={() =>
							document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
					>
						Get Started
					</Button>
				</CardFooter>
			</Card>

			<Card class="relative flex flex-col">
				<div class="absolute -top-4 left-1/2 -translate-x-1/2">
					<Badge variant="secondary" class="px-6">Most Popular</Badge>
				</div>
				<CardHeader>
					<CardTitle class="flex items-center justify-between">
						Professional Package
						<span class="text-3xl font-bold">€2,999</span>
					</CardTitle>
					<CardDescription>For Established Businesses</CardDescription>
				</CardHeader>
				<CardContent class="flex-1">
					<ul class="space-y-2">
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Everything in Essential</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Extended User Stories (up to 30)</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Interactive Lo-Fi Wireframes</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Detailed Acceptance Criteria</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Development Cost Estimation</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>4 Revision Rounds</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Vendor Selection Guidance</span>
						</li>
					</ul>
					<div class="mt-6 rounded-lg bg-muted p-4">
						<p class="text-sm text-muted-foreground">
							Ideal for projects with estimated development budgets of €50k-200k
						</p>
					</div>
				</CardContent>
				<CardFooter class="mt-auto pt-8">
					<Button
						class="w-full"
						variant="secondary"
						onclick={() =>
							document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
					>
						Get Professional
					</Button>
				</CardFooter>
			</Card>
		</div>

		<!-- Enterprise Option -->
		<div class="mx-auto mt-12 max-w-[64rem] rounded-xl bg-muted p-8 text-center">
			<h3 class="text-2xl font-bold">Enterprise Solutions</h3>
			<p class="mt-2 text-muted-foreground">
				For complex projects with development budgets over €200k
			</p>
			<div class="mt-6 space-y-4">
				<p class="text-sm text-muted-foreground">
					Custom requirements gathering workshops, multiple stakeholder alignment sessions, and
					comprehensive technical specifications.
				</p>
				<Button
					variant="outline"
					onclick={() =>
						document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
				>
					Contact for Custom Quote
				</Button>
			</div>
		</div>

		<!-- Strategic Add-ons -->
		<div class="mx-auto mt-12 max-w-[64rem]">
			<h3 class="mb-6 text-center text-2xl font-bold">Strategic Add-ons</h3>
			<div class="grid gap-4 sm:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center justify-between">
							Technical Architecture
							<span class="text-xl font-bold">+€999</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">
							Detailed technical stack recommendations and architecture diagrams
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center justify-between">
							Vendor RFQ Management
							<span class="text-xl font-bold">+€799</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">
							We handle the RFQ process and provide detailed quote analysis
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center justify-between">
							Vendor Selection Review
							<span class="text-xl font-bold">+€1,000</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">
							In-depth review and comparison of each vendor proposal
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="container py-8 md:py-12 lg:py-24">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
			<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
				What Our Clients Say
			</h2>
			<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
				Don't just take our word for it
			</p>
		</div>

		<div class="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-2">
			{#each testimonials as testimonial}
				<Card class="flex flex-col justify-between">
					<CardHeader>
						<CardDescription class="text-lg">"{testimonial.quote}"</CardDescription>
					</CardHeader>
					<CardFooter>
						<div class="flex items-center gap-4">
							<Avatar>
								<AvatarImage src={testimonial.avatar} alt={testimonial.name} />
								<AvatarFallback>{testimonial.name[0]}</AvatarFallback>
							</Avatar>
							<div>
								<p class="text-sm font-medium leading-none">{testimonial.name}</p>
								<p class="text-sm text-muted-foreground">{testimonial.title}</p>
							</div>
						</div>
					</CardFooter>
				</Card>
			{/each}
		</div>
	</section>

	<!-- Bottom CTA Section -->
	<section class="container px-4 py-8 md:py-12 lg:py-24">
		<div class="mx-auto max-w-[58rem] space-y-8 text-center">
			<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
				Ready to Empower Your Project?
			</h2>
			<p class="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
				Stop letting guesswork stand in the way of your product's success.
			</p>
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
				<Button
					size="lg"
					class="w-full sm:w-auto"
					onclick={() =>
						document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
				>
					Get Started at €499
				</Button>
				<Button
					size="lg"
					variant="outline"
					class="w-full sm:w-auto"
					onclick={() =>
						document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
				>
					Schedule Free Call
				</Button>
			</div>
		</div>
	</section>

	<!-- Contact Form Section -->
	<section class="bg-muted py-24" id="contact-form">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-xl">
				<Card>
					<CardHeader>
						<CardTitle>Have Questions? Let's Talk.</CardTitle>
						<CardDescription>
							Our friendly consultants will guide you to the perfect requirements package for your
							project.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
							<div class="space-y-2">
								<Input type="text" placeholder="Name" bind:value={formData.name} required />
							</div>
							<div class="space-y-2">
								<Input type="email" placeholder="Email" bind:value={formData.email} required />
							</div>
							<div class="space-y-2">
								<Input type="tel" placeholder="Phone" bind:value={formData.phone} required />
							</div>
							<div class="space-y-2">
								<Textarea
									placeholder="Brief Project Outline"
									bind:value={formData.projectOutline}
									required
								/>
							</div>
							<div class="space-y-4">
								<div class="flex items-center space-x-2">
									<input
										type="checkbox"
										id="privacy-consent"
										bind:checked={formData.privacyConsent}
										class="h-4 w-4 rounded border-input"
										required
									/>
									<label for="privacy-consent" class="text-sm text-muted-foreground">
										I agree to the processing of my personal data according to the Privacy Policy *
									</label>
								</div>

								<div class="flex items-center space-x-2">
									<input
										type="checkbox"
										id="marketing-consent"
										bind:checked={formData.marketingConsent}
										class="h-4 w-4 rounded border-input"
									/>
									<label for="marketing-consent" class="text-sm text-muted-foreground">
										I would like to receive updates about products and services via email
									</label>
								</div>
							</div>
							<div class="hidden">
								<Input
									type="text"
									name="website"
									id="website"
									tabindex={-1}
									autocomplete="off"
									bind:value={formData.website}
								/>
							</div>
							{#if submitError}
								<p class="text-sm text-destructive">{submitError}</p>
							{/if}
							{#if submitSuccess}
								<div class="rounded-md bg-primary/10 p-4">
									<p class="text-center text-sm text-primary">
										Thank you for your submission! Our team will contact you shortly.
									</p>
								</div>
							{/if}
							<Button
								type="submit"
								class="w-full"
								disabled={isSubmitting || !formData.privacyConsent}
							>
								{isSubmitting ? 'Submitting...' : 'Submit'}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-background py-12">
		<div class="container mx-auto px-4 text-center">
			<p class="text-muted-foreground">
				"When you arm yourself with precise requirements, you empower your team, your stakeholders,
				and your future development partners to execute flawlessly."
			</p>
			<p class="mt-2 font-semibold">— Ilmo Koo, CEO at Kooslab</p>
		</div>
	</footer>
</div>
