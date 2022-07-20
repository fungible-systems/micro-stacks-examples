<script setup lang="ts">
import { useNetwork } from '@micro-stacks/vue';

const { setNetwork, isMainnet } = $(useNetwork());

const onClick = () => {
  setNetwork(isMainnet ? 'testnet' : 'mainnet');
};
</script>

<template>
  <button
    type="button"
    v-on:click="() => onClick()"
  >
    {{ isMainnet ? 'mainnet' : 'testnet' }}
  </button>
</template>
