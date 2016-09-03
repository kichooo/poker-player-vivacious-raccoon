module.exports = {

    eval_hand: function(cards) {
        // var cards = state.players[state.in_action].hole_cards
        
        // check if figure
        if (isFigure(cards[0]) || isFigure(cards[1]))
            return 1000000

        // check if pair
        if (cards[0].rank === cards[1].rank)
            return 1000000
        return 0
    }
};

function isFigure(card) {
    return card.rank === "J" || card.rank === "Q" || card.rank === "K" || card.rank === "A"
}