<template>
<div>
  <div class="admin">
      <h1>The Upload Page!</h1>
    <div class="heading">
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="File Name">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <p class="message">Upload Successful! Have a better day!</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'upload',
  data() {
    return {
      title: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('file', this.file, this.file.name)
        let r1 = await axios.post('/api/documents', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        //console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
  },    
}
</script>

<style scoped>
.message{
  font-size: 2em;
  color: green;
}

</style>
