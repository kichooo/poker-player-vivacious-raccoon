var _ = require('lodash')

function isFigure(card) {
    return card.rank === "J" || card.rank === "Q" || card.rank === "K" || card.rank === "A"
}

module.exports = {

    eval_hand: function(cards, community) {
        if (cards[0].rank === cards[1].rank) {
            // Check if pair of figures
            if (isFigure(cards[0])) return 1000000
        }

        // // check if figure
        // if (isFigure(cards[0]) || isFigure(cards[1]))
        //     return 700000

        // check if pair

        return 0
    },
    eval_hand_with_3community: function() {

        var allCards = _.concat(cards, community);
        allCards.map()
            // Count number of pairs.


        // we expect at least one pair. At this stage.


    }
};