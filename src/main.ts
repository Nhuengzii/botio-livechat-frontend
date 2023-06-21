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
    faPaperPlane,
    faCirclePlus,
    faPen,
    faTrashCan,
    faChevronDown,
    faCircleInfo,
    faMagnifyingGlass,
    faArrowLeft,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

import {
    faFacebook,
    faLine,
    faInstagram
} from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faFaceSmile)
library.add(faImage)
library.add(faCommentDots)
library.add(faPaperPlane)
library.add(faCirclePlus)
library.add(faFacebook)
library.add(faLine)
library.add(faPen)
library.add(faTrashCan)
library.add(faChevronDown)
library.add(faInstagram)
library.add(faCircleInfo)
library.add(faMagnifyingGlass)
library.add(faArrowLeft)
library.add(faXmark)


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
