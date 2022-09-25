<template>
  <div class="tasksList text-start">
    <div class="unCompleted" v-if="unCompletedTasks.length">
      <h3>Tasks - {{ unCompletedTasks.length }}</h3>
      <Task v-for="task in unCompletedTasks" :key="task.id" :task="task" />
    </div>
    <div class="completed mt-5 pt-5" v-if="completedTasks.length">
      <h3>Completed - {{ completedTasks.length }}</h3>
      <Task v-for="task in completedTasks" :key="task.id" :task="task" />
    </div>
    <div
      class="noTasks"
      v-if="completedTasks.length == 0 && unCompletedTasks.length == 0"
    >
      <h1>No Tasks yet, click <span>+</span> button to add new task</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Task from "./Task.vue";
export default {
  props: ["category"],
  data() {
    return {
      unCompletedTasks: [],
      completedTasks: [],
      user: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({ name: "login" });
    } else {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    let result = await axios.get(
      `http://localhost:3000/tasks?userId=${this.user.id}&colId=${this.category.id}`
    );
    if (result.status == 200) {
      result.data.forEach((task) => {
        if (task.completed == true) {
          this.completedTasks.push(task);
        } else {
          this.unCompletedTasks.push(task);
        }
      });
    }
  },
  components: { Task },
};
</script>

<style lang="scss" scoped>
.tasksList {
  margin-top: 40px;
  color: #fff;
  .noTasks {
    color: var(--dark-alt);
    margin-top: 100px;
    font-size: 0.9rem;
    text-align: center;
    span {
      color: var(--skin);
    }
  }
}
</style>
