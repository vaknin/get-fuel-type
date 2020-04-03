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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f1f3f4'
  },
  middle:{
    flex: 4,
    backgroundColor: '#4aa',
    borderTopWidth: 2,
    borderTopColor: '#aaa'
  },
  bottom:{
    flex: 1,
    backgroundColor: '#e67373',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1.7,
    borderTopColor: '#777'
  },
  header: {
    fontSize: 72,
    color: '#015453',
    textShadowRadius: 42,
    paddingTop: 11.5,
    fontFamily: 'Rubik-Medium'
  },
  emoji: {
    fontSize: 90,
    paddingBottom: 35
  }
});

class Root extends Component {

  state = {
    data: undefined,
    emoji: ''
  }

  display = data => {
    this.setState({data})
    if (data){
      const emoji = data.type === 'car' ? '🚘' : '🏍️'
      this.setState({emoji})
    }
    else this.setState({emoji: '🙄'})
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
          <Text style={styles.emoji}>{this.state.emoji}</Text>
        </View>
      </View>
    )
  }
}

export default Root