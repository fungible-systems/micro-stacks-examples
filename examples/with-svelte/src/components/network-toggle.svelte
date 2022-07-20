<script lang='ts'>
  import { geNetwork } from '@micro-stacks/svelte';

  const network = geNetwork();

  $: label = $network.isMainnet
    ? 'mainnet'
    : 'testnet';

  function onClick() {
    $network.setNetwork($network.isMainnet ? 'testnet' : 'mainnet');
  }
</script>

<button on:click={onClick}>
  {label}
</button>

