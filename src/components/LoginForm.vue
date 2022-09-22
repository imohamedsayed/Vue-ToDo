<template>
  <form @submit.prevent="">
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <div>
      <button type="submit">Sign in</button>
    </div>
    <div class="info">
      <p>Don't have an account? <a href="#">Create Account</a></p>
    </div>
  </form>
</template>

<script>
export default {};
</script>
