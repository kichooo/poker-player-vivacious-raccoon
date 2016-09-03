module.exports = function (g) {

    return {
        // The small blind in the current round. The big blind is twice
        // the small blind
        SmallBlind: parseInt(g.small_blind),

        // The amount of the largest current bet from any one player
        CurrentBuyIn: g.current_buy_in,

        // The size of the pot (sum of the player bets)
        Pot: parseInt(g.pot),

        // Minimum raise amount. To raise you have to return at least:
        //     current_buy_in - players[in_action][bet] + minimum_raise
        MinimumRaise: parseInt(g.minimum_raise),

        // The index of the player on the dealer button in this round
        // The first player is (dealer+1)%(players.length)
        Dealer: parseInt(g.dealer), //int `json:"dealer"`

        // Number of orbits completed. (The number of times the dealer button
        // returned to the same player.)
        Orbits: parseInt(g.orbits), // int `json:"orbits"`

        // The index of your player, in the players array
        InAction: parseInt(g.in_action),  //int `json:"in_action"`

        // An array of the players. The order stays the same during the
        // entire tournament
        Players: g.players,// []Player `json:"players"`

        // Finally the array of community cards.
        CommunityCards: g.community_cards // []Card `json:"community_cards"`
    }

}