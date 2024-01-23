import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { CreateNewDeck } from '@/Home/Application/UseCases/CreateNewDeck'
import { StorageCreateDeckRepository } from '@/Home/Infrastructure/Repositories/StorageCreateDeckRepository'
import { ListDecks } from '@/Home/Application/UseCases/ListDecks'

const app = createApp(App)

app.use(router)

const storageCreateDeckRepository = new StorageCreateDeckRepository(localStorage)

app.provide('createNewDeck', new CreateNewDeck(storageCreateDeckRepository))
app.provide('listDecks', new ListDecks(storageCreateDeckRepository))

app.mount('#app')
