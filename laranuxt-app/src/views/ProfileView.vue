<template>
    <div class="profile" style="margin-top:100px">
        <div class="container">
            <div class="row">
                <section v-if="profiles.length > 0">
                    <div class="row mb-2" v-for="profile in profiles" :key="profile.id">
                        <div class="col-md-12">
                            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div class="col p-4 d-flex flex-column position-static">
                                <h3 class="mb-0">{{ profile.first_name }}</h3>
                                <div class="mb-1 text-muted">{{ profile.email }}</div>
                                </div>
                                <div class="col-auto d-none d-lg-block">
                                <img :data-src="profile.avatar" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <infinite-loading @infinite="infiniteHandler">
                    <div slot="no-more">Tidak ada data lain ditampilkan :)</div>
                </infinite-loading>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import InfiniteLoading from 'vue-infinite-loading'

export default {
    name:'ProfileView',
    components: {InfiniteLoading},
    data() {
        return {
            profiles: [],
            page: 1,
        }
    },
    methods: {
        infiniteHandler($state) {
            setTimeout(() => {
                this.loading = false;
            }, 1500);
            axios.get('http://localhost:8080/api/users', {
                params: {
                    page: this.page,
                },
                withCredentials: false,
            }).then(({ data }) => {
                if (data.data.length) {
                    this.page += 1;
                    this.profiles.push(...data.data);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        },
    },
}
</script>
