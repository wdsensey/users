<template>
    <div class="form-group">
        <input type="text" v-model="searchRequest" class="form-control"
               placeholder="Введите Имя для поиска" @input="search">
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
            search() {
                this.$emit('search', this.searchRequest);
            }
        }
    }
</script>