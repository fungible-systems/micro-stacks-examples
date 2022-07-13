<script setup lang="ts">
import { useAccount, useAuth } from '@micro-stacks/vue';

const auth = $(useAuth());
const account = $(useAccount());

const onClick = () => {
  !auth.isSignedIn ? auth.openAuthRequest() : auth.signOut();
};
</script>

<template>
  <h1>{{ account.stxAddress }}</h1>
  <button type="button" @click="() => onClick()">
    {{
      auth.isRequestPending ? 'pending...' : auth.isSignedIn ? 'sign out' : 'connect stacks wallet'
    }}
  </button>
</template>
