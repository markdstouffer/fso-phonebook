const mongoose = require('mongoose')


const password = process.argv[2]
const nameInput = process.argv[3]
const numInput = process.argv[4]

const url =
  `mongodb+srv://himarks:${password}@full-stack-open.cs2hj.mongodb.net/phonebook-entries?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: nameInput,
    number: numInput
})

person.save().then(result => {
    console.log('entry saved!')
    mongoose.connection.close()
})

if (process.argv.length < 5) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}