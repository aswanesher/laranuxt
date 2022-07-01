<template>
    <div class="user" style="margin-top:100px">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <table id="userTable" class="table table-striped table-bordered" style="width: 100%">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telepon</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery"
import axios from 'axios'
import "datatables.net-bs4"

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
            $("#userTable").DataTable({
                data: response.data.data,
                columns: [
                    { data: "id" },
                    { data: "name" },
                    { data: "email" },
                    { data: "phone" },
                ],
            });
        })
        .catch(error => {
            console.log(error)
        })
    },
}
</script>
