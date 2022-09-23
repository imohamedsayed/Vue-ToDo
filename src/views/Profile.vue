<template>
  <div class="container pt-5">
    <div class="profile">
      <Title>My Account</Title>
      <div class="user">
        <div class="img-box">
          <img src="../assets/user.png" class="img-fluid" alt="" />
        </div>
        <div class="name text-start">
          <h2>{{ user.name }}</h2>
          <span>Free</span>
        </div>
      </div>

      <form @submit.prevent="" class="text-start">
        <label>Display Name</label>
        <div class="field">
          <div class="inputting">
            <input type="text" v-model="userName" />
            <span class="text-danger fw-bold" v-if="v$.userName.$error">
              {{ v$.userName.$errors[0].$message }}
            </span>
          </div>
          <div class="action">
            <button @click="editName">Edit</button>
          </div>
        </div>
        <label>Email</label>
        <div class="field">
          <div class="inputting">
            <input type="email" v-model="userEmail" />
            <span class="text-danger fw-bold" v-if="v$.userEmail.$error">
              {{ v$.userEmail.$errors[0].$message }}
            </span>
          </div>
          <div class="action">
            <button @click="checkEmailIfExisted">Edit</button>
          </div>
        </div>
        <label>Password</label>
        <div class="field">
          <div class="inputting">
            <input type="password" v-model="userPassword" />
            <span class="text-danger fw-bold" v-if="v$.userPassword.$error">
              {{ v$.userPassword.$errors[0].$message }}
            </span>
          </div>
          <div class="action">
            <button @click="editPassword">Change</button>
          </div>
        </div>
      </form>
      <div class="signOut">
        <button @click="logout">Sign Out</button>
      </div>
    </div>
  </div>
  <teleport to="body">
    <Notification :theme="theme" :showNotification="showNotification">
      <p>{{ notify }}</p>
    </Notification>
  </teleport>
</template>

<script>
import Title from "../components/Title.vue";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
import Notification from "@/components/Notification.vue";
export default {
  components: { Title, Notification },
  data() {
    return {
      v$: useValidate(),
      user: "",
      userName: "",
      userEmail: "",
      userPassword: "",
      showNotification: false,
      theme: "",
      notify: "",
    };
  },
  validations() {
    return {
      userName: { required, minLength: minLength(10) },
      userEmail: { required, email },
      userPassword: { required, minLength: minLength(8) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({ name: "login" });
    } else {
      this.user = JSON.parse(user);
      this.userName = JSON.parse(user).name;
      this.userPassword = JSON.parse(user).password;
      this.userEmail = JSON.parse(user).email;
    }
  },
  methods: {
    async editName() {
      this.v$.userName.$validate();
      if (!this.v$.userName.$error) {
        let result = await axios.put(
          `http://localhost:3000/users/${this.user.id}`,
          {
            name: this.userName,
            email: this.user.email,
            password: this.user.password,
          }
        );
        if (result.status == 200) {
          localStorage.setItem("user", JSON.stringify(result.data));
          this.theme = "success";
          this.notify = `Your name updated to ${this.userName} successfully`;
          this.showNotification = true;

          setTimeout(() => {
            this.showNotification = false;
            location.reload();
          }, 1500);
        } else {
          this.theme = "error";
          this.notify = "Something went wrong, try again.";
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 1500);
        }
      } else {
        this.theme = "error";
        this.notify = "Error In Name Field";
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 1500);
      }
    },
    async checkEmailIfExisted() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.userEmail}`
      );
      if (result.status == 200) {
        if (result.data.length != 1) {
          this.editEmail();
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
      }
    },
    async editEmail() {
      this.v$.userEmail.$validate();
      if (!this.v$.userEmail.$error) {
        let result = await axios.put(
          `http://localhost:3000/users/${this.user.id}`,
          {
            name: this.user.name,
            email: this.userEmail,
            password: this.user.password,
          }
        );
        if (result.status == 200) {
          localStorage.setItem("user", JSON.stringify(result.data));
          this.theme = "success";
          this.notify = `Your Email Address Updated`;
          this.showNotification = true;

          setTimeout(() => {
            this.showNotification = false;
            location.reload();
          }, 1500);
        } else {
          this.theme = "error";
          this.notify = "Something went wrong, try again.";
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 1500);
        }
      } else {
        this.theme = "error";
        this.notify = "Error In Email Field";
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 1500);
      }
    },
    async editPassword() {
      this.v$.userPassword.$validate();
      if (!this.v$.userPassword.$error) {
        let result = await axios.put(
          `http://localhost:3000/users/${this.user.id}`,
          {
            name: this.user.name,
            email: this.user.email,
            password: this.userPassword,
          }
        );
        if (result.status == 200) {
          localStorage.setItem("user", JSON.stringify(result.data));
          this.theme = "success";
          this.notify = `Password Updated successfully`;
          this.showNotification = true;

          setTimeout(() => {
            this.showNotification = false;
            location.reload();
          }, 1500);
        } else {
          this.theme = "error";
          this.notify = "Something went wrong, try again.";
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 1500);
        }
      } else {
        this.theme = "error";
        this.notify = "Error In Password Field";
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 1500);
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .user {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 40px;
    margin-top: 100px;
    .img-box {
      img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
      }
    }
    .name {
      h2 {
        color: white;
      }
      span {
        color: #fff;
        padding: 5px 8px;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: 10px;
        border: 2px solid var(--gradient-b);
      }
    }
  }
  button {
    width: 150px;
    height: 50px;
    background: #414052;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    color: white;
    &:hover {
      background: #5f5e74;
    }
  }
  form {
    background: var(--space-grey);
    max-width: 100%;
    width: 100% !important;
    padding: 20px;
    margin-top: 40px;
    label {
      color: var(--grey);
    }
    .field {
      display: flex;
      align-items: center;
      > div {
        flex: 1 1 0;
      }
      .inputting {
        input {
          border: none;
          outline: none;
          padding-bottom: 5px;
          border-radius: 0;
          border-bottom: 5px solid var(--dark);
          &:focus {
            outline: none;
            transform: none;
          }
        }
      }
      .action {
        text-align: right;
      }
    }
  }
  .signOut {
    margin-top: 40px;
  }
}
</style>
