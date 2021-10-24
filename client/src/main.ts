import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    isAuth: false,
  },
});

export default app;
