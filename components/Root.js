import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import GetInput from './GetInput';

const styles = StyleSheet.create({
  container: {
    flex: 0
  }
});

class Root extends Component {

  render() {
    return (
      <View style={styles.container}>
        <GetInput/>
      </View>
    )
  }
}

export default Root