const hand_evaluator = require('./hand_evaluator')
const _ = require('lodash')
const rp = require('request-promise')

const log = (state) => rp({
        method: 'POST',
        uri: 'https://heroku-sink-666.herokuapp.com',
        body: state,
        json: true
    }).then((data) => {})
    .catch((err) => {})

let games = {}

// two cards, nothing on table, implemented by kich
function blindGame(state, bet) {
    const me = state.players[state.in_action]
    if (!games.hasOwnProperty(state.game_id)) {
        games[state.game_id] = hand_evaluator.eval_hand(me.hole_cards)
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

    }
    return bet(0)
}

function stay(state, bet) {
    bet(state.current_buy_in - me.bet)
}

// 2 cards in hand and 3 or 4 or 5 on table, implemented by syzer
function normalGame(state, bet) {
    const me = state.players[state.in_action]

    // if (!games.hasOwnProperty('game_id')) {
    hand_evaluator.evalRemotely(me.hole_cards, state.community_cards)
        .then(rank => {
            if (rank >= 500) {
                // allin
                return bet(me.stack)
            }
            if (rank >= 300) {
                return stay(state, bet)
            }
            //
            if (rank < 200) {
                //fold
                return bet(0)
            }
        })
}

module.exports = {

    VERSION: "Vivatious racoon 14:37",

    bet_request: (state, bet) => {
        if (state.community_cards.length === 0) {
            return blindGame(state, bet)
        }
        return normalGame()

    },
    showdown: function(state) {

    },

    log: log

};