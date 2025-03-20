const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

// Function to generate unique IDs
const generateId = () => {
    let newId
    do {
        newId = Math.floor(Math.random() * 1000000)
    } while (persons.find(person => person.id === newId))
      return newId
}

 // GET all persons
 app.get('/api/persons', (request, response) => {
    console.log('GET /api/persons');
    response.json(persons)
})

// GET a single person by ID
app.get('/api/persons/:id', (request, response) => {
  console.log(`GET /api/persons/${request.params.id}`)
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  // DELETE a person
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    } else {
        response.status(404).json({ error: 'Person not found' })
    }
})

// POST a person
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const existingPerson = persons.find(person => person.name === body.name)
    if (existingPerson) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

// GET info
app.get('/api/info', (request, response) => {
    const currentTime = new Date()
    const info = `<p>Phonebook has info for ${persons.length} people</p> 
                  <p>${currentTime}</p>`
    response.send(info)
})

const PORT = process.env.PORT|| 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

