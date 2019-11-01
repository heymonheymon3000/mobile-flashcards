import keyMirror from "keymirror"

export const ActionTypes = keyMirror({
  RECEIVE_DECKS: 'RECEIVE_DECKS',
  CREATE_DECK: 'CREATE_DECK',
  CREATE_CARD: 'CREATE_CARD'
})

export const createDeck = (id, name) => ({
  type: ActionTypes.CREATE_DECK,
  id,
  name
})

export const createCard = (deckId, question, answer) => ({
  type: ActionTypes.CREATE_CARD,
  deckId,
  question,
  answer
})

export const receiveDecks = decks => ({
  type: ActionTypes.RECEIVE_DECKS,
  decks
})
