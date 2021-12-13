import { makeGetServerSideProps } from '@micro-stacks/nextjs';
import { Devtools } from '../components/devtools';
import { MainArea } from '../components/main-area';
import { Header } from '../components/header';
import { withMicroStacks } from '../common/with-micro-stacks';

import type { NextPage } from 'next';
import { callReadOnlyFunction } from 'micro-stacks/transactions';
import { cvToTrueValue, uintCV } from 'micro-stacks/clarity';

const Home: NextPage = ({ tokenUriExample }) => {
  return (
    <>
      <Header />
      <Devtools />
      <>
        <h1>{tokenUriExample}</h1>
      </>
      <MainArea />
    </>
  );
};

// contract_id = contract_address.contract_name
async function fetchTokenUri(contract_id: string, id: number) {
  console.log(`fetching uri for ${contract_id}, id: ${id}`);
  const [contractAddress, contractName] = contract_id.split('.');
  const data = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-token-uri',
    functionArgs: [uintCV(id)],
  });
  return cvToTrueValue(data, true);
}

fetchTokenUri('SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.frontier', 387)
  .then(console.log)
  .catch(console.error);

async function _getServerSideProps() {
  const tokenUriExample = await fetchTokenUri(
    'SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.frontier',
    387
  );
  return {
    props: {
      tokenUriExample,
    },
  };
}

export const getServerSideProps = makeGetServerSideProps(
  ['currentAccountBalances', 'currentAccountTransactions', 'currentAccountAssetsList'],
  _getServerSideProps
);

export default withMicroStacks(Home);
