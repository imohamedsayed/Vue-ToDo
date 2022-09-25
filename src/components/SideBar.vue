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
    <div class="menu mt-3">
      <h3 class="mt-3 mb-4">Collections</h3>
      <router-link :to="{ name: 'school' }" class="button">
        <div class="text-center">
          <i class="fa-solid fa-book-open"></i>
        </div>
        <span class="text">School</span>
      </router-link>
      <router-link :to="{ name: 'personal' }" class="button">
        <div class="text-center">
          <i class="fa-solid fa-user"></i>
        </div>
        <span class="text">Personal</span>
      </router-link>
      <router-link :to="{ name: 'design' }" class="button">
        <div class="text-center">
          <i class="fa-solid fa-paintbrush"></i>
        </div>
        <span class="text">Design</span>
      </router-link>
      <router-link :to="{ name: 'groceries' }" class="button">
        <div class="text-center">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <span class="text">Groceries</span>
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
        &.fa-home {
          background: #96a7e4;
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
      .text {
        color: #fff;
        transition: 0.2s ease-out;
      }

      &:hover,
      &.router-link-exact-active {
        background-color: #272833;
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
