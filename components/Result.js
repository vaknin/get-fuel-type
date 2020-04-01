import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native'

const styles = StyleSheet.create({
  scrollView: {
  }
});

class Result extends Component {

  render() {
    return (
      <View>
          <TextInput/>
          <Button title="Press me" />
      </View>
    )
  }
}

export default Result