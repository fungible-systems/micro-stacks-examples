import type { RequestEvent } from "@sveltejs/kit";

export async function post({ locals, request }: RequestEvent) {
  const data = await request.formData();
  const dehydratedState = (data.get("dehydratedState") as string) ?? null;
  await locals.session.set({ dehydratedState });
  return {
    status: 201,
  };
}
