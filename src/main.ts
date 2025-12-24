import '@babel/polyfill'
import 'mutationobserver-shim'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import icons and add them to the Library */
import * as icons from '@fortawesome/free-solid-svg-icons'
const forImport = [
  'faLock'
]
for (const icon of forImport) {
  library.add((icons as any)[icon])
}

// Register the Vue FontAwesome component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/main.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const app = createApp(App)

app.use(router)

app.mount('#app')
