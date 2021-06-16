import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import Todo from './components/Todo.vue'
import Users from './components/Users.vue'
import Auth from './components/Auth.vue'

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes:[
      { path: '/', component: Auth },
        { path: '/todo', component: Todo },
        { path: '/users', component: Users },
    ], // short for `routes: routes`
  })

createApp(App).use(router).mount('#app')
