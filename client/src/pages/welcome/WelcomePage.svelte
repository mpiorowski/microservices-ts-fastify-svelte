<script lang="ts">
  let hello = "Hello";
  export let logout: () => void;
</script>

<div>
  <div>{hello}</div>
  <button on:click={logout}>Log out</button>
</div>
