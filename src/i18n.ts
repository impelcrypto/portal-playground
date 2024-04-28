import deepmerge from 'deepmerge';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, 'ja'];

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!SUPPORTED_LOCALES.includes(locale as string)) notFound();

	const userMessages = (await import(`../messages/${locale}.json`)).default;
	const defaultMessages = (await import(`../messages/${DEFAULT_LOCALE}.json`))
		.default;

	const messages =
		locale === DEFAULT_LOCALE
			? defaultMessages
			: deepmerge(defaultMessages, userMessages);

	return { messages };
});
