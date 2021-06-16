<template>
  <router-link to="/">Halaman Auth</router-link>
  &nbsp;
  <router-link to="/todo">Halaman Todo</router-link>
  &nbsp;
  <router-link to="/users" >Halman Users</router-link>

  <!-- <Todo msg="Hello Vue 3 + Vite" />
  <Users/> -->

  <!-- cek file main.js untuk view router-->
  <router-view></router-view> 
</template>

<script setup>
import Todo from './components/Todo.vue'
import Users from './components/Users.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>

</style>
