<template>
  <!-- <div>
    Budi {{nilai1}}<button @click="nilai1++">klik</button>
    Budi {{nilai2}}<button @click="nilai2++">klik</button>
    Budi {{nilai3}}<button @click="nilai3++">klik</button>
  </div>
  <button @click="tambahAll">Tambah All</button> -->

  <div>
    <div>Selamat Datang</div>
    <ul>
      <!-- v-for adalah perulangan -->
      <li v-for="item in todos">{{item.list}} <button @click="hapus(item.id)">X</button></li>
    </ul>
    <input type="text" v-model="text">
    <button @click="tambah">Add</button>
  </div>
</template>

<script>
import axios from 'axios'
  export default{
      data : function(){
        return {
          nilai1 : 0,
          nilai2 : 0,
          nilai3: 0,
          todos: [
            {desc: 'Makan Durian'},
            {desc: 'Makan Tempe'},
            {desc: 'Coding JS'}
          ],
          text: ""
        }
      },
      created: function(){
        // alert("hai")
        axios.get('http://localhost:3000/todo')
        .then((result)=>{
          this.todos = result.data
        })
      },
      methods: {
        tambah: function(){
          let newItem = {deskripsi:this.text}
          axios.post('http://localhost:3000/todo', newItem)
            .then((res)=>{
              this.todos.push({list:this.text})
            })
        },
        hapus : function(id){
          axios.delete(`http://localhost:3000/todo/${id}`)
          .then(()=>{
            location.reload()
          })
        }
      }
    }
</script>

<style scoped>
  
</style>
