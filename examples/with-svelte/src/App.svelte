<script lang="ts">

    import {mountClient} from "@micro-stacks/svelte";

    import WalletConnectButton from './components/wallet-connect-button.svelte'

    mountClient({
        appName: 'svelte',
        appIconUrl: '/'
    })
</script>


<main>
    <div> hello</div>
    <WalletConnectButton/>
</main>



