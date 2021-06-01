import { ADD_QUIZ, NEW_STACK } from '../constants'

export default function stackReducer(state = {}, action) {
  switch (action.type) {
    case ADD_QUIZ:
      const updateQuestion = state[action.stackId]
        .questions.concat(action.newQuizCard)
      return {
        ...state,
        [action.stackId]: {
          ...state[action.stackId],
          questions: updateQuestion,
        },
      }
    case NEW_STACK:
      return {
        ...state,
        ...action.stack,
      }
    default:
      return state
  }
}
