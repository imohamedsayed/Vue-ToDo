<template>
  <div class="col-lg-4 col-md-6 col-12 mb-4">
    <div class="collection" @click="redirectMe">
      <i class="fa-solid fa-book-open" v-if="col.id == 1"></i>
      <i class="fa-solid fa-user" v-if="col.id == 2"></i>
      <i class="fa-solid fa-paintbrush" v-if="col.id == 3"></i>
      <i class="fa-solid fa-cart-shopping" v-if="col.id == 4"></i>

      <h2>{{ col.name }}</h2>
      <div class="prog">
        <span v-if="indicator == 2"
          >{{ completedTasksNumber }}/{{ tasksNumber }} done</span
        >
        <span v-if="indicator == 1">There is no tasks</span>
        <span v-if="indicator == 3">All done</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["col"],
  data() {
    return {
      tasksNumber: 0,
      completedTasksNumber: 0,
      user: "",
      indicator: 0,
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getTasksStats();
  },
  methods: {
    async getTasksStats() {
      let result = await axios.get(
        `http://localhost:3000/tasks?userId=${this.user.id}&colId=${this.col.id}`
      );
      if (result.status == 200) {
        this.tasksNumber = result.data.length;
        result.data.forEach((task) => {
          if (task.completed) {
            this.completedTasksNumber++;
          }
        });

        if (this.tasksNumber == 0) {
          this.indicator = 1;
        } else if (this.tasksNumber > this.completedTasksNumber) {
          this.indicator = 2;
        } else {
          this.indicator = 3;
        }
      } else {
        console.warn("Something went wrong while getting task statistics..");
      }
    },
    redirectMe() {
      this.$router.push({ name: this.col.name });
    },
  },
};
</script>

<style lang="scss" scoped>
.collection {
  background: var(--space-grey);
  color: white;
  text-align: left;
  padding: 20px 30px;
  border-radius: 15px;
  cursor: pointer;
  h2 {
    margin-bottom: 10px;
    text-transform: capitalize;
  }
  i {
    font-size: 2rem;
    width: 4rem;
    height: 4rem;
    display: grid;
    place-content: center;
    color: #fff;
    margin-right: 1rem;
    transition: 0.2s ease-out;
    border-radius: 5px;
    margin-bottom: 40px;
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
  .prog {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      color: var(--grey);
    }
  }
}
</style>
