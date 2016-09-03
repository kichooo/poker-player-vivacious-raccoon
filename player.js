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

games = {}


function bidding(bet, state) {
    const me = state.players[state.in_action]


    if (games[state.game_id] > 100) {
        var min_raise = state.current_buy_in - me.bet + state.minimum_raise
        var current_investment_level = me.bet / (me.stack + me.bet)
        if (current_investment_level <= games[state.game_id] / 1000) {
            if (min_raise >= me.stack)
                return bet(me.stack)
            return bet(min_raise)
        } else {
            // fold
            return bet(0)
        }

    }
    return bet(0)
}


// two cards, nothing on table, implemented by kich
function blindGame(state, bet) {

}

// 2 cards in hand and 3 or 4 or 5 on table, implemented by syzer
function normalGame(state, bet) {

}

module.exports = {

    VERSION: "Vivatious racoon 14:37",

    bet_request: (state, bet) => {
        if (state.communityCards.length === 0) {
            return blindGame(state, bet)
        } else {
            return normalGame()
        }

        // const me = state.players[state.in_action]

        // if (!games.hasOwnProperty('game_id')) {
        //     hand_evaluator.eval_hand(me.hole_cards, state.community_cards).then(rank => {
        //         console.log(rank)
        //         games[state.game_id] = rank
        //         if (games[state.game_id] > 100) {
        //             games[state.game_id] = 1000
        //         }
        //     }).then(() => bidding(bet, state))
        // } else {
        //     bidding(bet, state)
        // }

    },
    showdown: function(state) {

    },

    log

};


/*

 type Card struct {
 // Rank of the card. Possible values are numbers 2-10 and J,Q,K,A
 Rank string `json:"rank"`

 // Suit of the card. Possible values are: clubs,spades,hearts,diamonds
 Suit string `json:"suit"`
 }


 package leanpoker

 type Game struct {
 // The small blind in the current round. The big blind is twice
 // the small blind
 SmallBlind int `json:"small_blind"`

 // The amount of the largest current bet from any one player
 CurrentBuyIn int `json:"current_buy_in"`

 // The size of the pot (sum of the player bets)
 Pot int `json:"pot"`

 // Minimum raise amount. To raise you have to return at least:
 //     current_buy_in - players[in_action][bet] + minimum_raise
 MinimumRaise int `json:"minimum_raise"`

 // The index of the player on the dealer button in this round
 // The first player is (dealer+1)%(players.length)
 Dealer int `json:"dealer"`

 // Number of orbits completed. (The number of times the dealer button
 // returned to the same player.)
 Orbits int `json:"orbits"`

 // The index of your player, in the players array
 InAction int `json:"in_action"`

 // An array of the players. The order stays the same during the
 // entire tournament
 Players []Player `json:"players"`

 // Finally the array of community cards.
 CommunityCards []Card `json:"community_cards"`
 }


 package leanpoker

 const VERSION = "Default Go folding player"

 type Player struct {
 // Id of the player (same as the index)
 Id int `json:"id"`

 // Name specified in the tournament config
 Name string `json:"name"`

 // Status of the player:
 //   - active: the player can make bets, and win the current pot
 //   - folded: the player folded, and gave up interest in
 //       the current pot. They can return in the next round.
 //   - out: the player lost all chips, and is out of this sit'n'go
 Status string `json:"status"`

 // Version identifier returned by the player
 Version string `json:"version"`

 // Amount of chips still available for the player.
 // (Not including the chips the player bet in this round)
 Stack int `json:"stack"`

 // The amount of chips the player put into the pot
 Bet int `json:"bet"`

 // The cards of the player. This is only visible for your own player
 // except after showdown, when cards revealed are also included.
 HoleCards []Card `json:"hole_cards"`
 }


 */
