var hand_evaluator = require('./hand_evaluator.js')
var _ = require('lodash')
const rp = require('resuest-promise')

const log = (state) => rp({
    method: 'POST',
    uri: 'https://heroku-sink-666.herokuapp.com',
    body: state,
    json: true
}).then((data) => {
    })
    .catch((err) => {
    })

module.exports = {

    VERSION: "Vivatious racoon 13:23",

    bet_request: (state, bet) => {
        log(state)
        console.log(state.players);
        // Minimum raise amount. To raise you have to return at least:
        //     current_buy_in - players[in_action][bet] + minimum_raise
        var points = hand_evaluator.eval_hand(state.players[state.in_action].hole_cards)
        if (points > 500000) {
            var raise = state.current_buy_in - state.players[state.in_action].bet + state.minimum_raise
            bet(raise)
            return
        }

        bet(0)

    },

    showdown: function (state) {

    }
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
