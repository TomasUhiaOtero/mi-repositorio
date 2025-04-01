const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

// Conexión a MongoDB
const password = 'your_password_here' // Reemplaza con tu contraseña
const url = `mongodb+srv://tomasuhiaotero:${password}@agenda.alabu.mongodb.net/?retryWrites=true&w=majority&appName=Agenda`

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error.message))

// Esquema y modelo de Mongoose
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// Rutas
app.get('/api/notes', (req, res, next) => {
  Note.find({})
    .then((notes) => res.json(notes))
    .catch((error) => next(error))
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save()
    .then((savedNote) => res.json(savedNote))
    .catch((error) => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id, 
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  ) 
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
})

// Iniciar el servidor
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})