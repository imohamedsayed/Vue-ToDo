<template>
  <div class="container pt-5">
    <div class="dashboard">
      <h2>Dashboard</h2>
      <h1 class="text-start">Good Morning,<br />{{ user.name }}</h1>
      <div class="tasks text-start" v-if="schoolTasks.length">
        <div class="collection">
          <i class="fa-solid fa-book-open"></i>
          <h3>School</h3>
        </div>
        <div class="tasks">
          <Task v-for="task in schoolTasks" :key="task.id" :task="task" />
        </div>
        <div class="goto text-center" @click="$router.push({ name: 'school' })">
          Go To Collection <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <div class="tasks text-start" v-if="personalTasks.length">
        <div class="collection">
          <i class="fa-solid fa-user"></i>
          <h3>Personal</h3>
        </div>
        <div class="tasks">
          <Task v-for="task in personalTasks" :key="task.id" :task="task" />
        </div>
        <div
          class="goto text-center"
          @click="$router.push({ name: 'personal' })"
        >
          Go To Collection <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <div class="tasks text-start" v-if="designTasks.length">
        <div class="collection">
          <i class="fa-solid fa-paintbrush"></i>
          <h3>Design</h3>
        </div>
        <div class="tasks">
          <Task v-for="task in designTasks" :key="task.id" :task="task" />
        </div>
        <div class="goto text-center" @click="$router.push({ name: 'design' })">
          Go To Collection <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <div class="tasks text-start" v-if="cartTasks.length">
        <div class="collection">
          <i class="fa-solid fa-cart-shopping"></i>
          <h3>Groceries</h3>
        </div>
        <div class="tasks">
          <Task v-for="task in cartTasks" :key="task.id" :task="task" />
        </div>
        <div
          class="goto text-center"
          @click="$router.push({ name: 'groceries' })"
        >
          Go To Collection <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <div
        class="noTasks"
        v-if="
          !(
            schoolTasks.length ||
            personalTasks.length ||
            designTasks.length ||
            cartTasks.length
          )
        "
      >
        <h4 class="text-muted">
          Hi <span>{{ user.name }}</span
          >, you have no pending tasks
        </h4>
        <h3>Select the category from the side bar and add a new task</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import axios from "axios";
import Task from "@/components/Task.vue";
export default {
  components: { Title, Task },
  data() {
    return {
      user: "",
      schoolTasks: [],
      personalTasks: [],
      designTasks: [],
      cartTasks: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({ name: "login" });
    } else {
      this.user = JSON.parse(user);
      this.getSchoolTasks();
      this.getPersonalTasks();
      this.getDesignTasks();
      this.getShoppingTasks();
    }
  },

  methods: {
    async getSchoolTasks() {
      let result = await axios.get(
        `http://localhost:3000/tasks?colId=1&userId=${this.user.id}`
      );
      if (result.status == 200 && result.data.length > 0) {
        result.data.forEach((task) => {
          if (task.completed == false) {
            this.schoolTasks.push(task);
          }
        });
      } else {
        console.log("something wrong with api, or no data found");
      }
    },
    async getPersonalTasks() {
      let result = await axios.get(
        `http://localhost:3000/tasks?colId=2&userId=${this.user.id}`
      );
      if (result.status == 200 && result.data.length > 0) {
        result.data.forEach((task) => {
          if (task.completed == false) {
            this.personalTasks.push(task);
          }
        });
      } else {
        console.log("something wrong with api, or no data found");
      }
    },
    async getDesignTasks() {
      let result = await axios.get(
        `http://localhost:3000/tasks?colId=3&userId=${this.user.id}`
      );
      if (result.status == 200 && result.data.length > 0) {
        result.data.forEach((task) => {
          if (task.completed == false) {
            this.designTasks.push(task);
          }
        });
      } else {
        console.log("something wrong with api, or no data found");
      }
    },
    async getShoppingTasks() {
      let result = await axios.get(
        `http://localhost:3000/tasks?colId=4&userId=${this.user.id}`
      );
      if (result.status == 200 && result.data.length > 0) {
        result.data.forEach((task) => {
          if (task.completed == false) {
            this.cartTasks.push(task);
          }
        });
      } else {
        console.log("something wrong with api, or no data found");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  max-width: 720px;
  margin: 0 auto;
  h2 {
    color: #fff;
    margin: 0;
    font-size: 2.6rem;
    text-align: left;
  }
  h1 {
    margin: 60px 0;
    color: rgba(255, 255, 255, 0.747);
    line-height: 1.5;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 2.5rem;
  }
  .tasks {
    border-radius: 10px;
    color: #fff;
    background: #20212c;
    &:not(:last-of-type) {
      margin-bottom: 40px;
    }
    .collection {
      border-radius: 10px;
      background: #272832;
      padding: 15px;
      display: flex;
      align-items: center;
      h3 {
        margin: 0;
      }
      i {
        font-size: 1rem;
        width: 2rem;
        height: 2rem;
        display: grid;
        place-content: center;
        color: #fff;
        margin-right: 1rem;
        transition: 0.2s ease-out;
        border-radius: 5px;
        &.fa-book-open {
          background: var(--skin);
        }
        &.fa-user {
          background: #70c4bf;
        }
        &.fa-paintbrush {
          background: #ae68e6;
        }
        &.fa-cart-shopping {
          background: #cfb452;
        }
      }
    }

    .goto {
      border-top: 1px solid var(--dark-alt);
      padding: 20px 0;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        background: var(--dark-alt);
      }
    }
  }
  .noTasks {
    color: var(--dark-alt);
    margin-top: 200px;
    font-size: 0.9rem;
    text-align: center;
    span {
      color: var(--skin);
    }
  }
}
</style>
