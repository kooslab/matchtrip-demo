<!-- Requirements Document Preview Component -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { requirements as allRequirements } from '$lib/data/requirements';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardContent,
		CardDescription
	} from '$lib/components/ui/card';

	// Show only the first 5 requirements for the preview
	const requirements = allRequirements.slice(0, 5);
</script>

<div class="mt-16">
	<div class="text-center">
		<Badge variant="outline" class="mb-4">Document Preview</Badge>
		<h3 class="text-3xl font-bold tracking-tight">Professional Requirements Document</h3>
		<p class="mt-4 text-lg text-muted-foreground">
			See how we transform your vision into detailed, actionable requirements
		</p>
	</div>

	<!-- Desktop Table View -->
	<div
		class="mt-8 hidden overflow-x-auto rounded-lg border border-muted bg-background shadow-lg dark:border-muted-foreground/20 md:block"
	>
		<table class="w-full border-collapse">
			<thead class="bg-muted/50 dark:bg-muted/30">
				<tr>
					<th
						class="w-[8%] border-b border-muted p-4 text-left text-sm font-medium dark:border-muted-foreground/20"
						>ID</th
					>
					<th
						class="w-[12%] border-b border-muted p-4 text-left text-sm font-medium dark:border-muted-foreground/20"
						>Epic</th
					>
					<th
						class="w-[35%] border-b border-muted p-4 text-left text-sm font-medium dark:border-muted-foreground/20"
						>User Story</th
					>
					<th
						class="w-[10%] border-b border-muted p-4 text-left text-sm font-medium dark:border-muted-foreground/20"
						>Priority</th
					>
					<th
						class="w-[35%] border-b border-muted p-4 text-left text-sm font-medium dark:border-muted-foreground/20"
						>Acceptance Criteria</th
					>
				</tr>
			</thead>
			<tbody class="divide-y divide-muted dark:divide-muted-foreground/20">
				{#each requirements as requirement}
					<tr class="group transition-colors hover:bg-muted/50 dark:hover:bg-muted/20">
						<td class="whitespace-nowrap p-4 text-sm font-medium text-primary">{requirement.id}</td>
						<td class="p-4 text-sm">{requirement.epic}</td>
						<td class="p-4 text-sm leading-relaxed">{requirement.userStory}</td>
						<td class="p-4">
							<Badge
								variant={requirement.priority === 'High' ? 'destructive' : 'secondary'}
								class={requirement.priority === 'High'
									? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
									: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}
							>
								{requirement.priority}
							</Badge>
						</td>
						<td class="p-4">
							<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
								{#each requirement.acceptanceCriteria as criteria}
									<li class="pl-2">{criteria}</li>
								{/each}
							</ul>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Mobile Card View -->
	<div class="mt-8 space-y-4 md:hidden">
		{#each requirements as requirement}
			<Card class="overflow-hidden">
				<CardHeader class="bg-muted/50 p-4 dark:bg-muted/30">
					<div class="flex items-center justify-between">
						<CardTitle class="text-base font-medium text-primary">{requirement.id}</CardTitle>
						<Badge
							variant={requirement.priority === 'High' ? 'destructive' : 'secondary'}
							class={requirement.priority === 'High'
								? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
								: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}
						>
							{requirement.priority}
						</Badge>
					</div>
					<p class="text-sm text-muted-foreground">{requirement.epic}</p>
				</CardHeader>
				<CardContent class="p-4">
					<p class="mb-3 text-sm font-medium">User Story:</p>
					<p class="mb-4 text-sm leading-relaxed">{requirement.userStory}</p>
					<p class="mb-2 text-sm font-medium">Acceptance Criteria:</p>
					<ul class="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
						{#each requirement.acceptanceCriteria as criteria}
							<li class="pl-2">{criteria}</li>
						{/each}
					</ul>
				</CardContent>
			</Card>
		{/each}
	</div>

	<div class="mt-8 text-center">
		<p class="text-sm text-muted-foreground">
			This is just a preview. Our full requirements document includes detailed technical
			specifications, wireframes, and implementation guidelines.
		</p>
		<div class="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:space-x-4">
			<Button
				class="bg-primary/90 hover:bg-primary sm:w-auto"
				onclick={() =>
					document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
			>
				Get Your Custom Requirements Document
			</Button>
			<Button
				variant="outline"
				class="border-primary/20 hover:bg-primary/5 sm:w-auto"
				onclick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
			>
				View Pricing
			</Button>
		</div>
	</div>
</div>
