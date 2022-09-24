<template>
  <transition name="task-transition">
    <div class="taskForm" v-show="showForm">
      <div class="close" @click="$emit('close')">X</div>
      <div class="done" v-if="done"><i class="fa-solid fa-check"></i></div>
      <form @submit.prevent="addTask">
        <div class="field">
          <label>Task Name </label>
          <input
            type="text"
            placeholder="type task name ..."
            v-model="taskName"
          />
          <span class="text-danger fw-bold" v-if="v$.taskName.$error">
            {{ v$.taskName.$errors[0].$message }}
          </span>
        </div>
        <div class="field">
          <label>Time</label>
          <input type="datetime-local" v-model="taskDate" />
          <span class="text-danger fw-bold" v-if="v$.taskDate.$error">
            {{ v$.taskDate.$errors[0].$message }}
          </span>
        </div>
        <div class="flex"></div>
        <div class="submit">
          <button>Add</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
export default {
  props: ["collection", "user", "showForm"],
  data() {
    return {
      v$: useValidate(),
      taskName: "",
      taskDate: null,
      done: false,
    };
  },
  validations() {
    return {
      taskName: { required },
      taskDate: { required },
    };
  },
  methods: {
    async addTask() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/tasks", {
          name: this.taskName,
          date: this.taskDate.toString(),
          userId: this.user.id,
          colId: Number(this.collection.id),
          completed: false,
        });
        if (result.status == 201) {
          this.done = true;
          setTimeout(() => {
            this.done = false;
            location.reload();
          }, 1500);
        } else {
          console.warn("something went wrong");
        }
      } else {
        console.log("error");
      }
    },
  },
};
</script>

<style lang="scss">
.taskForm {
  position: fixed;
  background: var(--space-grey);
  top: 120px;
  left: 5rem;
  width: 350px;
  height: 80vh;
  padding: 10px;
  color: #fff;
  text-align: left;
  .close {
    position: absolute;
    background: var(--dark-alt);
    width: 40px;
    height: 45px;
    display: grid;
    place-content: center;
    border-radius: 10px;
    right: 10px;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      background: var(--grey);
    }
  }
  .done {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 200px;
    background: rgba(220, 220, 220, 0.448);
    display: grid;
    place-content: center;
    border-radius: 10px;
    i {
      font-size: 3rem;
      color: green;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 40px;
    .field {
      margin: 40px 0;
      label {
        display: block;
        color: var(--grey);
      }
      input {
        border: none;
        outline: none;
        padding-bottom: 5px;
        border-radius: 0;
        border-bottom: 5px solid var(--dark);
        font-size: 1.3rem;
        &:focus {
          outline: none;
          transform: none;
        }
      }
    }
    .flex {
      flex: 1 1 0;
    }
    button {
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.02);
        outline: none;
        border: none;
      }
    }
  }
}

.task-transition-enter-active,
.task-transition-leave-active {
  transition: all 0.8s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.task-transition-enter-from,
.task-transition-leave-to {
  transform: translateY(-900px);
}
</style>
