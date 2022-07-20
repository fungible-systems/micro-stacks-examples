<script setup lang="ts">
import { useAccount, useAuth } from '@micro-stacks/vue';

const { isSignedIn, isRequestPending, signOut, openAuthRequest } = $(useAuth());
const { stxAddress } = $(useAccount());

const onClick = () => (!isSignedIn ? openAuthRequest() : signOut());
</script>

<template>
  <h1>{{ stxAddress ? stxAddress : 'No session active' }}</h1>
  <button
    type="button"
    v-on:click="() => onClick()"
  >
    {{ isRequestPending ? 'pending...' : isSignedIn ? 'sign out' : 'connect stacks wallet' }}
  </button>
</template>
