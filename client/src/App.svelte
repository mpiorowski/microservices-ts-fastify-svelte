<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import LoginPage from "./pages/login/LoginPage.svelte";
  import WelcomePage from "./pages/welcome/WelcomePage.svelte";

  export let isAuth = false;

  const queryClient = new QueryClient();
</script>

<main>
  <QueryClientProvider client={queryClient}>
    {#if !isAuth}
      <LoginPage login={() => (isAuth = true)} />
    {/if}

    {#if isAuth}
      <WelcomePage logout={() => (isAuth = false)} />
    {/if}
  </QueryClientProvider>
</main>
