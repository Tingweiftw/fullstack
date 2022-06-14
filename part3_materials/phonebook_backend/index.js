const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 1
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 2
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 3
    }
]

const generateId = () => {
    const maxId = Math.floor(Math.random()*10000 + 1)
    return maxId + 1
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()} </p>
    `)
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error:"name is missing"
        })
    } else if (!body.number) {
        return response.status(400).json({
            error:"number is missing"
        })
    } else if (persons.map(person => person.name).some((p) => p === body.name)) {
        return response.status(400).json({
            error:"name must be unique"
        })
    }
    if (!(body.name && body.number)){
        return response.status(400).json({
            error: "content missing"
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
  })

app.put('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const oldContact = persons.find(person => person.id === id)
    const newContact = {...oldContact,
        number: request.body.number
    }
    persons = persons.map(person => person.id !== id ? person : newContact)
    response.send(newContact)
})
  
const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})