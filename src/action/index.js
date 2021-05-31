import {ADD_QUIZ, NEW_STACK} from "../constants";

export function addNewQuiz(stackId, newQuiz) {
  return {
    type: ADD_QUIZ,
    stackId,
    newQuiz,
  };
}

export function addStack(stack) {
  return {
    type: NEW_STACK,
    stack,
  };
}
