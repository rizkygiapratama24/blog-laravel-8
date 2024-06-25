<template>
    <div class="container mt-5">
        <form @submit.prevent="store">
            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h5 class="card-title mb-0">Create Post</h5>
                    <router-link :to="{ name: 'post.index' }" class="btn btn-sm btn-primary">Back to Post</router-link>
                </div>
                <div class="card-body">
                    <div class="form-group mb-3">
                        <label for="title" class="form-label text-sm">Title</label>
                        <input type="text" v-model="post.title" class="form-control form-control-sm">
                        <div v-if="validation.title" class="text-danger">{{ validation.title[0] }}</div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="category_id" class="form-label text-sm">Category</label>
                        <select v-model="post.category_id" class="form-control form-control-sm">
                            <option value="">-- SELECT CATEGORY --</option>
                            <option v-for="(category, index) in categories" :value="category.id" :key="index">{{ category.category_name }}</option>
                        </select>
                        <div v-if="validation.category_id" class="text-danger">{{ validation.category_id[0] }}</div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="body" class="form-label text-sm">Content</label>
                        <textarea v-model="post.body" class="form-control form-control-sm"></textarea>
                        <div v-if="validation.body" class="text-danger">{{ validation.body[0] }}</div>
                    </div>
                    <button type="submit" class="btn btn-sm btn-primary">Save</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    name: 'CREATE',

    setup() {

        // reactive post
        let categories = ref([])

        // mounted
        onMounted(() => {
            // get API from laravel backend
            axios.get('http://localhost:8000/api/category')
                .then(response => {
                    //assign state categories with response data
                    categories.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        })

        // state posts
        const post = reactive({
            title: '',
            category_id: '',
            body: ''
        })

        // vue validation
        const validation = ref([])

        // vue router
        const router = useRouter()

        // method store
        function store() {
            let title = post.title
            let category_id = post.category_id
            let body = post.body

            axios.post('http://localhost:8000/api/blogs', {
                title: title,
                body: body,
                category_id: category_id
            }).then(() => {
                // redirect to index
                router.push({
                    name: 'post.index'
                })
            }).catch(error => {
                validation.value = error.response.data
            })
        }

        return {
            post,
            router,
            validation,
            store,
            categories
        }
    }
}
</script>