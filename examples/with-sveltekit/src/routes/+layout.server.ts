import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    const { dehydratedState } = locals.session.data
    await locals.session.set({ dehydratedState })
    return { dehydratedState };
}
