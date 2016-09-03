var tap = require('tap')

const game1 = require(__dirname + '/../data/game1.json')
const url = `localhost:1337/action=bet_request&game_state=`
const options = {
    uri: url,
    // qs: {
    //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    // },
    body: game1,
    json: true // Automatically parses the JSON string in the response
};

console.log(game1)
const rp = require('request-promise')

rp(options).then(console.log).catch(console.error)


tap.test('some async stuff', () => {
    tap.pass('this is fine')
})
