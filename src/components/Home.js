import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text as TextElement, FAB } from 'react-native-elements'

import { addStack } from '../action'
import ListQuizCard from './ListQuizCard'
import { getInitialData } from '../utils'

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Home = (props) => {
  useEffect(() => {
      getInitialData().then(
        stack => {props.fetchStacks(stack)},
      )
    }
    , [])

  const renderStack = ({ item }) => {
    return <ListQuizCard navigation={props.navigation} stack={props.stacks[item]} />
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#b1e3fc'}}>
      <FlatList
        data={Object.keys(props.stacks)}
        renderItem={renderStack}
        keyExtractor={(item) => item}
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <TextElement h3>
              No Data Found!
            </TextElement>
          </View>
        )}
      />
      <FAB
        placement='right'
        title="Add Stack"
        color='#b88100'
        onPress={() => props.navigation.navigate('AddStack')}
      />

    </View>
  )
}

function mapDispatchToProps (dispatch) {
  return { fetchStacks: (stack) => { dispatch(addStack(stack)) } }
}

function mapStateToProps (stack) {
  return {
    stacks: stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
