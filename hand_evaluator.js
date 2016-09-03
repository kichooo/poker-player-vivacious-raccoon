const _ = require('lodash')
const rp = require('request-promise')

function isFigure(card) {
    return card.rank === "J" || card.rank === "Q" || card.rank === "K" || card.rank === "A"
}


module.exports = {

    eval_hand: function(cards, community) {

        getEvalRemotly(cards).then(console.log)

        if (cards[0].rank === cards[1].rank) {
            // Check if pair of figures
            if (isFigure(cards[0])) {
                return 1000
            }

            return 200
        }

        // check if figure
        if (isFigure(cards[0]) || isFigure(cards[1]))
            return 300

        return 0
    },
    eval_hand_with_3community: function() {


        var allCards = _.concat(cards, community);
        allCards.map()
            // Count number of pairs.
            // we expect at least one pair. At this stage.

    },

    getEvalRemotly(cards, community) {
        const options = {
            method: 'POST',
            uri: 'http://rainman.leanpoker.org/rank',
            body: 'cards=' + JSON.stringify(cards),
        };

        return rp(options)
            .then((res) => JSON.parse(res))
            .catch((err) => {
                console.error('wrong estimantion', err)
            })
    }
};
