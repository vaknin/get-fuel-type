import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import GetInput from './GetInput';

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
    flex: 3,
    backgroundColor: '#79bac1'
  },
  bottom:{
    flex: 3,
    backgroundColor: '#2f7b82',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#015453',
    textShadowRadius: 42,
    paddingTop: 34
  },
  fuelTypeTitle: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#254557',
    textShadowRadius: 20,
    paddingTop: 12
  },
  fuelType: {
    fontSize: 75,
    fontWeight: 'bold',
    color: '#498584',
    textShadowRadius: 40,
    paddingBottom: 12
  },
  gasPump: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#498584',
    textShadowRadius: 40,
    paddingBottom: 35,
    paddingLeft: 12
  }
});

class Root extends Component {

  state = { fuelType: ''}

  setFuelType = fuelType => {
    if (fuelType === 'בנזין') fuelType += ' 95'
    else if (!fuelType || fuelType.includes('לא ידוע')) fuelType = 'לא ידוע 😞'
    else if (fuelType === 'דיזל') fuelType += '/סולר'
    this.setState({fuelType})
  }

  restart = () => {
    this.setState({fuelType: ''})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.header}>איזה דלק למלא?</Text>
        </View>

        <View style={styles.middle}>
          <GetInput setFuel={this.setFuelType} restart={this.restart} />
        </View>

        <View style={styles.bottom}>
          <Text style={styles.fuelTypeTitle}>{this.state.fuelType ? 'סוג הדלק הוא' : ''}</Text>
          {this.state.fuelType ?
            <Text style={styles.fuelType}>{this.state.fuelType}</Text>
            :
            <Text style={styles.gasPump}>⛽</Text>
          }
          
        </View>
      </View>
    )
  }
}

export default Root