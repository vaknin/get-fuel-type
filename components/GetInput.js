import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#79c0c7',
        textAlign: 'center',
        marginBottom: 34,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#689ca1'
    },
    restartContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    gasPump: {
        paddingBottom: 30,
        paddingLeft: 15,
        fontSize: 85
    }
});

class GetInput extends Component {

    state = {
        text: undefined,
        fuelType: '',
        submitted: false
    }

    getFuelType = async () => {

        //#region Private Car

        let degem_cd, degem_nm

        // Get the vehicle's info, in order to fetch the fuel type from another table
        try {
            const licensePlateEndpoint = `https://data.gov.il/api/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${this.state.text}`
            const response = await fetch(licensePlateEndpoint)
            const json = await response.json()
            if (json.result.records.length === 0) throw Error('Not a private car')
            degem_cd = json.result.records[0]["degem_cd"].toString().padStart('4', '0')
            degem_nm = json.result.records[0]["degem_nm"]

            // Fetch fuel type
            try{
                const vechicleInformationEndpoint = `https://data.gov.il/api/action/datastore_search?resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40&q=${degem_nm}`
                const response = await fetch(vechicleInformationEndpoint)
                const json = await response.json()
                if (json.result.records.length === 0) return false
    
                // Iterate through all different vehicles
                for(let vehicle of json.result.records){
                    if (vehicle.degem_cd === degem_cd){
                        return vehicle.delek_nm
                    }
                }

                return false
            }
    
            catch (e){console.log(e)}
        }

        catch (e){console.log(e);}

        //#endregion

        //#region Motorcycle
        try{
            const endpoint = `https://data.gov.il/api/action/datastore_search?resource_id=bf9df4e2-d90d-4c0a-a400-19e15af8e95f&q=${this.state.text}`
            const response = await fetch(endpoint)
            const json = await response.json()
            if (json.result.records.length === 0) return false
            else return json.result.records[0]['sug_delek_nm']
        }

        catch (e){console.log(e);return false}

        //#endregion
    }

    // Fetch the fuel type
    submit = async () => {
        if (this.state.text.length <= 5) return
        const fuelType = await this.getFuelType()
        this.props.setFuel(fuelType)
        this.setState({submitted: true})
    }

    restart = () => {
        this.setState({submitted: false, text: ''})
        this.props.restart()
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.submitted ?
                    <View style={styles.restartContainer}>
                        <Text style={styles.gasPump}>⛽</Text>
                        <Button color="#4f979e" onPress={this.restart} title="בדוק רכב אחר" />
                    </View>
                    :
                    <View style={styles.inputContainer}>
                        <TextInput onSubmitEditing={e => this.submit(e.nativeEvent.text)} keyboardType='numeric' style={styles.input} placeholder="מספר רישוי" value={this.state.text} onChangeText={text => this.setState({text})} />
                        <Button color="#4f979e" onPress={this.submit} title="בדיקת סוג דלק" />
                    </View>
                }
            </View>
        )
    }
}

export default GetInput