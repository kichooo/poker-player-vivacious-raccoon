var player = require('./player')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.status(200).send('OK'))

app.post('/', (req, res) => {
    if (req.body.action == 'bet_request') {
        player.bet_request(JSON.parse(req.body.game_state), function(bet) {
            res.status(200).send(bet.toString())
        })
    } else if (req.body.action == 'showdown') {
        player.showdown(JSON.parse(req.body.game_state))
        res.status(200).send('OK')
    } else if (req.body.action == 'version') {
        res.status(200).send(player.VERSION)
    } else {
        res.status(200).send('OK')
    }

})

port = parseInt(process.env['PORT'] || 1337)
host = "0.0.0.0"
app.listen(port, host)
console.log('Listening at http://' + host + ':' + port)
