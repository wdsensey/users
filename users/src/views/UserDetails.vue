<template>
    <div class="wrapper">
        <div class="container">
            <a class="back" @click="$router.go(-1)">Вернуться назад</a>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="row align-items-center" v-if="userDetails">
                            <div class="col-4">
                                <img :src="userDetails.data.avatar" alt="" class="img-fluid w-100">
                            </div>
                            <div class="col-8">
                                <p>{{ userDetails.data.id }}</p>
                                <p>{{ userDetails.data.email }}</p>
                                <p>{{ userDetails.data.first_name }}</p>
                                <p>{{ userDetails.data.last_name }}</p>
                                <hr>
                                <p>{{ userDetails.ad.company }}</p>
                                <p>{{ userDetails.ad.text }}</p>
                                <a :href="userDetails.ad.url">{{ userDetails.ad.url }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                allData: [],
                userDetails: null
            }
        },
        methods: {
            getUserDetails() {
                axios.get('https://reqres.in/api/users/' + this.$route.params.id)
                    .then(response => {
                        this.userDetails = response.data;
                    })
                    .catch(response => {
                        console.log(response);
                    });
            }
        },
        created() {
            this.getUserDetails();
        }
    }
</script>

<style>
    .back {
        cursor: pointer;
        display: inline-block;
        margin-bottom: 20px;
    }
</style>
