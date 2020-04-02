import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import GetInput from './GetInput';
import Result from './Result';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top:{
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#f1f3f4'
  },
  middle:{
    flex: 8,
    backgroundColor: '#79bac1'
  },
  bottom:{
    flex: 1,
    backgroundColor: '#2f7b82',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 67.5,
    fontWeight: 'bold',
    color: '#015453',
    textShadowRadius: 42,
    paddingTop: 12
  },
  carEmoji: {
    fontSize: 90,
    paddingBottom: 55
  }
});

class Root extends Component {

  state = {data: undefined}

  display = data => {
    this.setState({data})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.header}>אוטוטו</Text>
        </View>

        <View style={styles.middle}>
          {
          this.state.data || this.state.data === false?
          <Result data={this.state.data}/>
          :
          <GetInput display={this.display}/>
          }
        </View>

        <View style={styles.bottom}>
            <Text style={styles.carEmoji}>🚗</Text>
        </View>
      </View>
    )
  }
}

export default Root