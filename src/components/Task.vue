<template>
  <div
    class="task"
    :class="{ completed: task.completed == true }"
    ref="taskContainer"
  >
    <div class="status">
      <i class="fa-solid fa-check" @click="toggleComplete"></i>
    </div>
    <div class="task-info">
      <h3 class="mb-2">{{ task.name }}</h3>
      <span class="text-muted"
        ><i class="fa-regular fa-calendar me-2"></i>{{ task.date }}</span
      >
    </div>
    <div class="flex"></div>
    <div class="delete" @click="deleteTask">
      <i class="fa-solid fa-trash-can"></i>
    </div>
  </div>
  <teleport to="body">
    <Notification :theme="theme" :showNotification="showNotification">
      <p>{{ notify }}</p>
    </Notification>
  </teleport>
</template>

<script>
import axios from "axios";
import Notification from "./Notification.vue";
export default {
  props: ["task"],
  data() {
    return {
      showNotification: false,
      theme: "",
      notify: "",
    };
  },
  methods: {
    async toggleComplete() {
      this.task.completed = !this.task.completed;
      this.$refs.taskContainer.classList.toggle("completed");
      let result = await axios.put(
        `http://localhost:3000/tasks/${this.task.id}`,
        {
          name: this.task.name,
          date: this.task.date,
          userId: this.task.userId,
          colId: this.task.colId,
          completed: this.task.completed,
        }
      );
      if (result.status == 200) {
        if (this.task.completed) {
          this.theme = "success";
          this.notify = "Well done !";
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 1500);
        }
      } else {
        console.warn("something went wrong, try again");
      }
    },
    async deleteTask() {
      let result = await axios.delete(
        `http://localhost:3000/tasks/${this.task.id}`
      );
      if (result.status == 200) {
        this.theme = "success";
        this.notify = "Task Deleted Successfully";
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
          location.reload();
        }, 1000);
      } else {
        this.theme = "error";
        this.notify = "Something went wrong, try again";
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 1000);
      }
    },
  },
  components: { Notification },
};
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 50px 0;
  background: #21212b;
  padding: 20px 15px;
  border-radius: 40px;
  .status {
    i {
      border: 2px solid var(--gradient-a);
      border-radius: 50%;
      padding: 4px 5px;
      cursor: pointer;
      color: #21212b;
      transition: all 0.3s ease;
    }
  }
  .task-info {
    h3 {
      margin: 0;
      font-size: 1.2rem;
    }
  }
  &.completed {
    .status {
      i {
        background: var(--gradient-a);
        color: white;
      }
    }
    .task-info {
      text-decoration: line-through;
      span {
        text-decoration: none;
        color: greenyellow !important;
      }
    }
  }
  .flex {
    flex: 1 1 0;
  }
  .delete {
    margin-right: 20px;
    background-color: var(--dark-alt);
    width: 45px;
    height: 45px;
    display: grid;
    place-content: center;
    border-radius: 50%;
    cursor: pointer;
    color: crimson;
    transition: all 0.3s ease;
    &:hover {
      color: #fff;
      background-color: crimson;
    }
  }
}
</style>
