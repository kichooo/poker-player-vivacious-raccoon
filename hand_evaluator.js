var _ = require('lodash')

function isFigure(card) {
    return card.rank === "J" || card.rank === "Q" || card.rank === "K" || card.rank === "A"
}

module.exports = {

    eval_hand: function(cards, community) {
        // check if figure
        if (isFigure(cards[0]) || isFigure(cards[1]))
            return 1000000

        // check if pair
        if (cards[0].rank === cards[1].rank)
            return 1000000
        return 0
    },

    eval_hand_with_community: function() {
        var allCards = _.concat(cards, community);
        // we expect at least one pair. At this stage.


    }
};