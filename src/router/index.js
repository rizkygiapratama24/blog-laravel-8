//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'post.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/post/Index.vue')
    },
    {
        path: '/create',
        name: 'post.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/post/Create.vue')
    },
    {
        path: '/edit/:id',
        name: 'post.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/post/Edit.vue')
    },
    
    {
        path: '/category',
        name: 'category.index',
        component: () => import( /* webpackChunkName: "category.index" */ '@/views/category/Index.vue')
    },

    {
        path: '/category/create',
        name: 'category.create',
        component: () => import( /* webpackChunkName: "category.create" */ '@/views/category/Create.vue')
    },

    {
        path: '/category/edit/:id',
        name: 'category.edit',
        component: () => import( /* webpackChunkName: "category.edit" */ '@/views/category/Edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router