import { atom, useAtomValue } from 'jotai';
import { accountState, openContractCallState, useOpenContractCallState } from '@micro-stacks/jotai';
import {
  intCV,
  uintCV,
  bufferCV,
  stringAsciiCV,
  stringUtf8CV,
  standardPrincipalCV,
  trueCV,
} from 'micro-stacks/clarity';
import { utf8ToBytes } from 'micro-stacks/common';
import { FungibleConditionCode, makeStandardSTXPostCondition } from 'micro-stacks/transactions';
import { FinishedTxData } from 'micro-stacks/connect';
import { useUpdateAtom } from 'jotai/utils';
import { StacksTestnet } from 'micro-stacks/network';

export const responseAtom = atom(null as null | FinishedTxData);
export const callFakerWriteAtom = atom<null, { message: string }>(
  null,
  async (get, set, { message }) => {
    const account = get(accountState);
    if (!account.stxAddress) return;

    const { openContractCall, isRequestPending } = get(openContractCallState);
    if (isRequestPending) return;

    const functionArgs = [
      uintCV(1234),
      intCV(-234),
      bufferCV(utf8ToBytes('hello, world')),
      stringAsciiCV(message),
      stringUtf8CV('hey-utf8'),
      standardPrincipalCV('ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3'),
      trueCV(),
    ];

    const postConditions = [
      makeStandardSTXPostCondition(account.stxAddress, FungibleConditionCode.LessEqual, '100'),
    ];

    await openContractCall({
      contractAddress: 'ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3',
      contractName: 'faker',
      functionName: 'rawr',
      functionArgs,
      postConditions,
      attachment: 'This is an attachment',
      onFinish(payload) {
        set(responseAtom, payload);
      },
    });
  }
);

export const useFakerContractCall = () => {
  const { isRequestPending } = useOpenContractCallState();
  const handleContractCall = useUpdateAtom(callFakerWriteAtom);

  return {
    data: useAtomValue(responseAtom),
    handleContractCall,
    isRequestPending,
  };
};
