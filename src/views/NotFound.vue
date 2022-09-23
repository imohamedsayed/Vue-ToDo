<template>
  <div class="notFound">
    <h1>404 - Looks like you're lost.</h1>
    <p>Maybe this page is used to exist or just spelled something wrong.</p>
    <p>
      Chances are you spelled something wrong, sp you can double check the URL?
    </p>
    <div class="text-center mt-5">
      <button @click="$router.push({ name: 'home' })">Return Home</button>
    </div>
    <div class="ball d-md-block d-none"></div>
    <div class="darkBall d-md-block d-none"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notFound {
  height: calc(100vh);
  display: grid;
  place-content: center;
  background: linear-gradient(#181820, #1d1d26);
  h1 {
    font-size: 4rem;
    color: #fff;
  }
  p {
    color: var(--grey);
    font-size: 1.2rem;
  }
  button {
    background: linear-gradient(to top right, #be41db, #ff9f7c);
    width: 50%;
    height: 60px;
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    border-radius: 20px;
  }
  .ball {
    position: fixed;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(to top right, #be41db, #ff9f7c);

    bottom: 40%;
    left: -8%;
    @media (max-width: 1170px) {
      display: none !important;
    }
  }

  .darkBall {
    position: fixed;
    width: 405px;
    height: 405px;
    border-radius: 50%;
    background: linear-gradient(to top right, #000000, #30303d);

    bottom: -5%;
    left: -5%;
    @media (max-width: 1170px) {
      display: none !important;
    }
  }
}
</style>
