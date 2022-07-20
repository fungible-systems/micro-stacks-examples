import { useFakerContractCall } from '../store';

export const FakerContract = () => {
  const { data, isRequestPending, handleContractCall } = useFakerContractCall();

  return (
    <>
      {data && (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
      <button onClick={() => handleContractCall({ message: 'hello!' })}>
        {isRequestPending ? 'pending...' : 'Call faker contract'}
      </button>
    </>
  );
};
