<template>
    <div class="container mt-5">
        <form @submit.prevent="store">
            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h5 class="card-title mb-0">Create Category</h5>
                    <router-link :to="{ name: 'category.index' }" class="btn btn-sm btn-primary">Back to Category</router-link>
                </div>
                <div class="card-body">
                    <div class="form-group mb-3">
                        <label for="category_name" class="form-label text-sm">Title</label>
                        <input type="text" v-model="category.category_name" class="form-control form-control-sm">
                        <div v-if="validation.category_name" class="text-danger">{{ validation.category_name[0] }}</div>
                    </div>
                    <button type="submit" class="btn btn-sm btn-primary">Save</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    name: 'CREATE',

    setup() {
        // state categories
        const category = reactive({
            category_name: ''
        })

        // vue validation
        const validation = ref([])

        // vue router
        const router = useRouter()

        // method store
        function store() {
            let category_name = category.category_name

            axios.post('http://localhost:8000/api/category/store', {
                category_name: category_name
            }).then(() => {
                // redirect to index
                router.push({
                    name: 'category.index'
                })
            }).catch(error => {
                validation.value = error.response.data
            })
        }

        return {
            category,
            router,
            validation,
            store
        }
    }
}
</script>