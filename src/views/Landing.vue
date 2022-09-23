<template>
  <div class="landing">
    <div class="container">
      <div class="header">
        <div class="logo">
          <div class="d-flex align-items-center gap-2">
            <i class="fa-solid fa-check"></i>
            <h1>Tasks</h1>
          </div>
          <p>Features</p>
        </div>
        <div class="actions d-md-block d-none">
          <button
            class="btn btn-outline-dark text-light me-3"
            @click="$router.push({ name: 'login' })"
          >
            Login
          </button>
          <button
            class="btn btn-outline-light"
            @click="$router.push({ name: 'signup' })"
          >
            Signup
          </button>
        </div>
      </div>
      <div class="landingBody">
        <h1>Tasks, just tasks <span>.</span></h1>
        <div class="intro">
          <p>
            Keep track of the daily tasks in life and <br />get that
            satisfaction upon completion.
          </p>
          <div class="intro-actions">
            <button @click="$router.push({ name: 'signup' })">
              Get Started
            </button>
            <button>learn More</button>
          </div>
          <img src="../assets/1.png" class="img-fluid mt-5" alt="" />
        </div>
      </div>
    </div>
    <div class="ball d-md-block d-none"></div>
    <div class="darkBall d-md-block d-none"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    let user = localStorage.getItem("user");
    if (user) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style lang="scss" scoped>
.landing {
  width: 100%;
  height: 100vh;
  background: linear-gradient(#181820, #1d1d26);
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    .logo {
      i {
        background: linear-gradient(to right, #d451c8, #fd8692);
        color: white;
        font-size: 24px;
        font-weight: bold;
        padding: 8px;
        border-radius: 10px;
      }
      h1 {
        color: white;
        font-weight: bold;
        margin: 0;
      }
      P {
        margin: 0;
        font-size: 20px;
        color: #ecececa9;
      }
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .actions {
      button {
        padding: 5px 24px;
      }
    }
  }
  .landingBody {
    height: calc(100vh - 90px);
    width: 100%;
    display: grid;
    place-content: center;
    z-index: 4;
    h1 {
      color: white;
      font-size: 3rem;
      span {
        color: var(--gradient-a);
      }
    }
    .intro {
      position: relative;
      p {
        font-size: 1.2rem;
      }
      .intro-actions {
        margin-top: 60px;
        button {
          padding: 10px 30px;
          border-radius: 20px;
          font-size: 1.2rem;
          color: white;
          transition: all 0.3s ease;
          &:hover {
            transform: scale(1.05);
          }
          background: var(--dark);
          &:first-of-type {
            background: linear-gradient(to top right, #be41db, #ff9f7c);
            margin-right: 20px;
          }
        }
      }
    }
  }
  .ball {
    position: fixed;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(to top right, #be41db, #ff9f7c);
    top: 54%;
    left: 10%;
    @media (max-width: 940px) {
      left: 5%;
    }
  }

  .darkBall {
    position: fixed;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: linear-gradient(to top right, #000, #222);
    top: 35%;
    right: 15%;
  }
}
</style>
