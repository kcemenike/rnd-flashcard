import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { NOTIFICATION_KEY, STORAGE_KEY } from './constants'


const generateStackStructure = (stack, questions) => {
  return { [stack.stackId]: { title: stack.title, questions: questions ? questions : [] } };
}

export function clearNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function generateNotification() {
  return {
    title: 'No Quiz Today? Start Now',
    body: "Reminder, you have not taken any quiz today.",
  }
}


export function scheduleLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              Notifications.scheduleNotificationAsync({
                content: generateNotification(),
                trigger: { hour: 10, minute: 0, repeats: true }
              })
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export const addNewQuizCard = async (stackId, newQuizCard) => {
  try {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(data => {
        const stack = JSON.parse(data);
        const createdDeck = generateStackStructure(stack[stackId], stack[stackId].questions.concat([newQuizCard]));
        AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(createdDeck));
        return createdDeck;
      });
  } catch (error) {
    console.warn('Error');
  }
};

export const addNewStack = async (title) => {
  const stackId = new Date().valueOf();
  const newStack = { [stackId]: { stackId, title, questions: [] } };
  try {
    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(newStack));
    return newStack;
  } catch (error) {
    console.warn('Error');
  }
};

export const getInitialData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data !== null ? JSON.parse(data) : null;
  } catch (error) {
    console.warn('Error');
  }
};
