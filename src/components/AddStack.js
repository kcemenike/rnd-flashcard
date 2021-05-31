import { connect } from "react-redux";
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { Text } from 'react-native-elements'

import { addNewStack } from "../utils";
import { addStack } from "../actions";

// const styles = StyleSheet.create({
//   center: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });

const AddStack = (props) => {
  const [title, setTitle] = useState('');

  const saveNewStack = () => {
    addNewStack(title)
      .then((addedStack) => {
        setTitle('')
        props.saveStack(addedStack);
        props.navigation.navigate('StackInfo', { stackId: Object.keys(addedStack)[0] });
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#b1e3fc' }}>
      <Text h2>Add New Stack</Text>
      <View style={{ justifyContent: "flex-start", marginBottom: 30 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            style={{ height: 60, width: 280, borderColor: '#245bf2', borderWidth: 0.5, padding: 10 }}
            placeholder="Add Stack Title Here ... "
            onChangeText={t => setTitle(t)}
            defaultValue={title}
          />
        </View>
      </View>
      <View style={{ marginTop: 30, justifyContent: "flex-end" }}>
        <Button
          color='#57916d'
          title="Submit"
          onPress={() => saveNewStack()} />
      </View>
    </View>

  );
};


function mapDispatchToProps(dispatch) {
  return {
    saveStack: (stack) => {
      dispatch(addStack(stack))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddStack);
