import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './i18n';
import { localePrefix } from './navigation';

export default createMiddleware({
	// A list of all locales that are supported
	locales: SUPPORTED_LOCALES,
	localePrefix,

	// Used when no locale matches
	defaultLocale: DEFAULT_LOCALE,
});

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(en|ja)/:path*'],
};
