import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    sadContainer: {
        alignItems: 'center',
        paddingBottom: 30
    },
    sadEmoji: {
        fontSize: 80,
        paddingBottom: 30
    },
    sadText: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#015453',
        textShadowRadius: 30,
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const dict = [
    {
        key: 'nefah_manoa',
        value: 'נפח מנוע'
    },
]

class Result extends Component {

    displayAttribute = attr => {
        for (let entry of dict){
            if (entry.key === attr){
                return <Text>{`${entry.value}: ${this.props.data[attr]}`}</Text>
            }
        }
    }

    render() {

        const data = this.props.data
        console.log(data)

        return (
            <View style={styles.container}>
                {
                    data
                    ?
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text>{this.displayAttribute('nefah_manoa')}</Text>
                    </ScrollView>
                    :
                    <View style={styles.sadContainer}>
                        <Text style={styles.sadEmoji}>🙄</Text>
                        <Text style={styles.sadText}>אויש, הרכב שלך לא מופיע במאגר משרד התחבורה.</Text>
                    </View>
                }
            </View>
        )
    }
}

export default Result