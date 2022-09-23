<template>
  <aside :class="{ expanded: showMenu == true }">
    <div class="logo">
      <img src="../assets/logo.png" alt="logo" />
    </div>
    <div class="menu-toggler-wrap">
      <button class="menu-toggler" @click="toggleMenu">
        <i class="fa-solid fa-angles-right" v-if="!showMenu"></i>
        <i class="fa-solid fa-angles-left" v-else></i>
      </button>
    </div>
    <h3>Collections</h3>
    <div class="menu">
      <router-link :to="{ name: 'home' }" class="button" @click="goingHome">
        <div class="text-center">
          <i class="fa-solid fa-home"></i>
        </div>
        <span class="text">Home</span>
      </router-link>
      <router-link :to="{ name: 'about' }" class="button">
        <div class="text-center">
          <i class="fa-solid fa-user"></i>
        </div>
        <span class="text">Profile</span>
      </router-link>
    </div>
    <div class="flex"></div>
    <div class="menu">
      <div class="button cursor-pointer" @click="logout">
        <div class="text-center">
          <i
            class="fa-solid fa-arrow-right-from-bracket"
            style="transform: rotate(-180deg)"
          ></i>
        </div>
        <span class="text">Logout</span>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      showMenu: localStorage.getItem("isExpanded") === "true",
      modalActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
      localStorage.setItem("isExpanded", this.showMenu);
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    goingHome() {
      if (!localStorage.getItem("user")) {
        this.toggleModal();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  background-color: #21212b;
  color: white;
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: calc(100vh - 60px);
  padding: 1rem;
  transition: 0.2s ease-out;
  &.expanded {
    width: 270px;
    .menu-toggler-wrap {
      top: -3rem;
      .menu-toggler {
        &:hover {
          .fa-solid {
            transform: translateX(-0.5rem);
          }
        }
      }
    }
    h3,
    .button .text {
      opacity: 1;
    }
  }
  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
  .flex {
    flex: 1 1 0;
  }
  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }
  .menu-toggler-wrap {
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
    position: relative;
    top: 0;
    transition: 0.2s ease-out;
    .menu-toggler {
      font-size: 2rem;
      color: white;
      background: transparent;
      border: none;
      .fa-solid {
        transition: all 0.2s ease-out;
      }
      &:hover {
        .fa-solid {
          color: var(--skin);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }
  h3 {
    color: #d1d1d2;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .menu {
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;
      &:not(:last-of-type) {
        margin-bottom: 0.2rem;
      }
      i {
        font-size: 2rem;
        width: 2rem;
        color: #fff;
        margin-right: 1rem;
        transition: 0.2s ease-out;
      }
      .text {
        color: #fff;
        transition: 0.2s ease-out;
      }

      &:hover,
      &.router-link-exact-active {
        background-color: #272833;
        i,
        .text {
          color: var(--skin);
        }
      }
      &.router-link-exact-active {
        border-right: 5px solid var(--skin);
      }
    }
  }
  .cursor-pointer {
    cursor: pointer;
  }
}
</style>
