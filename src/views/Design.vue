<template>
  <div class="container pt-5">
    <div class="personal" v-if="collection">
      <Title>Design Tasks</Title>
      <AddTask :collection="collection" :user="user" />
      <TaskList :category="collection" />
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import AddTask from "@/components/AddTask.vue";
import TaskList from "@/components/TaskList.vue";
import axios from "axios";
export default {
  components: { Title, AddTask, TaskList },
  data() {
    return {
      collection: "",
      user: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({ name: "login" });
    } else {
      this.user = JSON.parse(localStorage.getItem("user"));
      let result = await axios.get(
        "http://localhost:3000/collections?name=design"
      );
      if (result.status == 200) {
        this.collection = result.data[0];
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.personal {
  max-width: 720px;
  margin: 0 auto;
}
</style>
