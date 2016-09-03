const _ = require('lodash')
const rp = require('request-promise')
const log = require('./player').log

function isFigure(card) {
    return card.rank === "J" || card.rank === "Q" || card.rank === "K" || card.rank === "A"
}


module.exports = {

    eval_hand: function(cards, community) {
        return getEvalRemotly(cards, community).catch((err) => {
            log({err: err.message})

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
        })
    },
    eval_hand_with_3community: function() {


        var allCards = _.concat(cards, community);
        allCards.map()
            // Count number of pairs.
            // we expect at least one pair. At this stage.

    },

    getEvalRemotly
};

function getEvalRemotly(cards, community = []) {
    const options = {
        method: 'POST',
        uri: 'http://rainman.leanpoker.org/rank',
        body: 'cards=' + JSON.stringify(cards.concat(community)),
    };

    log(cards.concat(community))

    return rp(options)
        .then((res) => JSON.parse(res))
        .then(data => data.rank * 100)
        .catch((err) => {
            console.error('wrong estimantion', err)
        })
}
