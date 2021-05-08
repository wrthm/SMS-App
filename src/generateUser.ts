import Chance from 'chance'
import AuthService from './database/indexAuth'
import { facultyPrivilegeBits as facBits } from './utils/authConstants'
import { AppServerConfig } from './config/index'
import { hash } from 'bcrypt'

const chance = new Chance()

// TODO: create init code in a separate file for replicating entire database's schema
// TODO: include option to generate a student

generateUser().then(() => process.exit(0))
              .catch(err => {
                console.log(err); 
                process.exit(1);
            })

async function generateUser() {
    console.log('Generating faculty...')
    const fname = chance.first()
    const mname = chance.last()
    const lname = chance.last()
    const username = chance.word({ syllables: 3 })
    const password = `${chance.word()}${chance.character({ casing: "upper" })}${chance.character({ symbols: true })}`
    await AuthService.faculties.add({
        first_name: fname,
        middle_name: mname,
        last_name: lname,
        address: chance.address(),
        phone_number: "09999999999",
        privilege: facBits.Attendance | facBits.ManagementPanelAdmin | facBits.ManagementPanelRegistrar | facBits.StudentInformationSystem,
        username: username,
        password: await hash(password, AppServerConfig.BcryptSaltRounds)
    })
    console.log('Faculty generated and has been added into the database successfully!\n')
    console.log(`Name: ${fname} ${mname} ${lname}`)
    console.log(`Username: ${username}\nPassword: ${password}`)
    console.log('\nThis is the only instance that you\'ll see the credentials, so take note of it immediately!')
}