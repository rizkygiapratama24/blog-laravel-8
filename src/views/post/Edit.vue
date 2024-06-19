<template>
    <div class="container mt-5">
        <form @submit.prevent="update">
            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h5 class="card-title mb-0">Edit Post</h5>
                    <router-link :to="{ name: 'post.index' }" class="btn btn-sm btn-primary">Back to Post</router-link>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="title" class="form-label text-sm">Title</label>
                        <input type="text" v-model="post.title" class="form-control form-control-sm">
                        <div v-if="validation.title" class="text-danger">{{ validation.title[0] }}</div>
                    </div>
                    <div class="form-group mb-2">
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
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
    name: 'EDIT',

    setup() {
        // state posts
        const post = reactive({
            title: '',
            body: ''
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
            axios.get(`http://localhost:8000/api/blogs/${route.params.id}`)
            .then(response => {
                //assign state posts with response data
                post.title = response.data.data.title
                post.body = response.data.data.body
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        // method store
        function update() {
            let title = post.title
            let body = post.body

            axios.put(`http://localhost:8000/api/blogs/${route.params.id}`, {
                title: title,
                body: body
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
            route,
            validation,
            update
        }
    }
}
</script>