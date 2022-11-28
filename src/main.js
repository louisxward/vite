import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import the PocketBase JS library
import client from './pocketbase';

// Import custom pocketBase type
import { pocketBaseSymbol } from "./symbols/injectionSymbols"


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret,  faHouseChimney, faList, faUserGroup, faEnvelope, faGear } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faHouseChimney, faList, faUserGroup, faEnvelope, faGear)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide(pocketBaseSymbol, client, library)
app.mount('#app')