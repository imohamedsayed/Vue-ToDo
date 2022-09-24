<template>
  <div class="container pt-5">
    <div class="school">
      <Title> School </Title>
      <AddTask :collection="schoolCollection" :user="user" />
      <TaskList :category="schoolCollection" />
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import AddTask from "@/components/AddTask.vue";
import axios from "axios";
import TaskList from "../components/TaskList.vue";
export default {
  components: { Title, AddTask, TaskList },
  data() {
    return {
      schoolCollection: "",
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
        "http://localhost:3000/collections?name=school"
      );
      if (result.status == 200) {
        this.schoolCollection = result.data[0];
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.school {
  max-width: 720px;
  margin: 0 auto;
}
</style>
