const express = require('express')
const app = express()
const port = 8000
const parser = require('body-parser')
const Blockchain = require('./simpleChain')
let blockchain = new Blockchain()

app.use(parser.json())
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/block/:blockHeight', async(req,res) => {
    try {
        const response = await blockchain.getBlock(req.params.blockHeight)
        res.send(response)

    }
       catch (error) {
           res.status(404).json({
               "status": 404,
               "message": "Requested Block does not exist!"
           })
       }

})

app.post('/block', async (req, res) => {
    //const { body } = req.body;

    if (req.body.body === undefined || req.body.body === '') {
        res.status(400).json({
            "status": 400,
            "message": 'Bock data cannot be empty, please fill out block!'})

    } else {
       blockchain.addBlock(req.body.body)
         .then(block => res.status(201).json(req.body.body))
         .catch ((error) => {
             res.status(500).json('not sure what the do with it yet')
         })
    }
})


//curl http://localhost:8000/block/0
//curl -X "POST" "http://localhost:8000/block" -H 'Content-Type: application/json' -d $'{"body":"block body contents"}'