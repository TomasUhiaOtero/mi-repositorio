const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Conexión a MongoDB
const password = 'trabajo2000' // Reemplaza con tu contraseña
const url = `mongodb+srv://tomasuhiaotero:${password}@agenda.alabu.mongodb.net/Agenda?retryWrites=true&w=majority&appName=Agenda`

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => next(error))

// Definición del esquema y modelo
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Validar que el número tenga el formato correcto
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});
const Person = mongoose.model('Person', personSchema)

// GET all persons
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

// GET a single person by ID
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'Invalid ID format' })
  }

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({ error: 'Person not found' })
      }
    })
    .catch((error) => next(error))
})

// DELETE a person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'Invalid ID format' })
  }

  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'Person not found' })
      }
    })
    .catch((error) => next(error))
})

// POST a person
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Name or number is missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

// GET info
app.get('/api/info', (request, response) => {
  Person.countDocuments({})
    .then((count) => {
      const currentTime = new Date()
      const info = `<p>Phonebook has info for ${count} people</p>
                    <p>${currentTime}</p>`
      response.send(info)
    })
    .catch((error) => {
      console.error(error)
      response.status(500).json({ error: 'An error occurred while fetching info' })
    })
})

// PUT (actualizar una persona)
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'Name or number is missing' })
  }

  // Actualización de la persona
  const updatedPerson = { name, number }

  Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: 'query' })
    .then((result) => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).json({ error: 'Person not found' })
      }
    })
    .catch((error) => next(error))
})

// Middleware de manejo de errores
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).json({ error: 'Malformatted ID' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

