import React from 'react';
import { View, Button } from 'react-native';
import { connect } from "react-redux";
import { Text } from 'react-native-elements';

const StackInfo = ({ navigation, stack }) => {
  const handleTakeQuiz = () => {
    if (stack.questions.length === 0) {
      alert('Please add quiz card before taking quiz!')
    } else {
      navigation.navigate('TakeQuiz', { stackId: stack.stackId })
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#b1e3fc' }}>
      <View style={{ justifyContent: 'flex-start', marginBottom: 30 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text h2 >{stack.title} </Text>
          <Text h3> Quiz Card Count: {stack.questions.length} </Text>
        </View>
      </View>
      <View style={{ marginTop: 30, justifyContent: "flex-end" }}>
        <Button
          title='Take Quiz'
          color='#b81900'
          onPress={() => handleTakeQuiz()} />

        <View style={{ margin: 20 }} />

        <Button
          title='Add Quiz Card'
          color='#57916d'
          onPress={() => navigation.navigate('NewQuizCard', { stack: stack.stackId })} />
      </View>
    </View>
  );
};


function mapStateToProps(state, { route }) {
  const { stackId } = route.params;
  return {
    stack: state[stackId],
  };
}
export default connect(mapStateToProps)(StackInfo);
