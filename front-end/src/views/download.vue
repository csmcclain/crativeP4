<template>
<div class="download">
    <div class="file" v-for="item in items" :key="item.id">
        <button @click="remove(item)">X</button>
        <button @click="rename(item)">Rename</button>
        <button><a :href="item.path" download>Download</a></button>
        <div class="editItem" v-if="item === findItem">
          <input type="text" id="editText" :value="item.title">
          <button @click="save(item)">Save</button>
        </div>
        <div v-else>
          <p class="title">{{item.title}}</p>
        </div>
    </div>

    <div></div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     items: [],
     findItem: null,
     findTitle: "",
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    rename(item){
      item.boolean = true;
      this.findItem = item;
    },
    async remove(item){
      try {
        await axios.delete("/api/items/" + item._id);
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async save(item) {
      var input = document.getElementById("editText").value;
      try {
        await axios.put("/api/items/" + item._id, {
          title: input
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.file{
  display: flex;
}

.title {
  padding-left: .3em;
}

button{
  padding: 0px !important;
}
</style>
