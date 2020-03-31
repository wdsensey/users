<template>
    <div class="wrapper">
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <select v-model="perPage" class="form-control" @change="resetPage">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <Search :allData="allData" @searchUser="searchUser" />
                </div>
            </div>
            <div class="row" v-if="searchableUser">
                <router-link :to="{ name: 'UserDetails', params: { id: searchableUser.id }}" class="col-12">
                    <div class="card">
                        <div class="row align-items-center">
                            <div class="col-4">
                                <img :src="searchableUser.avatar" alt="" class="img-fluid w-100">
                            </div>
                            <div class="col-8">
                                <p>{{ searchableUser.first_name }}</p>
                                <p>{{ searchableUser.email }}</p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <template v-else>
                <div class="row">
                    <router-link :to="{ name: 'UserDetails', params: { id: item.id } }" class="col-6"
                                 v-for="item in data" :key="item.id" @click="emitUserDetails(item.id)">
                        <div class="card">
                            <div class="row align-items-center">
                                <div class="col-4">
                                    <img :src="item.avatar" alt="" class="img-fluid w-100">
                                </div>
                                <div class="col-8">
                                    <p>{{ item.first_name }}</p>
                                    <p>{{ item.email }}</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="pagination">
                    <button class="btn btn-outline-secondary" :disabled="currentPage === 0" @click="currentPage--">
                        prev
                    </button>
                    <button class="btn btn-outline-secondary">{{ currentPage + 1 }}</button>
                    <button class="btn btn-outline-secondary" :disabled="currentPage === totalPages"
                            @click="currentPage++">
                        next
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Search from '../components/Search'

    export default {
        components: {
            Search
        },
        data() {
            return {
                allData: [],
                currentPage: 0,
                perPage: 5,
                searchableUser: null
            }
        },
        methods: {
            getTotalPages() {
                axios.get('https://reqres.in/api/users?page=1')
                    .then(response => {
                        this.total_pages = response.data.total_pages;
                        this.getData()
                    })
                    .catch(response => {
                        console.log(response);
                    });
            },
            getData() {
                for (let i = 1; i <= this.total_pages; i++) {
                    axios.get('https://reqres.in/api/users?page=' + i)
                        .then(response => {
                            this.allData = this.allData.concat(response.data.data);
                        })
                        .catch(response => {
                            console.log(response);
                        });
                }
            },
            resetPage() {
                this.currentPage = 0;
            },
            searchUser(data) {
                this.searchableUser = data;
            },
            emitUserDetails(id) {
                this.$emit('emitUserDetails', id);
            }
        },
        created() {
            this.getTotalPages();
            this.getData();
        },
        computed: {
            data() {
                return this.allData.slice(this.currentPage * this.perPage, (this.currentPage + 1) * this.perPage);
            },
            totalPages() {
                return Math.floor(this.allData.length / this.perPage);
            }
        },
    }
</script>

<style>
    .wrapper {
        padding: 60px 0;
    }

    .pagination {
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }

    .card {
        margin-bottom: 15px;
        cursor: pointer;
    }

    p {
        margin-bottom: 10px;
    }
</style>
