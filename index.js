const express = require('express')
const app = express()
const port = 3000

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

var parser = require('body-parser')
app.use(parser.json())

const tableName = 'meme'

app.get('/', (req, res, next) => {
    knex(tableName)
        .then((rows) => res.status(200).send(rows))
        .catch(err => {
            next(err)
        })
})

app.post('/', (req, res, next) => {
    const text = req.body.text
    const url = req.body.url

    knex(tableName)
        .insert({ text: text, url: url })
        .then(() => res.status(200).send('post successful'))
        .catch(err => {
            next(err)
        })
})

app.patch('/', (req, res, next) => {
    const id = req.body.id
    const text = req.body.text
    const url = req.body.url

    knex(tableName)
        .where({ id: id })
        .update({ text: text, url: url })
        .then(() => res.status(200).send('update successful'))
        .catch(err => {
            next(err)
        })
})

app.delete('/', (req, res, next) => {
    const id = req.body.id

    knex(tableName)
        .where({ id: id })
        .delete()
        .then(() => res.status(200).send('meme deleted'))
        .catch(err => {
            next(err)
        })
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('something broke!')
})
app.use(function (err, req, res, next) {

    res.status(404).send('Sorry, cannot find that!')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))