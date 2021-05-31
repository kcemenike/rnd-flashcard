import React from 'react';
import { StyleSheet, View, Button } from 'react-native'
import { Text } from 'react-native-elements'


const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ScoreCard = (props) => {
  const { state, stack, navigateToHome, reset } = props;
  const scorePercentage = (state.totalCorrect / stack.questions.length * 100).toFixed();
  return (
    <View style={styles.center}>


      <View style={{ marginTop: 15, marginBottom: 15 }}>
        <Text h4>
          CORRECT Count: {state.totalCorrect}
        </Text>
        <Text h4>
          WRONG Count: {state.totalWrong}
        </Text>
      </View>

      <Text h4 style={{ margin: 40 }}>
        TOTAL QUESTIONS: {stack.questions.length}
      </Text>
      <Text h3 style={{ color: '#e09d3f' }}>
        SCORE: {scorePercentage}%
				</Text>

      <View style={{ margin: 30 }}>
        <Button
          title="Take Again"
          onPress={() => reset()} />

        <View style={{ margin: 20 }} />
        <Button
          title="Back To Deck"
          onPress={() => navigateToHome()} />
      </View>

    </View>
  );
}

export default ScoreCard;
