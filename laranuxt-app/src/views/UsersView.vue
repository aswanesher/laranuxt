<template>
    <div class="user" style="margin-top:100px">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telepon</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.email">
                                <th scope="row">{{ user.id }}</th>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.phone }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'UserView',
    data() {
        return {
            loggedIn: localStorage.getItem("loggedIn"),
            token: localStorage.getItem("token"),
            users: [],
        }
    },
    mounted() {
        axios.get('http://localhost:8000/api/users', {headers: {'Authorization': 'Bearer '+this.token}})
        .then(response => {
            this.users = response.data.data
        })
        .catch(error => {
            console.log(error)
        })
    },
}
</script>
