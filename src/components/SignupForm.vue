<template>
  <form @submit.prevent="checkEmailIfExisted">
    <input type="text" placeholder="Name" v-model="userName" />
    <span class="text-danger fw-bold" v-if="v$.userName.$error">
      {{ v$.userName.$errors[0].$message }}
    </span>
    <input type="email" placeholder="Email" v-model="userEmail" />
    <span class="text-danger fw-bold" v-if="v$.userEmail.$error">
      {{ v$.userEmail.$errors[0].$message }}
    </span>
    <input type="password" placeholder="Password" v-model="userPassword" />
    <span class="text-danger fw-bold" v-if="v$.userPassword.$error">
      {{ v$.userPassword.$errors[0].$message }}
    </span>
    <input
      type="password"
      placeholder="Confirm Password"
      v-model="userPasswordConform"
    />
    <span class="text-danger fw-bold" v-if="v$.userPasswordConform.$error">
      {{ v$.userPasswordConform.$errors[0].$message }}
    </span>
    <div class="mt-4">
      <button type="submit">Sign Up</button>
    </div>
    <div class="info">
      <p>
        Already Have an account?
        <router-link :to="{ name: 'login' }">Login now</router-link>
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
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import axios from "axios";
import Notification from "./Notification.vue";
export default {
  data() {
    return {
      v$: useValidate(),
      userName: "",
      userEmail: "",
      userPassword: "",
      userPasswordConform: "",
      showNotification: false,
      theme: "",
      notify: "",
    };
  },

  validations() {
    return {
      userName: { required, minLength: minLength(5) },
      userPassword: { required, minLength: minLength(8) },
      userEmail: { required, email },
      userPasswordConform: {
        required,
        minLength: minLength(8),
        sameAs: sameAs(this.userPassword),
      },
    };
  },
  methods: {
    async checkEmailIfExisted() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.userEmail}`
      );
      if (result.status == 200) {
        if (result.data.length != 1) {
          this.SignupUser();
        } else {
          this.theme = "error";
          this.notify = "this Email Is Already Existed";
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
        }
      } else {
        console.warn("Something went wrong while checking email");
        return false;
      }
    },
    async SignupUser() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/users", {
          name: this.userName.trim(),
          email: this.userEmail.trim(),
          password: this.userPassword.trim(),
        });
        if (result.status == 201) {
          localStorage.setItem("user", JSON.stringify(result.data));
          this.$router.push({ name: "home" });
        }
      } else {
        this.theme = "error";
        this.notify = "There is error or messing sign up data";
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

<style lang="scss">
form {
  max-width: 520px;
  input {
    width: 100%;
    margin: 20px 0;
    height: 60px;
    border-radius: 20px;
    padding-left: 10px;
    background: transparent;
    outline: none;
    border: 4px solid var(--dark-alt);
    font-size: 1rem;
    color: #ffff;
    &::placeholder {
      color: #d1d1d2;
    }
    transition: all 0.3s ease;
    &:focus {
      transform: scale(1.05);
    }
  }
  button {
    background: linear-gradient(to top right, #be41db, #ff9f7c);
    width: 100%;
    height: 60px;
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    border-radius: 20px;
  }
  .info {
    margin-top: 60px;
    P {
      color: #b1b1b4;
      font-size: 1.2rem;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
}
</style>
