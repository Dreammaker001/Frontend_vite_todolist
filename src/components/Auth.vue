<template>
    <div class="root">
        <div>
            <label for="username">Username</label>
            <input class="input" type="text" name="username" v-model="username">
        </div>
        <div>
            <label for="password">Password</label>
            <input class="input password" type="password" name="password" v-model="password">
        </div>
        <button class="button" @click="simpan">Save</button>
        <button class="hapus button" @click="hapus">Hapus</button>
    </div>
</template>

<script>
    export default{
        data : function(){
            return {
                username: '',
                password: ''
            }
        },
        created : function(){
            this.username = localStorage.getItem('user')
            this.password = localStorage.getItem('pass')
        },
        methods : {
            simpan : function(){
                localStorage.setItem('user', this.username)
                localStorage.setItem('pass', this.password)
            },
            hapus: function(){
                localStorage.removeItem('user')
                localStorage.removeItem('pass')
                this.username = ''
                this.password = ''
            }
        }
    }
</script>

<style>
@import url('../Css/style.css');
</style>