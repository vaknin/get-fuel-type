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
        marginBottom: 20,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#689ca1'
    }
});

class GetInput extends Component {

    state = {
        text: undefined,
        submitted: false
    }

    getCarInfo = async () => {

        //#region Private Car

        // Get the vehicle's degem_nm
        try {
            //const licensePlateEndpoint = `https://data.gov.il/api/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${this.state.text}`
            const licensePlateEndpoint = `https://data.gov.il/api/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=3274328`
            const response = await fetch(licensePlateEndpoint)
            const json = await response.json()

            // No data or motorcycle
            if (json.result.records.length === 0) throw Error('Not a private car')

            // Found info, it is a private car
            const car = {type: 'מכונית'}
            let vehicle = json.result.records[0]
            for (let key of Object.keys(vehicle)){
                if (vehicle[key]) car[key] = vehicle[key]
            }
            car.degem_cd = vehicle['degem_cd'].toString().padStart('4', '0')

            // Fetch the vehicle's information via the degem_nm
            try{
                const vechicleInformationEndpoint = `https://data.gov.il/api/action/datastore_search?resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40&q=${car.degem_nm}`
                const response = await fetch(vechicleInformationEndpoint)
                const json = await response.json()
                if (json.result.records.length === 0) return false
    
                // Iterate through all different vehicles
                for(let vehicle of json.result.records){

                    // Found the correct model
                    if (vehicle.degem_cd === car.degem_cd){
                        for (let key of Object.keys(vehicle)){
                            if (vehicle[key]) car[key] = vehicle[key]
                        }
                        return car
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

            // Return motorcycle information
            else{
                const motorcycle = {}
                motorcycle.type = 'אופנוע'
                const info = json.result.records[0]
                for (let key of Object.keys(info)){
                    motorcycle[key] = info[key]
                }
                return motorcycle
            }
        }

        catch (e){console.log(e);return false}

        //#endregion
    }

    // Fetch the fuel type
    submit = async () => {
        if (this.state.text.length <= 5) return
        const vehicle = await this.getCarInfo()
        this.props.display(vehicle)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput onSubmitEditing={e => this.submit(e.nativeEvent.text)} keyboardType='numeric' style={styles.input} placeholder="מספר רישוי" value={this.state.text} onChangeText={text => this.setState({text})} />
                    <Button color="#4f979e" onPress={this.submit} title="אישור" />
                </View>
            </View>
        )
    }
}

export default GetInput