<script lang="ts">
  export let user = {
    email: "",
    password: "",
  };

  const handleSubmit = (e: SubmitEvent) => {
    console.log(e.target);
    for (let field of formData) {
      console.log(field);
    }
    console.log(user);
  };
</script>

<form on:submit|preventDefault={(e) => handleSubmit(e)}>
  <label for="email">E-mail</label>
  <input type="text" id="email" name="email" />
  <label for="password">Password</label>
  <input type="text" id="password" name="password" />
  <button type="submit">Log in</button>
</form>
