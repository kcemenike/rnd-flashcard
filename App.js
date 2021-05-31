import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import reducer from './src/reducers';
import Home from './src/components/Home';
import AddStack from './src/components/AddStack';
import StackInfo from './src/components/StackInfo';
import NewQuizCard from './src/components/NewQuizCard';
import TakeQuiz from './src/components/TakeQuiz'

const Stack = createStackNavigator();
const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{ title: 'Flashcards Quiz' }} />
          <Stack.Screen name='AddStack' component={AddStack} options={{ title: 'Add Stack' }} />
          <Stack.Screen name='StackInfo' component={StackInfo} options={{ title: 'Stack Info' }} />
          <Stack.Screen name='NewQuizCard' component={NewQuizCard} options={{ title: 'Add New Quiz Card' }} />
          <Stack.Screen name='TakeQuiz' component={TakeQuiz} options={{ title: 'Take Quiz' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
