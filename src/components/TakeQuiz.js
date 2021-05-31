import { connect } from "react-redux";
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { Button as ButtonElement, Card, Text } from "react-native-elements";

import { addStack } from '../action';
import { clearNotifications, getInitialData, scheduleLocalNotification } from '../utils';
import ScoreCard from './ScoreCard'


const TakeQuiz = ({ navigation, stack, fetchStacks }) => {
  const initialState = { totalCorrect: 0, totalWrong: 0, cardNo: 0, isAnswerHidden: true, isScoreHidden: true }
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getInitialData().then(
      stack => { fetchStacks(stack) }
    );
  }
    , [])

  const handleAnswer = (option) => {
    let { cardNo, isScoreHidden, isAnswerHidden } = state
    if ((cardNo + 1) === stack.questions.length) {
      isScoreHidden = false
    } else {
      cardNo = cardNo + 1
      isAnswerHidden = false
    }
    setState({ ...state, isScoreHidden, cardNo, isAnswerHidden, [option]: state[option] + 1 })
  }

  const renderScoreSection = () => {
    clearNotifications()
      .then(scheduleLocalNotification());
  }

  const renderAnswerSection = () => {
    return (
      <View>
        <Text h4>ANSWER TEXT:</Text>
        <Text h3 style={{ color: '#250dff' }}>{stack.questions[state.cardNo].ans}</Text>
        <View style={{ margin: 20 }}>
          <Button onPress={() => handleAnswer('totalCorrect')} title='CORRECT' color='#08730c' />
          <View style={{ margin: 10 }} />
          <Button onPress={() => handleAnswer('totalWrong')} title='WRONG' color='#fc0356' />
        </View>
      </View>
    )
  }

  if (!stack) {
    return (
      <Text> Please wait, loading ...</Text>
    )
  }
  return (
    <View style={styles.container}>
      <Text h1> {stack.title} </Text>
      {
        !state.isScoreHidden ?
          <>
            {renderScoreSection()}
            <ScoreCard
              state={state}
              stack={stack}
              navigation={navigation}
              reset={() => setState(initialState)}
              navigateToHome={() => navigation.navigate('Home')} />
          </>
          :
          <View style={{ height: '85%', alignItems: 'center' }}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>
                Quiz Card Index: {state.cardNo + 1} of {stack.questions.length}
              </Text>
            </View>

            <View style={[styles.center, { margin: 30 }]}>
              <Text h4>QUESTION TEXT:</Text>
              <Text h3 style={{ color: '#250dff' }}>
                {stack.questions[state.cardNo] && stack.questions[state.cardNo].title}
              </Text>
            </View>

            {
              !state.isAnswerHidden ?
                renderAnswerSection() :
                <Button
                  color='#57916d'
                  style={{ margin: 30 }}
                  title='Show Answer'
                  onPress={() => setState({ ...state, isAnswerHidden: false })}>
                </Button>
            }
          </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b1e3fc',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function mapDispatchToProps(dispatch) {
  return {
    fetchStacks: (stack) => {
      dispatch(addStack(stack))
    }
  }
}


function mapStateToProps(stack, { route }) {
  const { stackId } = route.params;
  return {
    stack: stack[stackId],
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(TakeQuiz);
