import type { RequestEvent } from "@sveltejs/kit";

export async function post({ locals }: RequestEvent) {
  await locals.session.destroy();

  return {
    body: {
      ok: true,
    },
  };
}
