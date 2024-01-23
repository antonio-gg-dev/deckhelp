import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { CreateNewDeck } from '@/Home/Application/UseCases/CreateNewDeck'
import { StorageCreateDeckRepository } from '@/Home/Infrastructure/Repositories/StorageCreateDeckRepository'

const app = createApp(App)

app.use(router)
app.provide('createNewDeck', new CreateNewDeck(new StorageCreateDeckRepository(localStorage)))

app.mount('#app')
