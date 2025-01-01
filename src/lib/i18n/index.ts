import { init, register } from 'svelte-i18n';
import { browser } from '$app/environment';

register('en', () => import('./locales/en.json'));
register('ko', () => import('./locales/ko.json'));

init({
	fallbackLocale: 'en',
	initialLocale: browser ? window.navigator.language : 'en'
});
