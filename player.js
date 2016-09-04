// const _ = require('lodash')
const rp = require('request-promise')
const handEvaluator = require('./hand_evaluator')

let now = new Date()

const log = state => rp({
    uri: 'https://heroku-sink-666.herokuapp.com',
    body: state,
    json: true
}).then(() => {})
    .catch(() => {})

let games = {}

// two cards, nothing on table, implemented by kich
function blindGame(state, bet) {
    const me = state.players[state.in_action]
    if (!games.hasOwnProperty(state.game_id)) {
        games[state.game_id] = handEvaluator.eval_hand(me.hole_cards)
    }

    if (games[state.game_id] > 0) {
        if (me.bet > state.smallBlind * 4) {
            // Someone goes all in. Fold if we have bad cards.
            if (games[state.game_id] < 110) {
                games[state.game_id] = 0
                return bet(0)
            }
        }

        const min_raise = state.current_buy_in - me.bet + state.minimum_raise

        if (min_raise >= me.stack)
            return bet(me.stack)
        return bet(min_raise)

        // const current_investment_level = me.bet / (me.stack + me.bet)
        // if (current_investment_level <= games[state.game_id] / 1000) {
        //     if (min_raise >= me.stack)
        //         return bet(me.stack)
        //     return bet(min_raise)
        // } else {
        //     // fold
        //     return bet(0)
        // }
    } else {
        // If we are small blind, it is worth to check.
        if (state.current_buy_in === state.small_blind * 2 && me.bet === state.small_blind)
            return stay(state, bet, me)
    }
    return bet(0)
}

function stay(state, bet, me) {
    bet(state.current_buy_in - me.bet)
}

// 2 cards in hand and 3 or 4 or 5 on table, implemented by syzer
// bet is cb
function normalGame(state, bet) {
    const me = state.players[state.in_action]

    handEvaluator.evalRemotely(me.hole_cards, state.community_cards)
        .then(rank => {
            console.log(rank)
            if (rank >= 300) {
                // all-in
                return bet(me.stack)
            }
            if (rank >= 100) {
                return stay(state, bet, me)
            }
            // fold
            return bet(0)
        })
}

module.exports = {

    VERSION: `Vivatious racoon ${now.getHours()}:${now.getMinutes()}`,

    bet_request: (state, bet) => {
        if (state.community_cards.length === 0) {
            return blindGame(state, bet)
        }
        return normalGame(state, bet)
    },

    // never needed
    showdown: state => {

    },

    log

}
