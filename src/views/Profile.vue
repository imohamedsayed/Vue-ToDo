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
          </div>
          <div class="action">
            <button>Edit</button>
          </div>
        </div>
        <label>Email</label>
        <div class="field">
          <div class="inputting">
            <input type="email" v-model="userEmail" />
          </div>
          <div class="action">
            <button>Edit</button>
          </div>
        </div>
        <label>Password</label>
        <div class="field">
          <div class="inputting">
            <input type="password" v-model="userPassword" />
          </div>
          <div class="action">
            <button>Change</button>
          </div>
        </div>
      </form>

      <div class="signOut">
        <button>Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
export default {
  data() {
    return {
      user: "",
      userName: "",
      userEmail: "",
      userPassword: "",
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
  components: { Title },
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
