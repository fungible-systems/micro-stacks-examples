<script lang='ts'>
  import { getAccount, getAuth } from '@micro-stacks/svelte';

  const auth = getAuth();

  $: label = $auth.isRequestPending
    ? 'Loading...'
    : $auth.isSignedIn
      ? 'Sign out'
      : 'Connect Stacks wallet';

  function onClick() {
    if ($auth.isSignedIn) {
      $auth.signOut();
    } else {
      $auth.openAuthRequest();
    }
  }

  const account = getAccount();

  $: sessionStatus = !$account.stxAddress ? 'No active session' : $account.stxAddress;

</script>

<main>
  <h2>{sessionStatus}</h2>
  <button on:click={onClick}>
    {label}
  </button>
</main>
