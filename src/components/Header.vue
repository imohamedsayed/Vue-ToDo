<template>
  <div class="header">
    <div class="links">
      <router-link :to="{ name: 'dashboard' }"
        ><i class="fa-solid fa-square-poll-vertical"></i>Dashboard</router-link
      >
      <router-link :to="{ name: 'collections' }"
        ><i class="fa-solid fa-cubes-stacked"></i>Collection</router-link
      >
    </div>
    <div class="user">
      <i class="fa-solid fa-check"></i>
      <i
        class="fa-solid fa-user"
        @click="$router.push({ name: 'profile' })"
      ></i>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  background: #21212b;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .links {
    display: flex;
    gap: 30px;
    margin-left: 20px;
    a {
      color: #9c9c9c;
      text-decoration: none;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      i {
        margin-right: 10px;
      }
      &.router-link-exact-active {
        color: #fff;
      }
    }
  }
  .user {
    display: flex;
    gap: 20px;
    margin-right: 20px;
    font-size: 1.2rem;
    i {
      padding: 8px 10px;
      background: #fff;
      border-radius: 50px;
      cursor: pointer;
    }
    i:first-of-type {
      border-radius: 10px;
      color: white;
      background: linear-gradient(to right, #d451c8, #fd8692);
    }
  }
}
</style>
