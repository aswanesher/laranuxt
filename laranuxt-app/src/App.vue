<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link>
    </nav> -->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <router-link :to="{name: 'home'}" class="navbar-brand">LARANUXT</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{name: 'home'}" class="nav-link">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">TENTANG</router-link>
          </li>
          <li>
            <router-link v-if="!loggedIn"  class="nav-link" to="/login">LOGIN</router-link>
            <span v-else class="nav-link" @click="logout" style="cursor:pointer">LOGOUT</span>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            loggedIn: localStorage.getItem("loggedIn"),
            token: localStorage.getItem("token"),
            user: []
        }
    },
    /* created() {
        axios.get('http://localhost:8000/api/user', {headers: {'Authorization': 'Bearer '+this.token}})
        .then(response => {
            console.log(response)
            this.user = response.data.data
        })
    }, */
    methods: {
        getLoggedIn() {
            this.loggedIn = localStorage.getItem("loggedIn")
        },
        logout() {
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then(response => {
                console.log(response)
                localStorage.removeItem("loggedIn")
                localStorage.removeItem("token")
                return this.$router.push('/login')
            })
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.getLoggedIn(),
                axios.get('http://localhost:8000/api/user', {headers: {'Authorization': 'Bearer '+this.token}})
                .then(response => {
                    console.log(response)
                    this.user = response.data.data
                })
            }
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
