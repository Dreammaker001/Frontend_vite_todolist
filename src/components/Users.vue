<template>
  <div>
    <div style="margin-top:40px"><h1>Berikut adalah daftar semua pengguna</h1></div>
    <ul>
      <!-- v-for adalah perulangan -->
      <p style="color:red">{{messageDelete}}</p>
      <li v-for="item in users">{{item.username}} <button @click="hapus(item.id)">X</button></li>
    </ul>
    <div class="root">
      <div>
        <p style="color:red">{{message}}</p>
        <label for="username">Username</label>
        <input class="input" type="text" v-model="username" name="username">
      </div>
      <div>
        <label for="password">Password</label>
        <input class="input password" type="password" v-model="password" name="password">
      </div>
      <button class="button" @click="tambah">Add</button>
    </div>
  </div>
</template>

<script>
let ws
import axios from 'axios'
  export default{
      data : function(){
        return {
          users: [],
          username: "",
          password:"",
          message:"",
          messageDelete:""
        }
      },
      created: function(){
        if (ws) {
          ws.onerror = ws.onopen = ws.onclose = null;
          ws.close();
        }

        ws = new WebSocket('ws://localhost:3000/');
        ws.onopen = () => {
          console.log('Connection opened!');
        }
        ws.onmessage = ({ data }) =>{ 
          var hasil = Object.values(JSON.parse(data))
          this.users = hasil[0]
        }
        ws.onclose = function() {
          ws = null;
        }


        var username = localStorage.getItem('user')
        var pass = localStorage.getItem('pass')
        axios.get('http://localhost:3000/users',{headers:{username: username, password:pass}})
        .then((result)=>{
          this.users = result.data
        })
      },
      methods: {
        tambah: function(){
          let newItem = {username:this.username, password: this.password}
          var username = localStorage.getItem('user')
          var pass = localStorage.getItem('pass')
          axios.post('http://localhost:3000/users', newItem, {headers:{username: username, password:pass}})
            .then((res)=>{
              if(res.data == "terpakai"){
                this.message = "Username Sudah Terpakai"
              }else{
                this.message = ""
                // this.users = res.data
                ws.send(JSON.stringify(res))
              }
            })
        },
        hapus : function(id){
          var username = localStorage.getItem('user')
          var pass = localStorage.getItem('pass')
          axios.delete(`http://localhost:3000/users/${id}`,{headers:{username: username, password:pass}})
          .then((res)=>{
            if(res.data == "gagal"){
              this.messageDelete = "Gagal menghapus karena hanya tersisa 1 record"
            }else{
              this.messageDelete = ""
              // this.users = res.data
              ws.send(JSON.stringify(res))
            }
          })
        }
      }
    }
</script>

<style>
  @import url('../Css/style.css');
</style>
