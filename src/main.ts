import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faFaceSmile,
    faImage,
    faCommentDots,
    faPaperPlane

} from '@fortawesome/free-solid-svg-icons'

import {
    faFacebook,
    faLine
} from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faFaceSmile)
library.add(faImage)
library.add(faCommentDots)
library.add(faPaperPlane)
library.add(faFacebook)
library.add(faLine)



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
