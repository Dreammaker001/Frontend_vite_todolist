<template>
  <div>
    <div style="margin-top:40px"><h1>Berikut adalah daftar semua pengguna</h1></div>
    <ul>
      <!-- v-for adalah perulangan -->
      <li v-for="item in todos">{{item.list}} <button @click="hapus(item.id)">X</button></li>
    </ul>
    <input type="text" v-model="username">
    <input type="password" v-model="password">
    <button @click="tambah">Add</button>
  </div>
</template>

<script>
import axios from 'axios'
  export default{
      data : function(){
        return {
          users: [],
          username: "",
          password:""
        }
      },
      created: function(){
        // alert("hai")
        axios.get('http://localhost:3000/users')
        .then((result)=>{
          this.users = result.data
        })
      },
      methods: {
        tambah: function(){
          let newItem = {deskripsi:this.text}
          axios.post('http://localhost:3000/users', newItem)
            .then((res)=>{
              this.users.push({list:this.text})
            })
        },
        hapus : function(id){
          axios.delete(`http://localhost:3000/users/${id}`)
          .then(()=>{
            location.reload()
          })
        }
      }
    }
</script>

<style scoped>
  
</style>
