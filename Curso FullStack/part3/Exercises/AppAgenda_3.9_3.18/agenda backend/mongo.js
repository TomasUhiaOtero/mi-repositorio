const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tomasuhiaotero:${password}@agenda.alabu.mongodb.net/Agenda?retryWrites=true&w=majority&appName=Agenda`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

 const Person = mongoose.model('Person', noteSchema)

 if (process.argv.length === 3) {
    // Mostrar todas las entradas en la agenda
    Person.find({}).then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  } else if (process.argv.length === 5) {
    // Agregar una nueva entrada a la agenda
    const name = process.argv[3]
    const number = process.argv[4]
  
    const person = new Person({
      name: name,
      number: number,
    })
  
    person.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
  } else {
    console.log('incorrect number of arguments')
    mongoose.connection.close()
  }
