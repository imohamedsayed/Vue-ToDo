<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
  mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>
