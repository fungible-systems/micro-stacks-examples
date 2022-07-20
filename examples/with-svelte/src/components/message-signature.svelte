<script lang='ts'>
  import { getOpenSignMessage } from '@micro-stacks/svelte';
  import type { SignatureData } from 'micro-stacks/connect';

  const signMessage = getOpenSignMessage();

  let message = '';
  let response: SignatureData | undefined;

  function onSignMessage() {
    $signMessage.openSignMessage({
      message,
      onFinish: (value) => (response = value),
    });
  }
</script>

<details>
  <summary>
    Sign a message!
  </summary>
  <div>
    <input bind:value={message} placeholder='Enter a message to sign!' />
    <button on:click={onSignMessage}> Sign message</button>
    {#if response}
  <pre>
    <code>{JSON.stringify(response, null, 2)}</code>
  </pre>
    {/if}
  </div>
</details>
