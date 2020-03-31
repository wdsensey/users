<template>
    <div class="input-group">
        <input type="text" v-model="searchRequest" class="form-control"
               placeholder="Введите Имя для поиска">
        <div class="input-group-append">
            <button class="btn btn-primary" v-if="searchableUser" @click="clearUser">Очистить</button>
            <button class="btn btn-primary" v-else @click="searchUser">Поиск</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            allData: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                searchRequest: '',
                searchableUser: null
            }
        },
        methods: {
            searchUser() {
                this.allData.filter((elem) => {
                    if (elem.first_name === this.searchRequest) {
                        this.searchableUser = elem
                    }
                });
                this.$emit('searchUser', this.searchableUser)
            },
            clearUser() {
                this.searchableUser = null
                this.$emit('searchUser', null)
            }
        }
    }
</script>