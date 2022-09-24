<template>
  <div class="add">
    <button>
      <i class="fa-solid fa-plus" @click="showForm = !showForm"></i>
    </button>
    <h2>Add Task</h2>
    <TaskFrom
      :collection="collection"
      :user="user"
      :showForm="showForm"
      @close="showForm = !showForm"
    />
  </div>
</template>

<script>
import TaskFrom from "./TaskFrom.vue";
export default {
  props: ["collection", "user"],
  data() {
    return {
      showForm: false,
    };
  },
  components: { TaskFrom },
};
</script>

<style lang="scss" scoped>
.add {
  display: flex;
  align-items: center;
  margin-top: 50px;
  gap: 20px;
  padding: 20px 10px;
  border-top: 1px solid var(--dark-alt);
  border-bottom: 1px solid var(--dark-alt);
  button {
    height: 50px;
    width: 50px;
    border-radius: 10px;
    background: linear-gradient(to right, #d451c8, #fd8692);
    color: white;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
  h2 {
    margin: 0;
    color: #fff;
  }
}
</style>
