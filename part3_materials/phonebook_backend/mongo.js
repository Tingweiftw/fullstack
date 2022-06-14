const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
    })
const Person = mongoose.model('Person', personSchema)
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
else if (process.argv.length === 3){
    const password = process.argv[2]

    const url = `mongodb+srv://fullstack:${password}@cluster0.w4xfu.mongodb.net/phonebook?retryWrites=true&w=majority`
    mongoose
        .connect(url)
        .then(() => {
            console.log('connected')
            Person.find({}).then(result => {
                result.forEach(person => {
                console.log(person.name, person.number)
                })
                mongoose.connection.close()
            })
        })
    
}
else if (process.argv.length === 5){
    const password = process.argv[2]
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const url = `mongodb+srv://fullstack:${password}@cluster0.w4xfu.mongodb.net/phonebook?retryWrites=true&w=majority`

    mongoose
        .connect(url)
        .then(() => {
            console.log('connected')
            const person = new Person({
            name: newName,
            number: newNumber,
            date: new Date(),

            })
            return person.save()
        })
        .then(() => {
            console.log(`added ${newName} number ${newNumber} to phonebook`)
            Person.find({}).then(result => {
                result.forEach(person => {
                console.log(person)
                })
                mongoose.connection.close()
            })
        })
        .catch((err) => console.log(err))
}


