<template>
  <div class="login">
    <h2>Login</h2>
    <LoginForm />
    <div class="ball d-md-block d-none"></div>
    <div class="darkBall d-md-block d-none"></div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
export default { components: { LoginForm } };
</script>

<style lang="scss">
.login {
  height: 100vh;
  width: 100%;
  background: linear-gradient(#181820, #1d1d26);
  display: grid;
  place-content: center;
  h2 {
    color: #fff;
    font-size: 3rem;
    margin-bottom: 40px;
  }
  .ball {
    position: fixed;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(to top right, #ad2dc9, #ff9f7c);
    top: -10%;
    left: 20%;
    @media (max-width: 940px) {
      left: 5%;
    }
  }

  .darkBall {
    position: fixed;
    width: 125px;
    height: 125px;
    border-radius: 50%;
    background: linear-gradient(to top right, #000000, #30303d);
    top: 05%;
    right: 25%;
  }
}
</style>
