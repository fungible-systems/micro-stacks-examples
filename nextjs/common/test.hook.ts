import { Atom } from 'jotai/core/atom';
import {
  buildInitialValueAtoms,
  InitialValuesAtomBuilder,
  useQueryInitialValues,
} from 'jotai-query-toolkit/nextjs';
import { hashQueryKey } from 'react-query';

function useBuildInitialValues(
  props: Record<string, unknown>,
  initialValuesAtomBuilders?: InitialValuesAtomBuilder[]
): [newProps: Record<string, unknown>, values: Iterable<readonly [Atom<unknown>, unknown]>] {
  if (!initialValuesAtomBuilders) return [props, []];
  const initialValues = buildInitialValueAtoms(
    props as Record<string, unknown>,
    initialValuesAtomBuilders
  );
  initialValuesAtomBuilders.forEach(([propKey]) => {
    delete (props as Record<string, unknown>)[propKey];
  });
  return [props, initialValues];
}

export const useGetProviderInitialValues = (
  {
    initialQueryData,
    ...props
  }: {
    [key: string]: unknown;
    initialQueryData?: Record<string, unknown>;
  },
  initialValuesAtomBuilders?: InitialValuesAtomBuilder[]
) => {
  let initialValues: Iterable<readonly [Atom<unknown>, unknown]> = [];
  // this key is very important, without passing key={key} to the Provider,
  // it won't know to re-render if someone navigates within the same page component in next.js
  const keys = initialQueryData ? Object.keys(initialQueryData) : [];
  const key = hashQueryKey(keys);

  if (initialQueryData) initialValues = useQueryInitialValues(initialQueryData);

  // sometimes apps require additional atoms to be set within this provider,
  // this will build the atoms and add them to our initialValues array
  const [updatedProps, initialAtomValues] = useBuildInitialValues(props, initialValuesAtomBuilders);

  initialValues = [...initialAtomValues, ...initialValues];
  return {
    initialValues,
    key,
    ...updatedProps,
  };
};
