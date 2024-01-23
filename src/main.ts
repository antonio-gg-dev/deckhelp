import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { CreateNewDeck } from '@/DeckBuilder/Application/UseCases/CreateNewDeck'
import { StorageCreateDeckRepository } from '@/DeckBuilder/Infrastructure/Repositories/StorageCreateDeckRepository'
import { ListDecks } from '@/DeckBuilder/Application/UseCases/ListDecks'

const app = createApp(App)

app.use(router)

const storageCreateDeckRepository = new StorageCreateDeckRepository(localStorage)

app.provide('createNewDeck', new CreateNewDeck(storageCreateDeckRepository))
app.provide('listDecks', new ListDecks(storageCreateDeckRepository))

app.mount('#app')
