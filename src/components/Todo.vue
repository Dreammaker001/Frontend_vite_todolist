<template>
  <!-- <div>
    Budi {{nilai1}}<button @click="nilai1++">klik</button>
    Budi {{nilai2}}<button @click="nilai2++">klik</button>
    Budi {{nilai3}}<button @click="nilai3++">klik</button>
  </div>
  <button @click="tambahAll">Tambah All</button> -->

  <div>
    <div><h1>Berikut adalah daftar tugas kita</h1></div>
    <ul>
      <!-- v-for adalah perulangan -->
      <li v-for="item in todos">{{item.list}} <button @click="hapus(item.id)">X</button></li>
    </ul>
    <input type="text" v-model="text">
    <button @click="tambah">Add</button>
  </div>
</template>

<script>
let ws
import axios from 'axios'
  export default{
      data : function(){
        return {
          nilai1 : 0,
          nilai2 : 0,
          nilai3: 0,
          todos: [
            // {desc: 'Makan Durian'},
            // {desc: 'Makan Tempe'},
            // {desc: 'Coding JS'}
          ],
          text: ""
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
          this.todos = hasil[0]
        }
        ws.onclose = function() {
          ws = null;
        }

        var username = localStorage.getItem('user')
        var pass = localStorage.getItem('pass')
        axios.get('http://localhost:3000/todo', {headers:{username: username, password:pass}})
        .then((result)=>{
          this.todos = result.data
          // ws.send(JSON.stringify(result))
        })

      },
      methods: {
        tambah: function(){
          let newItem = {deskripsi:this.text}
          var username = localStorage.getItem('user')
          var pass = localStorage.getItem('pass')
          axios.post('http://localhost:3000/todo', newItem, {headers:{username: username, password:pass}})
            .then((result)=>{
              // this.todos = result.data
              ws.send(JSON.stringify(result))
            })
        },
        hapus : function(id){
          var username = localStorage.getItem('user')
          var pass = localStorage.getItem('pass')
          axios.delete(`http://localhost:3000/todo/${id}`, {headers:{username: username, password:pass}})
          .then((result)=>{
            // location.reload()
            ws.send(JSON.stringify(result))
          })
        }
      }
    }
</script>

<style scoped>
  
</style>
