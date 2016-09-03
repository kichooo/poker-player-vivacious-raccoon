const tap = require('tap')
const rp = require('request-promise')
const url = `http://0.0.0.0:1337?action=bet_request&game_state=`
const handEval = require('../hand_evaluator')
const game1 = require(__dirname + '/../data/game1.json')
const game2 = require(__dirname + '/../data/game2.json')
const showdown = require(__dirname + '/../data/showdown')

const newReq = (jsonData, uri = url) => rp({
    uri,
    body: JSON.stringify(jsonData),
    // json: true: wont work because bug in original game implementation
    headers: {
        'Content-Type': 'application/json'
    }
})

tap.test('start game', () =>
    newReq(game1).then(d => {
        // console.log(d)
        tap.ok(d)
    }).catch(console.error)
)

tap.test('end game', () =>
    newReq(game2).then(d => {
        // console.log(d)
        tap.ok(d)
    }).catch(console.error)
)

tap.test('showdown', () =>
    newReq(showdown, `http://0.0.0.0:1337?action=showdown&game_state=`).then(d => {
        // console.log('====>showdown', d)
        tap.ok(d == 'OK')
    }).catch(console.error)
)

const cards = [
    {"rank": "5", "suit": "diamonds"},
    {"rank": "5", "suit": "diamonds"},
]

const communityCards = [
    {"rank": "7", "suit": "diamonds"},
    {"rank": "7", "suit": "spades"},
    {"rank": "8", "suit": "diamonds"},
    {"rank": "9", "suit": "diamonds"}
]

// unit test
tap.test('eval remotely', () =>
    handEval.evalRemotely(cards, communityCards).then(d => {
        console.log('rank', d)
        tap.ok("Rank is defined")
    })
)
