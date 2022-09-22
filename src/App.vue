<template>
  <nav class="d-none">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
  --dark: #181820;
  --dark-alt: #30303d;
  --gradient-a: #d753c5;
  --gradient-b: #fd8a8f;
}
</style>
