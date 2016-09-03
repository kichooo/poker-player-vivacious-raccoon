const tap = require('tap')
const rp = require('request-promise')
const url = `http://0.0.0.0:1337/`
const handEval = require('../hand_evaluator')
const game1 = require(__dirname + '/../data/game1.json')

const options = {
    uri: url,
    method: 'POST',
    body: `action=bet_request&game_state=` + JSON.stringify(game1),
    // json: true // Automatically parses the JSON string in the response
};

tap.test('smoke test', () =>
    rp(options)
        .then(d => {
            console.log(d)
            tap.ok(d)
        })
        .catch(console.error)
)

const cards = [
    {"rank": "5", "suit": "diamonds"},
    {"rank": "6", "suit": "diamonds"},
    {"rank": "7", "suit": "diamonds"},
    {"rank": "7", "suit": "spades"},
    {"rank": "8", "suit": "diamonds"},
    {"rank": "9", "suit": "diamonds"}
]

// tap.test('eval remotely', () =>
//     handEval.evalRemotly(cards, []).then(d=> {
        console.log(d)
        // tap.ok(d.rank > 1)
        // tap.ok(d.value > 1)
        // tap.ok(d.second_value > 1)
    // })
// )
