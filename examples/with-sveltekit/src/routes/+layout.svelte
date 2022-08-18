<script lang="ts">
  import { mountClient } from '@micro-stacks/svelte';
  import { onPersistState, onSignOut } from '../common/fetchers';

  export let data;
  const { dehydratedState } = data;

  mountClient({
    appName: 'svelte',
    appIconUrl: '/',
    onPersistState,
    onSignOut,
    dehydratedState,
  });
</script>

<slot />
