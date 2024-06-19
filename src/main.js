import { createApp } from 'vue'
import App from './App.vue'

//import router
import router from './router';

//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App)

// use vue router
app.use(router)

app.mount('#app')
