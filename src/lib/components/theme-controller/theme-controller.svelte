<script lang="ts">
	import { setMode } from 'mode-watcher';

	import HardDrive from 'lucide-svelte/icons/hard-drive';
	import MoonIcon from 'lucide-svelte/icons/moon';
	import SunIcon from 'lucide-svelte/icons/sun';

	let activeTheme = 'light'; // Force theme to light

	// Reactive statement to update the body class
	$effect(() => {
		document.body.classList.remove('dark');
		document.body.classList.add('light');
	});

	function handleThemeClick(target: 'dark' | 'light' | 'system') {
		// Do nothing or log a message to indicate theme is forced
		console.log('Theme is forced to light');
	}
</script>

<div class="flex items-center rounded-full border shadow-sm">
	<button
		class="flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full outline-1 outline-border hover:bg-muted"
		class:outline={activeTheme === 'system'}
		onclick={() => handleThemeClick('system')}
		aria-label="system theme icon"
	>
		<HardDrive class="h-[1.2rem] w-[1.2rem]" />
	</button>

	<button
		class="flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full outline-1 outline-border hover:bg-muted"
		class:outline={activeTheme === 'dark'}
		onclick={() => handleThemeClick('dark')}
		aria-label="dark theme icon"
	>
		<MoonIcon class="h-[1.2rem] w-[1.2rem]" />
	</button>

	<button
		class="flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full outline-1 outline-border hover:bg-muted"
		class:outline={activeTheme === 'light'}
		onclick={() => handleThemeClick('light')}
		aria-label="light theme icon"
	>
		<SunIcon class="h-[1.2rem] w-[1.2rem]" />
	</button>
</div>
