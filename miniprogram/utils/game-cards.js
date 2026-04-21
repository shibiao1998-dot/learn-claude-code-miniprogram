// utils/game-cards.js
var gameSave = require('./game-save');
var cardData = require('../data/game-cards');

var _cardsById = {};
cardData.cards.forEach(function(card) {
  _cardsById[card.id] = card;
});

// --- Obtain Cards ---
function obtainCards(cardIds) {
  var newCards = [];
  gameSave.update(function(data) {
    cardIds.forEach(function(id) {
      if (!data.cards[id]) {
        data.cards[id] = { obtained: true, upgraded: false, obtainedAt: Date.now() };
        newCards.push(id);
      }
    });
  });

  newCards.forEach(function(id) {
    var card = _cardsById[id];
    if (card && (card.rarity === 'SR' || card.rarity === 'SSR')) {
      gameSave.addExp(50);
    }
  });

  return newCards;
}

// --- Upgrade Card ---
function upgradeCard(cardId) {
  var card = _cardsById[cardId];
  if (!card) return false;

  var data = gameSave.load();
  if (!data.cards[cardId] || !data.cards[cardId].obtained) return false;
  if (data.cards[cardId].upgraded) return false;

  gameSave.update(function(d) {
    d.cards[cardId].upgraded = true;
  });
  return true;
}

// --- Query ---
function getCard(cardId) {
  return _cardsById[cardId] || null;
}

function isObtained(cardId) {
  var data = gameSave.load();
  return !!(data.cards[cardId] && data.cards[cardId].obtained);
}

function getCollectionStats() {
  var data = gameSave.load();
  var total = cardData.cards.length;
  var obtained = Object.keys(data.cards).length;

  var byRegion = {};
  var byRarity = { N: { total: 0, obtained: 0 }, R: { total: 0, obtained: 0 }, SR: { total: 0, obtained: 0 }, SSR: { total: 0, obtained: 0 } };

  cardData.cards.forEach(function(card) {
    if (!byRegion[card.region]) {
      byRegion[card.region] = { total: 0, obtained: 0 };
    }
    byRegion[card.region].total++;
    byRarity[card.rarity].total++;

    if (data.cards[card.id]) {
      byRegion[card.region].obtained++;
      byRarity[card.rarity].obtained++;
    }
  });

  return {
    total: total,
    obtained: obtained,
    ratio: total > 0 ? obtained / total : 0,
    byRegion: byRegion,
    byRarity: byRarity
  };
}

function getCardsByRegion(region) {
  var data = gameSave.load();
  return cardData.cards
    .filter(function(c) { return c.region === region; })
    .map(function(c) {
      var saveEntry = data.cards[c.id];
      return {
        id: c.id,
        name: c.name,
        desc: c.desc,
        rarity: c.rarity,
        region: c.region,
        chapter: c.chapter,
        tags: c.tags,
        power: c.power,
        defense: c.defense,
        obtained: !!(saveEntry && saveEntry.obtained),
        upgraded: !!(saveEntry && saveEntry.upgraded)
      };
    });
}

function getAllCards() {
  var data = gameSave.load();
  return cardData.cards.map(function(c) {
    var saveEntry = data.cards[c.id];
    return {
      id: c.id,
      name: c.name,
      rarity: c.rarity,
      region: c.region,
      obtained: !!(saveEntry && saveEntry.obtained),
      upgraded: !!(saveEntry && saveEntry.upgraded)
    };
  });
}

module.exports = {
  obtainCards: obtainCards,
  upgradeCard: upgradeCard,
  getCard: getCard,
  isObtained: isObtained,
  getCollectionStats: getCollectionStats,
  getCardsByRegion: getCardsByRegion,
  getAllCards: getAllCards
};
