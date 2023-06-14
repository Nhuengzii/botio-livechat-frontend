import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPaperPlane)

import './assets/main.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
