<template>
  <form @submit.prevent="">
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <input type="password" placeholder="Confirm Password" />
    <div>
      <button type="submit">Sign Up</button>
    </div>
    <div class="info">
      <p>Already Have an account? <a href="#">Login now</a></p>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style lang="scss">
form {
  max-width: 520px;
  input {
    width: 100%;
    margin: 20px 0;
    height: 60px;
    border-radius: 20px;
    padding-left: 10px;
    background: transparent;
    outline: none;
    border: 4px solid var(--dark-alt);
    font-size: 1rem;
    color: #ffff;
    &::placeholder {
      color: #d1d1d2;
    }
    transition: all 0.3s ease;
    &:focus {
      transform: scale(1.05);
    }
  }
  button {
    background: linear-gradient(to top right, #be41db, #ff9f7c);
    width: 100%;
    height: 60px;
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    border-radius: 20px;
  }
  .info {
    margin-top: 60px;
    P {
      color: #b1b1b4;
      font-size: 1.2rem;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
}
</style>
