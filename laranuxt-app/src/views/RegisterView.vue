<template>
    <div id="register" style="margin-top:100px">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-8 mx-auto">
                    <div class="card border-1 rounded-3 my-5">
                        <div class="card-body p-4 p-sm-5">
                            <div v-if="isValid && $v.user.email.$error" class="mt-2 alert alert-danger">
                                <span v-if="!$v.user.email.required">Kolom email wajib diisi</span>
                                <span v-if="!$v.user.email.email">Email tidak valid</span>
                            </div>
                            <div v-if="isValid && $v.user.name.$error" class="mt-2 alert alert-danger">
                                <span v-if="!$v.user.name.required">Kolom nama wajib diisi</span>
                                <span v-if="!$v.user.name.minLength">Kolom nama Minimal 6 karakter</span>
                            </div>
                            <div v-if="isValid && $v.user.phone.$error" class="mt-2 alert alert-danger">
                                <span v-if="!$v.user.phone.required">Kolom telepon wajib diisi</span>
                                <span v-if="!$v.user.phone.minLength">Kolom telepon Minimal 7 karakter</span>
                            </div>
                            <div v-if="isValid && $v.user.password.$error" class="mt-2 alert alert-danger">
                                <span v-if="!$v.user.password.required">Kolom password wajib diisi</span>
                                <span v-if="!$v.user.password.minLength">Kolom password Minimal 6 karakter</span>
                            </div>
                            <form @submit.prevent="signup">
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="user.email" :class="{ 'is-invalid': isValid && $v.user.email.$error }">
                                    <label for="floatingInput">Email address</label>
                                    <div v-if="isValid && !$v.user.email.required" class="mt-2 alert alert-danger">Masukkan Email</div>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="John Doe" v-model="user.name" :class="{ 'is-invalid': isValid && $v.user.name.$error }">
                                    <label for="floatingInput">Name</label>
                                    <div v-if="isValid && !$v.user.name.required" class="mt-2 alert alert-danger">Masukkan Nama</div>

                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="081xxx" v-model="user.phone" :class="{ 'is-invalid': isValid && $v.user.phone.$error }">
                                    <label for="floatingInput">Phone</label>
                                    <div v-if="isValid && !$v.user.phone.required" class="invalid-feedback">Masukkan No. Telepon</div>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="user.password" :class="{ 'is-invalid': isValid && $v.user.password.$error }">
                                    <label for="floatingPassword">Password</label>
                                    <div v-if="isValid && !$v.user.password.required" class="invalid-feedback">Masukkan Password</div>
                                </div>
                                <div class="d-grid">
                                    <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Register</button>
                                    <router-link class="btn btn-secondary btn-login text-uppercase fw-bold mt-2" to="/login">Signin</router-link>
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
import { required, email, minLength } from "vuelidate/lib/validators"

export default {
    name:'RegisterView',
    data() {
        return {
            loggedIn: localStorage.getItem("loggedIn"),
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
            user: [],
            signUpFailed: null,
            isValid: false
        }
    },
    validations: {
        user: {
            name: {
                required,
                minLength: minLength(5)
            },
            email: {
                required,
                email
            },
            phone: {
                required,
                minLength: minLength(7)
            },
            password: {
                required,
                minLength: minLength(6)
            },
        }
    },
    methods: {
        signup() {
            //console.log(this.user);
            this.isValid = true;

            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            axios.get('http://localhost:8000/sanctum/csrf-cookie')
            .then(response => {
                console.log(response)
                axios.post('http://localhost:8000/api/register', {
                    email: this.user.email,
                    password: this.user.password,
                    name: this.user.name,
                    phone: this.user.phone
                })
                .then(res => {
                    if(res.data.meta.code == 200) {
                        localStorage.setItem("loggedIn", "true")
                        localStorage.setItem("token", res.data.data.access_token)
                        localStorage.setItem("userId", res.data.data.user)
                        this.loggedIn = true
                        return this.$router.push('/')
                    } else {
                        this.signUpFailed = true
                    }
                }).catch(error => {
                    console.log(error)
                })
            })
        }
    },
}
</script>
