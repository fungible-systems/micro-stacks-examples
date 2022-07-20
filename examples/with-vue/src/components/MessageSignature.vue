<script setup>
import { ref } from 'vue';
import { useAuth, useOpenSignMessage } from '@micro-stacks/vue';

const { openSignMessage, isRequestPending } = $(useOpenSignMessage());
const { isSignedIn } = $(useAuth());

const message = ref('');
const signatureData = ref(null);

const onClick = () => {
  openSignMessage({
    message: message.value,
    onFinish(payload) {
      signatureData.value = payload;
    },
  });
};
</script>

<template>
  <div
    v-if="isSignedIn"
    style="margin: 0 auto; max-width: 450px; gap: 20px; display: flex; flex-direction: column"
  >
    <h3>Sign a message</h3>
    <input v-model="message" />
    <button
      :disabled="!message"
      type="button"
      v-on:click="() => onClick()"
    >
      {{
        isRequestPending ? 'pending' : message !== '' ? 'Sign message' : 'Enter a message to sign'
      }}
    </button>
    <div
      v-if="signatureData"
      style="
        background-color: black;
        padding: 24px;
        border-radius: 20px;
        color: white;
        text-align: left;
        display: flex;
        flex-direction: column;
        overflow: auto;
      "
    >
      <code> publicKey: {{ signatureData.publicKey }} </code>
      <code> signature: {{ signatureData.signature }} </code>
    </div>
  </div>
</template>
