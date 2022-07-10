export const onPersistState = async (dehydratedState: string) => {
  const formData = new FormData();

  formData.set("dehydratedState", dehydratedState);

  await fetch("http://localhost:3000/api/session/save", {
    method: "POST",
    body: formData,
  });
};

export const onSignOut = async () => {
  await fetch("http://localhost:3000/api/session/destroy", {
    method: "POST",
    body: null,
  });
};
