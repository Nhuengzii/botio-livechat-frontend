import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */

/* add icons to the library */
library.add(faPaperPlane)

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
<<<<<<< HEAD
    faPaperPlane,
    faCirclePlus
    
=======
    faPaperPlane

>>>>>>> ebe3b4c2a9b7ff37aab2a31d4aa4b2a6c5de8e28
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
<<<<<<< HEAD
library.add(faCirclePlus)
=======
library.add(faFacebook)
library.add(faLine)
>>>>>>> ebe3b4c2a9b7ff37aab2a31d4aa4b2a6c5de8e28



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
