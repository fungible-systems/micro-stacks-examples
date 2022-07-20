import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ locals }: RequestEvent) {
  await locals.session.destroy();

  return {
    body: {
      ok: true,
    },
  };
}
