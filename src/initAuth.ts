import uid from 'uid-safe'
import Chance from 'chance'
import AuthService from './database/indexAuth'
import { systemComponentBits as compBits } from './utils/authConstants'

const chance = new Chance()

initAuth().then(() => process.exit(0))
          .catch(err => {
              console.log(err); 
              process.exit(1);
          })

async function initAuth() {
    console.log('Generating initial component...')
    const api_key =  await uid(16)
    const client_name = `Super Component ${chance.word({ syllables: 3 })}`
    await AuthService.component_clients.add({
        api_key,
        client_name,
        component: compBits.ManagementPanel | compBits.StudentCenter | compBits.StudentInformationSystem,
    })
    console.log('Component client initialized successfully!\n')
    console.log(`API key: ${api_key}\nClient Name: ${client_name}`)
    console.log('\nThis is the only instance that you\'ll see the API key, so take note of it immediately!')
}