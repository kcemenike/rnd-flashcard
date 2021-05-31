import { StyleSheet, Button, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addNewQuiz } from '../action';
import { addNewQuizCard } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#b1e3fc',
    alignSelf: 'center',
  },
});

const NewQuizCard = (props) => {
  const [title, setTitle] = useState('');
  const [ans, setAnswer] = useState('');

  const setInitialState = () => {
    setTitle('');
    setAnswer('');
  }

  const handleNewCard = () => {
    addNewQuizCard(props.stackId, { title, ans })
      .then((createdCard) => {
        setInitialState();
        props.newQuiz(props.stackId, createdCard);
        props.navigation.navigate('StackInfo', { stackId: props.stackId });
      });
  };

  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 20 }}>
        Add Text for Card Title
			</Text>

      <TextInput
        style={{ height: 60, width: 280, borderColor: '#245bf2', borderWidth: 0.5, margin: 20, padding: 20 }}
        placeholder='Quiz Title Here...'
        onChangeText={t => setTitle(t)}
        defaultValue={title}
      />

      <Text style={{ fontSize: 20 }}>
        Add Answer Here
			</Text>
      <TextInput
        style={{ height: 60, width: 280, borderColor: '#245bf2', borderWidth: 0.5, margin: 20, padding: 20 }}
        placeholder='Answer Text'
        onChangeText={t => setAnswer(t)}
        defaultValue={ans}
      />

      <Button
        color='#57916d'
        title='Submit Card'
        onPress={() => handleNewCard()} />
    </View>

  );
};


function mapStateToProps(state, { route }) {
  const { stack } = route.params;
  return {
    stackId: stack
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newQuiz: (stackID, newCard) => {
      dispatch(addNewQuiz(stackID, newCard))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuizCard);
