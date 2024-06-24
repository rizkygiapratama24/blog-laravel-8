<template>
    <div class="container mt-5">
        <form @submit.prevent="update">
            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h5 class="card-title mb-0">Edit Category</h5>
                    <router-link :to="{ name: 'category.index' }" class="btn btn-sm btn-primary">Back to Category</router-link>
                </div>
                <div class="card-body">
                    <div class="form-group mb-2">
                        <label for="category_name" class="form-label text-sm">Category Name</label>
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
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
    name: 'EDIT',
    setup() {
        // state category
        const category = reactive({
            category_name: ''
        })

        // vue validation
        const validation = ref([])

        // vue router
        const router = useRouter()
        
        // vue router 2
        const route = useRoute()

        // mounted
        onMounted(() => {
            // get API from laravel backend
            axios.get(`http://localhost:8000/api/category/show/${route.params.id}`)
            .then(response => {
                //assign state posts with response data
                category.category_name = response.data.data.category_name
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        // method update
        function update() {
            let category_name = category.category_name

            axios.put(`http://localhost:8000/api/category/update/${route.params.id}`, {
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
            route,
            validation,
            update
        }
    }
}
</script>