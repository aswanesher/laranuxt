<template>
    <div style="margin-top:100px">
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card border-0 shadow rounded-3 my-5">
                    <div class="card-body p-4 p-sm-5">
                        <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                        <form @submit.prevent="login">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" v-model="user.email" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" v-model="user.password" id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                in</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'LoginView',
    data() {
        return {
            loggedIn: localStorage.getItem('loggedIn'),
            token: localStorage.getItem('token'),
            user: [],
            validation: [],
            loginFailed: null
        }
    },
    methods: {
        login() {
            if(this.user.email && this.user.password) {
                axios.post('http://localhost:8000/api/login', {
                    email: this.user.email,
                    password: this.user.password,
                }).then(res => {
                    //console.log(res)
                    if(res.data.meta.code == 200) {
                        localStorage.setItem("loggedIn", "true")
                        localStorage.setItem("token", res.data.data.access_token)
                        this.loggedIn = true
                        return this.$router.push('/')
                    } else {
                        this.loginFailed = true
                    }
                }).catch(error => {
                    console.log(error)
                })
            }

            this.validation = []

            if(!this.user.email) {
                this.validation.email = true
            }

            if(!this.user.password) {
                this.validation.password = true
            }
        }
    },
    mounted() {
        if(this.loggedIn) {
            return this.$router.push('/')
        }
    },
}
</script>
