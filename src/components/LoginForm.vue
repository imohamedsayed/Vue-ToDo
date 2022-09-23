<template>
  <form @submit.prevent="login">
    <input type="email" placeholder="Email" v-model="userEmail" />
    <span class="text-danger fw-bold" v-if="v$.userEmail.$error">
      {{ v$.userEmail.$errors[0].$message }}
    </span>
    <input type="password" placeholder="Password" v-model="userPassword" />
    <span class="text-danger fw-bold" v-if="v$.userPassword.$error">
      {{ v$.userPassword.$errors[0].$message }}
    </span>
    <div class="mt-4">
      <button type="submit">Sign in</button>
    </div>
    <div class="info">
      <p>
        Don't have an account?
        <router-link :to="{ name: 'signup' }">Create Account</router-link>
      </p>
    </div>
  </form>
  <teleport to="body">
    <Notification :theme="theme" :showNotification="showNotification">
      <p>{{ notify }}</p>
    </Notification>
  </teleport>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import axios from "axios";
import Notification from "./Notification.vue";
export default {
  data() {
    return {
      v$: useValidate(),
      userEmail: "",
      userPassword: "",
      showNotification: false,
      theme: "",
      notify: "",
    };
  },
  validations() {
    return {
      userEmail: { required, email },
      userPassword: { required },
    };
  },
  methods: {
    async login() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.userEmail.trim()}&password=${this.userPassword.trim()}`
        );
        if (result.status == 200) {
          if (result.data.length > 0) {
            localStorage.setItem("user", JSON.stringify(result.data[0]));
            this.$router.push({ name: "home" });
          } else {
            this.theme = "error";
            this.notify = "Wrong Email or Password";
            this.showNotification = true;
            setTimeout(() => {
              this.showNotification = false;
            }, 2000);
          }
        } else {
          this.theme = "error";
          this.notify = "Something went wrong, try again";
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
        }
      } else {
        this.theme = "error";
        this.notify = "There is error or messing Login data";
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      }
    },
  },
  components: { Notification },
};
</script>
