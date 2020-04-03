import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import GetInput from './GetInput';
import Result from './Result';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
const honk = new Sound('honk.mp3', Sound.MAIN_BUNDLE, err => {if (err) throw err;})

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d1e1e8'
    },
    header: {
        fontSize: 75,
        color: '#015453',
        textShadowRadius: 10,
        paddingTop: 3.5,
        fontFamily: 'Rubik-Medium'
    },
    middle: {
        flex: 4,
        backgroundColor: '#4aa',
        borderTopWidth: 2,
        borderTopColor: '#aaa'
    },
    bottom: {
        flex: 1,
        backgroundColor: '#e69e9e',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 1.5,
        borderTopColor: '#898'
    },
    emoji: {
        fontSize: 90,
        paddingBottom: 35
    }
});

class Root extends Component {

    state = {
        data: undefined,
        emoji: '🚘'
    }

    display = data => {
        this.setState({ data })
        if (data) {
            const emoji = data.type === 'car' ? '🚘' : '🏍️'
            this.setState({ emoji })
        }
        else this.setState({ emoji: '🙄' })
    }

    restart = () => {
        this.setState({ data: undefined, emoji: '🚘' })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.header}>אוטוטו</Text>
                </View>

                <View style={styles.middle}>
                    {
                        this.state.data || this.state.data === false ?
                            <Result data={this.state.data} />
                            :
                            <GetInput display={this.display} />
                    }
                </View>

                <View style={styles.bottom}>
                    <Text onPress={() => {
                        this.restart()
                        honk.play()
                    }} style={styles.emoji}>{this.state.emoji}</Text>
                </View>
            </View>
        )
    }
}

export default Root