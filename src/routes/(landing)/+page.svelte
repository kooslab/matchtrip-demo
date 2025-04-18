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
	import { CheckIcon, TriangleAlert } from 'lucide-svelte';
	import ThemeToggle from '$lib/components/theme-controller/theme-toggle.svelte';
	import { createClient } from '@supabase/supabase-js';
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	import RequirementsPreview from '$lib/components/ui/requirements-preview.svelte';

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

	const testimonials = [
		{
			quote:
				'We used their user stories and acceptance criteria in our RFP. The quotes we got back were so much easier to compare—and we ended up saving thousands!',
			name: 'Maria L.',
			title: 'Startup Founder',
			avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=MariaL&backgroundColor=b6e3f4'
		},
		{
			quote:
				'Their Premium Package was a lifesaver. The lo-fi wireframes helped our team visualize user flow, and we knew exactly which outsourcing vendor to pick.',
			name: 'Thomas K.',
			title: 'IT Director',
			avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=ThomasK&backgroundColor=c0aede'
		},
		{
			quote:
				'The requirements documentation was crystal clear. Our development team completed the project 30% faster than usual.',
			name: 'Sarah M.',
			title: 'Product Manager',
			avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=SarahM&backgroundColor=ffdfbf'
		},
		{
			quote:
				'Finally, a service that understands both business needs and technical requirements. Worth every penny!',
			name: 'James R.',
			title: 'CTO',
			avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=JamesR&backgroundColor=d1d4f9'
		},
		{
			quote:
				'The acceptance criteria they wrote helped us avoid countless revision cycles. Exceptional attention to detail.',
			name: 'Elena P.',
			title: 'Engineering Lead',
			avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=ElenaP&backgroundColor=b6e3f4'
		},
		{
			quote:
				'Their requirements package gave us the confidence to scale our project internationally. Absolutely professional service.',
			name: 'Michael C.',
			title: 'Global Operations Director',
			avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=MichaelC&backgroundColor=c0aede'
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

	// Add carousel logic
	let currentIndex = 0;
	let carouselContainer: HTMLElement;

	onMount(() => {
		const interval = setInterval(() => {
			if (carouselContainer) {
				const slideWidth = carouselContainer.offsetWidth;
				currentIndex = (currentIndex + 1) % testimonials.length;
				const offset = window.innerWidth >= 768 ? slideWidth / 2 : slideWidth;
				const newPosition = -currentIndex * offset;

				carouselContainer.style.transform = `translateX(${newPosition}px)`;

				// If we've reached the end of the original slides
				if (currentIndex === testimonials.length - 1) {
					// Wait for the transition to complete
					setTimeout(() => {
						// Reset to first slide without transition
						currentIndex = 0;
						carouselContainer.style.transition = 'none';
						carouselContainer.style.transform = 'translateX(0)';
						// Re-enable transition after reset
						setTimeout(() => {
							carouselContainer.style.transition = 'transform 0.5s ease-in-out';
						}, 50);
					}, 500);
				}
			}
		}, 5000);

		return () => clearInterval(interval);
	});

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

<div class="bg-background">
	<!-- Hero Section -->
	<section class="bg-background py-24">
		<div class="container mx-auto px-4">
			<div class="space-y-4 text-center">
				<h1 class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
					Build the Right Software the First Time
					<p class="text-primary">Start Today without further delays</p>
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
						<span class="text-lg font-semibold text-white">Get Your Free Consultation Today!</span>
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
							<div class="h-full w-full">
								<img
									src="img/frustration_01.png"
									alt="Frustration"
									class="h-full w-full object-cover"
								/>
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
						<p class="text-sm font-semibold text-amber-600 dark:text-amber-400">
							CRITICAL BUSINESS RISKS
						</p>
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
										<div class="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
											<TriangleAlert class="h-8 w-8 text-amber-600 dark:text-amber-400" />
										</div>
										<div class="space-y-2">
											<h3 class="text-xl font-semibold">Rework & Endless Delays</h3>
											<p class="text-muted-foreground">
												Developers waste weeks building the wrong features, forcing costly rebuilds
												that could have been avoided with clear requirements.
											</p>
											<p class="text-sm font-semibold text-amber-600 dark:text-amber-400">
												Typical Cost: €10,000-30,000 per major revision
											</p>
										</div>
									</div>

									<div class="flex items-start gap-4">
										<div class="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
											<TriangleAlert class="h-8 w-8 text-amber-600 dark:text-amber-400" />
										</div>
										<div class="space-y-2">
											<h3 class="text-xl font-semibold">Inflated Vendor Quotes</h3>
											<p class="text-muted-foreground">
												Agencies add 40-100% padding to protect against scope uncertainty, making
												your project significantly more expensive than necessary.
											</p>
											<p class="text-sm font-semibold text-amber-600 dark:text-amber-400">
												Average Overpayment: 50-75% of project cost
											</p>
										</div>
									</div>

									<div class="flex items-start gap-4">
										<div class="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
											<TriangleAlert class="h-8 w-8 text-amber-600 dark:text-amber-400" />
										</div>
										<div class="space-y-2">
											<h3 class="text-xl font-semibold">Stakeholder Trust Crisis</h3>
											<p class="text-muted-foreground">
												As delays mount and costs spiral, stakeholder confidence
												plummets—potentially killing promising projects before completion.
											</p>
											<p class="text-sm font-semibold text-amber-600 dark:text-amber-400">
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
									<p class="text-2xl font-bold text-amber-600 dark:text-amber-400">€50,000+</p>
									<p class="text-sm text-muted-foreground">
										Average cost overrun for mid-sized projects with poor requirements
									</p>
								</div>
								<div class="rounded-lg bg-background p-4">
									<p class="text-2xl font-bold text-amber-600 dark:text-amber-400">6-12 Months</p>
									<p class="text-sm text-muted-foreground">
										Typical project delay due to requirement-related issues
									</p>
								</div>
								<div class="rounded-lg bg-background p-4">
									<p class="text-2xl font-bold text-amber-600 dark:text-amber-400">3x</p>
									<p class="text-sm text-muted-foreground">
										Higher maintenance costs due to poorly specified features
									</p>
								</div>
							</div>
							<div class="mt-6 rounded-lg bg-amber-100 p-4 dark:bg-amber-900/30">
								<p class="text-sm font-medium text-amber-600 dark:text-amber-400">
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

	<!-- Rational Decision Making Section -->
	<section class="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
			<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
				Make Informed Decisions with Confidence
			</h2>
			<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
				Compare your options rationally and choose the best path forward
			</p>
		</div>

		<div class="mx-auto grid justify-center gap-8 sm:grid-cols-3 md:max-w-[64rem]">
			<!-- DIY Approach -->
			<Card class="relative overflow-hidden">
				<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300" />
				<CardHeader>
					<Badge variant="secondary" class="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
						Do-It-Yourself
					</Badge>
					<CardTitle class="mt-4">Internal Requirements</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="space-y-2">
						<p class="text-sm font-medium text-green-600 dark:text-green-400">Pros:</p>
						<ul class="space-y-1 text-sm text-muted-foreground">
							<li>• Leverages internal knowledge</li>
							<li>• No additional costs</li>
						</ul>
					</div>
					<div class="space-y-2">
						<p class="text-sm font-medium text-red-600 dark:text-red-400">Cons:</p>
						<ul class="space-y-1 text-sm text-muted-foreground">
							<li>• Often lacks structure</li>
							<li>• Inconsistent documentation</li>
							<li>• Time-consuming process</li>
						</ul>
					</div>
				</CardContent>
			</Card>

			<!-- Full-Time Hire -->
			<Card class="relative overflow-hidden">
				<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-blue-300" />
				<CardHeader>
					<Badge variant="secondary" class="bg-blue-500/10 text-blue-700 dark:text-blue-400">
						Full-Time Hire
					</Badge>
					<CardTitle class="mt-4">BA or PM</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="space-y-2">
						<p class="text-sm font-medium text-green-600 dark:text-green-400">Pros:</p>
						<ul class="space-y-1 text-sm text-muted-foreground">
							<li>• Deep company knowledge</li>
							<li>• Continuous availability</li>
						</ul>
					</div>
					<div class="space-y-2">
						<p class="text-sm font-medium text-red-600 dark:text-red-400">Cons:</p>
						<ul class="space-y-1 text-sm text-muted-foreground">
							<li>• High salary costs</li>
							<li>• Benefits overhead</li>
							<li>• Long ramp-up time</li>
						</ul>
					</div>
				</CardContent>
			</Card>

			<!-- Direct Outsourcing -->
			<Card class="relative overflow-hidden">
				<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-purple-300" />
				<CardHeader>
					<Badge variant="secondary" class="bg-purple-500/10 text-purple-700 dark:text-purple-400">
						Direct Outsourcing
					</Badge>
					<CardTitle class="mt-4">Without Requirements</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="space-y-2">
						<p class="text-sm font-medium text-green-600 dark:text-green-400">Pros:</p>
						<ul class="space-y-1 text-sm text-muted-foreground">
							<li>• Single vendor solution</li>
							<li>• Faster startup</li>
						</ul>
					</div>
					<div class="space-y-2">
						<p class="text-sm font-medium text-red-600 dark:text-red-400">Cons:</p>
						<ul class="space-y-1 text-sm text-muted-foreground">
							<li>• High miscommunication risk</li>
							<li>• Inflated quotes</li>
							<li>• Unclear deliverables</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Our Solution -->
		<div class="scroll-mt-24" id="services"></div>

		<div
			class="mx-auto mt-12 max-w-[64rem] rounded-xl border-2 border-primary bg-primary/5 p-8 shadow-[0_0_15px_rgba(var(--primary)_/_0.1)]"
		>
			<div class="text-center">
				<Badge variant="secondary" class="mb-4 bg-primary text-primary-foreground"
					>Our Solution</Badge
				>
				<h3 class="text-2xl font-bold text-primary">Expert Requirements Documentation</h3>
				<p class="mt-2 text-muted-foreground">Get the best of all worlds without the drawbacks</p>
			</div>
			<div class="mt-6 grid gap-4 sm:grid-cols-2">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<CheckIcon class="h-5 w-5 text-primary" />
						<span class="font-medium">Crystal-clear documentation</span>
					</div>
					<div class="flex items-center gap-2">
						<CheckIcon class="h-5 w-5 text-primary" />
						<span class="font-medium">Professional expertise</span>
					</div>
				</div>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<CheckIcon class="h-5 w-5 text-primary" />
						<span class="font-medium">Cost-effective solution</span>
					</div>
					<div class="flex items-center gap-2">
						<CheckIcon class="h-5 w-5 text-primary" />
						<span class="font-medium">Quick turnaround time</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Requirements Document Preview Section -->
		<section class="bg-background py-24" id="requirements-preview">
			<div class="container mx-auto px-4">
				<RequirementsPreview />
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
							<form
								class="space-y-4"
								onsubmit={(e) => {
									e.preventDefault();
									handleSubmit();
								}}
							>
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
											I agree to the processing of my personal data according to the Privacy Policy
											*
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
					"When you arm yourself with precise requirements, you empower your team, your
					stakeholders, and your future development partners to execute flawlessly."
				</p>
				<p class="mt-2 font-semibold">— Ilmo Koo, CEO at Kooslab</p>
			</div>
		</footer>
	</section>
</div>
