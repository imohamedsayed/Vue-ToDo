<template>
  <div class="title">
    <i
      class="fa-solid fa-chevron-left"
      @click="$router.push({ name: 'dashboard' })"
    ></i>
    <h2><slot /></h2>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  gap: 50px;
  align-items: center;
  font-size: 2rem;
  i {
    background-color: var(--space-grey);
    color: #d1d1d2;
    padding: 10px 12px;
    border-radius: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      box-shadow: 1px 1px 5px 2px var(--space-grey);
    }
  }
  h2 {
    color: #fff;
    margin: 0;
    font-size: 2.4rem;
  }
}
</style>
