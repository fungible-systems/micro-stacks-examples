<script lang='ts'>
  import { getOpenSignStructuredMessage } from '@micro-stacks/svelte';
  import { cvToHex, stringAsciiCV, tupleCV } from 'micro-stacks/clarity';
  import type { SignatureData } from 'micro-stacks/connect';

  const signMessage = getOpenSignStructuredMessage();

  let value = '';
  let response: SignatureData | undefined;

  const message = cvToHex(tupleCV({
    message: stringAsciiCV(value),
  }));

  function onSignMessage() {
    $signMessage.openSignStructuredMessage({
      message, onFinish: (v) => (response = v),
    });
  }
</script>

<details>
  <summary>
    Sign a structured message!
  </summary>
  <div>
    <input bind:value={value} placeholder='Enter a message to sign!' />
    <button on:click={onSignMessage}> Sign message</button>
    {#if response}
  <pre>
    <code>{JSON.stringify(response, null, 2)}</code>
  </pre>
    {/if}
  </div>
</details>
