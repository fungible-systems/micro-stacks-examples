import { handleSession } from 'svelte-kit-cookie-session';
import type { RequestEvent } from '@sveltejs/kit';

export async function getSession({ locals }: RequestEvent) {
	return locals.session.data;
}

// You can do it like this, without passing a own handle function
export const handle = handleSession({
	secret: 'SOME_COMPLEX_SECRET_AT_LEAST_32_CHARS'
});
