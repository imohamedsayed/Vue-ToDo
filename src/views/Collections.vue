<template>
  <div class="container pt-5">
    <div class="collections">
      <Title>Collections</Title>
      <div class="collection-list">
        <div class="row" v-if="collections.length">
          <CollectionItem v-for="col in collections" :key="col.id" :col="col" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import CollectionItem from "../components/CollectionItem.vue";
import axios from "axios";
export default {
  components: { Title, CollectionItem },
  data() {
    return {
      collections: [],
      user: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({ name: "login" });
    } else {
      this.user = JSON.parse(user);
      this.getCollections();
    }
  },
  methods: {
    async getCollections() {
      let result = await axios.get("http://localhost:3000/collections");
      if (result.status == 200) {
        this.collections = result.data;
      } else {
        console.warn("something went wrong while getting collections");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.collections {
  max-width: 720px;
  margin: 0 auto;
  .collection-list {
    margin-top: 10rem;
  }
}
</style>
