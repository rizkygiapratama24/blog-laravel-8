<template>
    <div class="container mt-5">
        <form @submit.prevent="store">
            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h5 class="card-title mb-0">Create Post</h5>
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    name: 'CREATE',

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

        // method store
        function store() {
            let title = post.title
            let body = post.body

            axios.post('http://localhost:8000/api/blogs', {
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
            validation,
            store
        }
    }
}
</script>