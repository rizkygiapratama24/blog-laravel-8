<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="card-title mb-0">DATA POST</h5>
                <router-link :to="{ name: 'post.create' }" class="btn btn-sm btn-primary">Create Post</router-link>
            </div>
            <div class="card-body">
                <input type="text" v-model="search" class="form-control form-control-sm mb-3">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>TITLE</th>
                            <th>CONTENT</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(post, index) in posts" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ post.title }}</td>
                            <td>{{ post.body }}</td>
                            <td>
                                <router-link :to="{ name: 'post.edit', params: { id: post.id } }"
                                    class="btn btn-sm btn-warning mx-2">Edit</router-link>
                                <button @click.prevent="postDelete(post.id)"
                                    class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
export default {
    name: 'INDEX',

    setup() {
        // reactive post
        let posts = ref([])

        // mounted
        onMounted(() => {
            // get API from laravel backend
            axios.get('http://localhost:8000/api/blogs')
                .then(response => {
                    //assign state posts with response data
                    posts.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        })

        // search
        

        // methode delete
        function postDelete(id) {
            // delete data post by ID
            axios.delete(`http://localhost:8000/api/blogs/${id}`)
                .then(() => {
                    // splice posts
                    posts.value.splice(posts.value.indexOf(id), 1);
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        // return
        return {
            posts,
            postDelete
        }
    }
}
</script>