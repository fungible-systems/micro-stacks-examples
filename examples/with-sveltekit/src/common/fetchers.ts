const url = import.meta.env.PROD ? 'https://micro-stacks-sveltekit-example.vercel.app' : 'http://localhost:3000'

export const onPersistState = async (dehydratedState: string) => {
  const formData = new FormData();

  formData.set("dehydratedState", dehydratedState);

  await fetch(url + "/api/session/save", {
    method: "POST",
    body: formData,
  });
};

export const onSignOut = async () => {
  await fetch(url + "/api/session/destroy", {
    method: "POST",
    body: null,
  });
};
