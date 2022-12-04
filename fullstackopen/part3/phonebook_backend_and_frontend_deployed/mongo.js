const mongoose = require('mongoose')


if (process.argv.length!==3 && process.argv.length!==5){
    console.log('Use: node mongo.js "Password" "Name" "Number"')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.ez52rfe.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
  
const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3){
    mongoose
        .connect(url)
        .then((result) => {
            console.log('phonebook:')
            Person.find({}).then(result => {
                result.forEach(x => {
                    console.log(`${x.name} ${x.number}`)
                })
                mongoose.connection.close()
              })
        })
        .catch((err) => console.log(err))
}
else{
    
    const name = process.argv[3]
    const number = process.argv[4]

    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

            const person = new Person({name, number})

            return person.save()
        })
        .then(() => {
            console.log(`added ${name} number ${number} to phonebook`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}
