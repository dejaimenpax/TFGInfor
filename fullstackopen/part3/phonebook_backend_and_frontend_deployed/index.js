const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()


app.use(cors())
app.use(express.static('build'))




let persons = [
    { 
      name: "Arto Hellas", 
      number: "040-123456",
      id: 1
    },
    { 
      name: "Ada Lovelace", 
      number: "39-44-5323523",
      id: 2
    },
    { 
      name: "Dan Abramov", 
      number: "12-43-234345",
      id: 3
    },
    { 
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
      id: 4
    }
]

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>` 
    + `${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    console.log(request.params.id, typeof request.params.id)
    const id = Number(request.params.id)
    const person = persons.find(x => x.id === id)
    
    if (person) { //if undefined is false
        response.json(person)
    } else {
        response.statusMessage = "There is no person with that id" //esto cambia el "NOT FOUND"
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    console.log('Entra en delete')
    const id = Number(request.params.id)
    console.log(id)
    persons = persons.filter(x => x.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 100000);
} 
  
app.post('/api/persons', (request, response) => {
    console.log('Entra en post')
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing'
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing'
        })
    }

    if (persons.find(x => x.name === body.name)) {
        return response.status(400).json({ 
          error: 'name must be unique'
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    //console.log(person)
    persons = persons.concat(person)
    //console.log('Concatenada!!!')

    response.json(person)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})