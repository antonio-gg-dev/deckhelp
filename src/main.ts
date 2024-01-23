import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { CreateNewDeck } from '@/DeckBuilder/Application/UseCases/CreateNewDeck'
import { StorageDeckRepository } from '@/DeckBuilder/Infrastructure/Repositories/StorageDeckRepository'
import { ListDecks } from '@/DeckBuilder/Application/UseCases/ListDecks'
import { GetDeckByIndex } from '@/DeckBuilder/Application/UseCases/GetDeckByIndex'

const app = createApp(App)

app.use(router)

const storageCreateDeckRepository = new StorageDeckRepository(localStorage)

app.provide('createNewDeck', new CreateNewDeck(storageCreateDeckRepository))
app.provide('listDecks', new ListDecks(storageCreateDeckRepository))
app.provide('getDeckByIndex', new GetDeckByIndex(storageCreateDeckRepository))

app.mount('#app')
