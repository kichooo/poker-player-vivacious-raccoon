const _ = require('lodash')
const rp = require('request-promise')

function isFigure(card) {
    return card.rank === "J" || card.rank === "Q" || card.rank === "K" || card.rank === "A" || card.rank === "10"
}


module.exports = {

    eval_hand: function(cards, community) {
        if (cards[0].rank === cards[1].rank) {
            // Check if pair of figures
            if (isFigure(cards[0])) return 1000
            return 700
        }

        // check if figure
        if (isFigure(cards[0]) || isFigure(cards[1]))
            return 600

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
            uri: 'http://api.posttestserver.com/post',
            body: {
                some: 'payload'
            },
            json: true // Automatically stringifies the body to JSON
        };

        rp(options)
            .then((parsedBody) => {
                // POST succeeded...
            })
            .catch(function (err) {
                // POST failed...
            });
    }
};
