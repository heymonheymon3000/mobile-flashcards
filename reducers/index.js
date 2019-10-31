import { ActionTypes } from "../actions";

const initialState = null;

const decks = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ActionTypes.CREATE_DECK: {      
      return {
        ...state,
        [action.id]: {
          id: action.id,
          name: action.name,
          cards: []
        }
      };
    }
    case ActionTypes.CREATE_CARD: {
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: [
            ...state[action.deckId].cards,
            { question: action.question, answer: action.answer }
          ]
        }
      };
    }
    default:
      return state;
  }
};

export default decks;
