const _ = require('lodash')
const rp = require('request-promise')

function isFigure(card) {
    return card.rank === "J" || card.rank === "Q" || card.rank === "K" || card.rank === "A"
}

module.exports = {
    eval_hand: eval2Sync,
    evalRemotely
};

function eval2Sync(cards) {
    if (cards[0].rank === cards[1].rank) {
        // Check if pair of figures
        if (isFigure(cards[0])) {
            return 200
        }
        // Pair of not figures. If '2' or '3' we don't care, it is too low.
        if (cards[0].rank === "2" || cards[0].rank === "3")
            return 50
        return 130
    }

    if (isFigure(cards[0]) && isFigure(cards[1]))
        return 150


    // check if figure
    if (isFigure(cards[0]) || isFigure(cards[1]))
        return 100

    return 0
}

// [{ rank: "A", suit: "spades" },
// { rank: "K", suit: "spades" },
// { rank: "J", suit: "spades" },
// { rank: "3", suit: "spades" },
// { rank: "2", suit: "spades" }]
function evalRemotely(cards, community = []) {
    const options = {
        method: 'POST',
        uri: 'http://rainman.leanpoker.org/rank',
        body: 'cards=' + JSON.stringify(cards.concat(community)),
    };

    return rp(options)
        .then((res) => JSON.parse(res))
        .then(data => data.rank * 100)
        .catch(err => {
            console.error(err)
            return eval2Sync(cards)
        })
}
