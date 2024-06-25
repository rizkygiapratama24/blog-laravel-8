<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="card-title mb-0">DATA CATEGORY</h5>
                <router-link :to="{ name: 'category.create' }" class="btn btn-sm btn-primary">Create
                    Category</router-link>
            </div>
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-end mb-3 gx-2">
                    <label for="" class="form-label text-sm mx-2 mb-0">Search</label>
                    <input type="text" v-model="searchCategories" class="form-control form-control-sm w-25">
                </div>
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>CATEGORY</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, index) in searchedCategories" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ category.category_name }}</td>
                            <td>
                                <router-link :to="{ name: 'category.edit', params: { id: category.id } }"
                                    class="btn btn-sm btn-warning mx-2">Edit</router-link>
                                <button @click.prevent="categoryDelete(category.id)"
                                    class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                        <tr v-if="!searchedCategories.length">
                            <td colspan="4" class="text-center">Data Kosong</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
export default {
    name: 'INDEX',
    setup() {
        // reactive category
        let categories = ref([])

        // mounted
        onMounted(() => {
            // get API from laravel backend
            axios.get('http://localhost:8000/api/category')
                .then(response => {
                    //assign state category with response data
                    categories.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
            })      
        })

        // search
        const searchCategories = ref("");
        const searchedCategories = computed(() => {
            return categories.value.filter((category) => {
                return (
                    category.category_name
                    .toLowerCase()
                        .indexOf(searchCategories.value.toLowerCase()) != -1
                )
            })
        })

        // method delete
        function categoryDelete(id) {
            if (confirm('Yakin Ingin Dihapus ?')) {
                // delete data categories by ID
                axios.delete(`http://localhost:8000/api/category/destroy/${id}`)
                .then(() => {
                    categories.value.splice(categories.value.indexOf(id), 1);
                }).catch(error => {
                    console.log(error.response.data)
                })
            }
        }

        return {
            categories,
            searchCategories,
            searchedCategories,
            categoryDelete
        }
    }
}
</script>