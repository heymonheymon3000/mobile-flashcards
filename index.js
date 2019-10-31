import keyMirror from "keymirror";

export const ActionTypes = keyMirror({
  RECEIVE_DECKS: null,
  CREATE_DECK: null,
  CREATE_CARD: null
});

export const createDeck = (id, name) => ({
  type: ActionTypes.CREATE_DECK,
  id,
  name
});

export const createCard = (deckId, question, answer) => ({
  type: ActionTypes.CREATE_CARD,
  deckId,
  question,
  answer
});

export const receiveDecks = decks => ({
  type: ActionTypes.RECEIVE_DECKS,
  decks
});
