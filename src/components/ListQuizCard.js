import React from 'react';
import { Card } from 'react-native-elements';
import {StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  questionCount: {
    flex: 1,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});

const ListQuizCard = (props) => {
  const { title, questions, stackId } = props.stack;
  return (
    <Card >
      <Card.Title>{title}</Card.Title>
      <View>
        <Text style={styles.questionCount}>
          Total {questions.length} Questions
        </Text>
        <Button
          color='#57916d'
          title="Check Detail"
          onPress={() => props.navigation.navigate('StackInfo', { stackId: stackId })} />
      </View>
    </Card>

  );
}

export default ListQuizCard;
