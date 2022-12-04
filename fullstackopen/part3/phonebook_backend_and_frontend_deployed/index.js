//For environment variables
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

//For Mongo DB
const Person = require('./models/person')


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
  Person.find({}).then(
    x => response.json(x)
  )
})


app.get('/api/info', (request, response, next) => {
    const date = new Date()
    Person.count()
      .then(
        count => response.send(`<p>Phonebook has info for ${count} people</p>`
        + `${date}`)
      )
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


  
app.post('/api/persons', (request, response) => {
    console.log('Entra en post')
    console.log(request.body)
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


    Person.count({name: `${body.name}`})
      .then(
        count => {
          if (count!==0) 
            return response.status(400).json({error: 'name must be unique'})
          else{
            const person = new Person ({
              name: body.name,
              number: body.number,
            })
      
            //console.log(person)
            person.save().then(
              savedPerson => response.json(savedPerson)
            )
          }
        }
      )
      .catch(error=>nex(error))

})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})