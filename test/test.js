var tap = require('tap')

const url = `localhost:1337/action=bet_request&game_state=`
const options = {
    uri: url,
    // qs: {
    //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    // },
    json: true // Automatically parses the JSON string in the response
};
const game1 = require(__dirname + '/../data/game.json')
const rp = require('request-promise')

rp(options).post(url).then(console.log).catch(console.error)


tap.test('some async stuff', () => {
    tap.pass('this is fine')
})
